package com.kjh.webbuilder.controller

import com.kjh.webbuilder.req.TranslationRequest
import com.kjh.webbuilder.service.FileConfigService
import com.kjh.webbuilder.service.GPTService
import com.kjh.webbuilder.vo.Translation
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.io.IOException
import java.net.URLEncoder

@CrossOrigin("*")
@RestController
@RequestMapping("/web-builder/config")
class ConfigController (private val fileConfigService: FileConfigService,
                        private val gptService: GPTService) {

    @GetMapping
    fun getConfig(fileName: String): ResponseEntity<Any> {
        try {
            val resource = fileConfigService.getFileResource(fileName)

            return ResponseEntity.ok()
                .contentLength(resource.contentLength())
                .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"${URLEncoder.encode(fileName, "utf-8")}\""
                )
                .body(resource)
        } catch (e: IOException) {
            return ResponseEntity
                .status(500)
                .body(e.message)
        }
    }

    @GetMapping("/list")
    fun getConfigList(): List<String> {
        return fileConfigService.listConfigFileName()
    }

    @GetMapping("/history/list")
    fun getHistoryList(pageName: String): List<String> {
        return fileConfigService.listHistoryFileName(pageName)
    }

    @PostMapping
    fun writeConfig(@RequestParam fileName: String, @RequestBody body: String) {
        fileConfigService.writeFile(fileName, body)
    }

    @PostMapping("/generate/text")
    fun generateHtml(@RequestParam body: String): String {
        return gptService.generateHTMLCode(body)
    }

    @DeleteMapping
    fun deletePage(@RequestParam pageName: String) {
        fileConfigService.deleteFile(pageName)
    }

    @PostMapping("/translate")
    fun translate(@RequestBody body: TranslationRequest): List<Translation> {
        return gptService.translateDefaultLanguages(body.text)
    }

    @PostMapping("/generate/image")
    fun image(@RequestParam body: String): List<String> {
        return gptService.generateImage(gptService.translateLanguage(body, "en"))
    }
}