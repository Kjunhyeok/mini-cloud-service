package com.kjh.filemanager.service

import com.amazonaws.services.s3.model.S3ObjectInputStream
import com.kjh.filemanager.response.FileListResponse
import org.apache.commons.io.FileUtils
import org.apache.commons.io.IOUtils
import org.springframework.core.io.ByteArrayResource
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class FileManagerService(private val s3UploadService: S3UploadService) {

    private val id = System.getenv("uuid")

    fun list(): FileListResponse {
        val objectSummaries = s3UploadService.list(id).objectSummaries
        val dataList = arrayListOf<FileListResponse.Data>()
        for (summary in objectSummaries) {
            dataList.add(FileListResponse.Data(summary.key.replace("$id/", ""), FileUtils.byteCountToDisplaySize(summary.size), summary.lastModified))
        }
        return FileListResponse(dataList)
    }

    fun upload(multipartFile: MultipartFile) {
        s3UploadService.uploadFile(id, multipartFile)
    }

    fun download(fileName: String): ByteArrayResource {
        val s3Object = s3UploadService.getObject("$id/$fileName")
        s3Object.key = s3Object.key.replace("$id/", "")

        val objectInputStream: S3ObjectInputStream = s3Object.objectContent
        val bytes: ByteArray = IOUtils.toByteArray(objectInputStream)

        return ByteArrayResource(bytes)
    }

    fun delete(fileName: String) {
        s3UploadService.delete("$id/$fileName")
    }
}