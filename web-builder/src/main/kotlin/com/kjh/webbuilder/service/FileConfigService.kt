package com.kjh.webbuilder.service

import com.amazonaws.services.s3.AmazonS3Client
import com.kjh.webbuilder.util.Const
import org.apache.commons.io.FileUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ByteArrayResource
import org.springframework.stereotype.Service
import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicBoolean

@Service
class FileConfigService (private val amazonS3Client: AmazonS3Client) {
    @Value("\${uuid}")
    private lateinit var id: String

    private val bucketName = Const.bucketName
    private val executors = Executors.newScheduledThreadPool(1)
    private var isExecutable = AtomicBoolean(true)

    @Throws(IOException::class)
    fun getFileResource(fileName: String): ByteArrayResource {
        val path = getPath(fileName)
        return try {
            val fileByteArray = Files.readAllBytes(Paths.get(path))
            ByteArrayResource(fileByteArray)
        } catch (e: java.nio.file.NoSuchFileException) {
            if (path.substring(path.lastIndexOf("/")) == "/config.json") {
                File(path.substring(0, path.lastIndexOf("/") + 1)).mkdirs()
                val newFile = File(path)
                newFile.createNewFile()
                newFile.writeText(
                    "{\"projects\": [{\"id\": \"${
                        fileName.substring(
                            0,
                            fileName.indexOf("/")
                        )
                    }\", \"data\": {}}]}"
                )
                ByteArrayResource(newFile.readBytes())
            }
            throw IOException()
        }
    }

    fun listConfigFileName(): List<String> {
        val fileDir = File(getPath())
        val fileNameList = arrayListOf<String>()
        val listFiles = fileDir.listFiles() ?: return listOf()
        for (file in listFiles) {
            if (file.name == "undefined-page-store") {
                fileNameList.add(0, "/")
                continue
            }
            fileNameList.add(file.name.replace("-page-store", ""))
        }
        return fileNameList
    }

    fun writeFile(fileName: String, body: String) {
        val path = getPath(fileName)
        val file = File(path)
        file.writeText(body)
        if (fileName.contains("deploy")) {
            clearMaxFileList(file)
            copyFile(file)
        }
        if (isExecutable.get()) {
            isExecutable.set(false)
            executors.schedule({
                uploadFile(path, file)
                isExecutable.set(true)
            }, 1, TimeUnit.MINUTES)
        }
    }

    fun listHistoryFileName(pageName: String): List<String> {
        val path = getPath(pageName)
        val fileDir = File("$path/history")
        val listFiles = fileDir.listFiles() ?: return listOf()
        return listFiles.sortedBy { it.lastModified() }.plus(File("$path/deploy.json")).reversed().map { it.name }
    }

    private fun copyFile(file: File) {
        file.copyTo(File("${getPath()}/${file.parentFile.name}/history/config-${System.currentTimeMillis()}.json"), true)
    }

    private fun clearMaxFileList(file: File) {
        val parent = File("${file.parentFile}/history")
        val listFileSortByTime = parent.listFiles()?.sortedBy { it.lastModified() } ?: return
        if (listFileSortByTime.size > 9) {
            listFileSortByTime[0]?.delete()
        }
    }

    fun getPath(): String {
        return "web-builder/config"
    }

    fun getPath(fileName: String): String {
        return "${getPath()}/$fileName"
    }
    fun uploadFile(fileName: String, file: File) {
        amazonS3Client.putObject(bucketName, "$id/$fileName", file)
    }

    fun deleteFile(fileName: String) {
        val path = getPath(fileName)
        FileUtils.deleteDirectory(File(path))
        val list = amazonS3Client.listObjects(bucketName, "$id/${path}")
        for (obj in list.objectSummaries) {
            amazonS3Client.deleteObject(bucketName, obj.key)
        }
        amazonS3Client.deleteObject(bucketName, "$id/${path}/")
    }
}