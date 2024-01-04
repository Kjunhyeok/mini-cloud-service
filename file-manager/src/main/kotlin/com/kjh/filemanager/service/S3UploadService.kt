package com.kjh.filemanager.service

import com.amazonaws.services.s3.AmazonS3Client
import com.amazonaws.services.s3.model.ObjectListing
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.amazonaws.services.s3.model.S3Object
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class S3UploadService(private val amazonS3Client: AmazonS3Client) {

    private val bucketName = "mini-cloud-bucket"

    fun list(id: String): ObjectListing {
        return amazonS3Client.listObjects(bucketName, id)
    }

    fun uploadFile(id: String, multipartFile: MultipartFile) {
        val size = multipartFile.size
        val objectMetadata = ObjectMetadata()
        objectMetadata.contentType = multipartFile.contentType
        objectMetadata.contentLength = size
        amazonS3Client.putObject(PutObjectRequest(bucketName, "$id/${multipartFile.originalFilename}", multipartFile.inputStream, objectMetadata))
    }

    fun getObject(fileName: String): S3Object {
        return amazonS3Client.getObject(bucketName, fileName)
    }

    fun delete(fileName: String) {
        amazonS3Client.deleteObject(bucketName, fileName)
    }
}