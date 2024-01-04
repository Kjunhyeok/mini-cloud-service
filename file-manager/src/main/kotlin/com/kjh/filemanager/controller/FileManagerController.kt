package com.kjh.filemanager.controller

import com.amazonaws.AmazonServiceException
import com.kjh.filemanager.response.FileListResponse
import com.kjh.filemanager.service.FileManagerService
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import springfox.documentation.annotations.ApiIgnore
import java.net.URLEncoder
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@CrossOrigin("*")
@RestController
@RequestMapping
class FileManagerController(private val fileManagerService: FileManagerService) {

    @ApiIgnore
    @GetMapping
    fun swagger(response: HttpServletResponse, request: HttpServletRequest) {
        response.sendRedirect("/file-manager/swagger-ui/index.html")
    }

    @GetMapping("/list")
    fun list(): FileListResponse {
        return fileManagerService.list()
    }

    @PostMapping("/upload")
    fun upload(uploadFile: MultipartFile): String {
        fileManagerService.upload(uploadFile)
        return "success"
    }

    @GetMapping("/download")
    fun download(fileName: String): ResponseEntity<Any> {
        try {
            val resource = fileManagerService.download(fileName)

            return ResponseEntity.ok()
                .contentLength(resource.contentLength())
                .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"${URLEncoder.encode(fileName, "utf-8")}\""
                )
                .body(resource)
        } catch (e: AmazonServiceException) {
            return ResponseEntity
                .status(e.statusCode)
                .body(e.errorMessage)
        }
    }

    @PostMapping("/delete")
    fun delete(fileName: String): String {
        fileManagerService.delete(fileName)
        return "success"
    }
}