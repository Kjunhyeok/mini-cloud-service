package com.kjh.webbuilder.config

import com.amazonaws.services.s3.AmazonS3Client
import com.kjh.webbuilder.util.Const
import org.apache.commons.io.FileUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.web.client.RestTemplate
import java.io.File
import java.nio.charset.Charset
import javax.annotation.PostConstruct

@Configuration
open class AppConfig(private val amazonS3Client: AmazonS3Client) {
    @Value("\${uuid}")
    private lateinit var id: String
    @Bean
    open fun restTemplate(): RestTemplate {
        val restTemplate = RestTemplate()
        restTemplate.messageConverters.add(0, StringHttpMessageConverter(Charset.forName("UTF-8")));
        return restTemplate
    }

    @PostConstruct
    open fun init() {
        loadS3File()
        createInitConfigFile()
    }
    private fun createInitConfigFile() {
        val path = "web-builder/config/undefined-page-store"
        val file = File(path)

        if (file.exists()) return

        file.mkdirs()
        val config = "{\"projects\":[{\"id\":\"undefined-page-store\",\"data\":{\"assets\":[],\"styles\":[{\"selectors\":[\"#il4x\"],\"style\":{\"position\":\"static\"}},{\"selectors\":[\"#ip12z\"],\"style\":{\"display\":\"flex\",\"flex-direction\":\"row\",\"justify-content\":\"flex-start\",\"align-items\":\"stretch\",\"flex-wrap\":\"nowrap\",\"padding\":\"10px\"}},{\"selectors\":[\"#i5lbf\"],\"style\":{\"flex\":\"auto\",\"min-height\":\"75px\",\"flex-grow\":\"1\",\"flex-basis\":\"100%\"}},{\"selectors\":[\"#iepf6\"],\"style\":{\"flex\":\"auto\",\"min-height\":\"75px\",\"flex-grow\":\"1\",\"flex-basis\":\"100%\"}},{\"selectors\":[\"#ija2s\"],\"style\":{\"flex\":\"auto\",\"min-height\":\"75px\",\"flex-grow\":\"1\",\"flex-basis\":\"100%\"}},{\"selectors\":[\"#idc1t\"],\"style\":{\"padding\":\"10px\"}}],\"pages\":[{\"frames\":[{\"component\":{\"type\":\"wrapper\",\"stylable\":[\"background\",\"background-color\",\"background-image\",\"background-repeat\",\"background-attachment\",\"background-position\",\"background-size\"],\"attributes\":{\"id\":\"ib3n\"},\"components\":[{\"type\":\"navbar\",\"classes\":[\"navbar\",\"navbar-expand-lg\",\"px-3\"],\"attributes\":{\"id\":\"il4x\"},\"components\":[{\"classes\":[\"container-fluid\"],\"components\":[{\"type\":\"link\",\"editable\":false,\"classes\":[\"navbar-brand\"],\"attributes\":{\"href\":\"#\"},\"components\":[{\"type\":\"image\",\"resizable\":{\"ratioDefault\":1},\"attributes\":{\"alt\":\"로고\",\"src\":\"https://google.com/logo.jpeg\"}}]},{\"tagName\":\"button\",\"classes\":[\"navbar-toggler\"],\"attributes\":{\"type\":\"button\",\"data-bs-toggle\":\"collapse\",\"data-bs-target\":\"#navbarText\",\"aria-controls\":\"navbarText\",\"aria-expanded\":\"false\",\"aria-label\":\"Toggle navigation\"},\"components\":[{\"tagName\":\"span\",\"classes\":[\"navbar-toggler-icon\"]}]},{\"classes\":[\"collapse\",\"navbar-collapse\"],\"attributes\":{\"id\":\"navbarText\"},\"components\":[{\"classes\":[\"navbar-nav\",\"me-auto\",\"mb-2\",\"mb-lg-0\"],\"components\":[{\"type\":\"link\",\"classes\":[\"nav-item\",\"nav-link\",\"active\"],\"attributes\":{\"aria-current\":\"page\",\"href\":\"#\"},\"components\":[{\"type\":\"textnode\",\"content\":\"Home\"}]},{\"type\":\"link\",\"classes\":[\"nav-item\",\"nav-link\"],\"attributes\":{\"href\":\"#\"},\"components\":[{\"type\":\"textnode\",\"content\":\"Features\"}]},{\"type\":\"link\",\"classes\":[\"nav-item\",\"nav-link\"],\"attributes\":{\"href\":\"#\"},\"components\":[{\"type\":\"textnode\",\"content\":\"Pricing\"}]}]},{\"tagName\":\"span\",\"type\":\"text\",\"classes\":[\"navbar-text\"],\"components\":[{\"type\":\"textnode\",\"content\":\"        관리자님      \"}]}]}]}]},{\"type\":\"flex-row\",\"style\":\"\",\"attributes\":{\"id\":\"ip12z\"},\"components\":[{\"type\":\"flex-cell\",\"style\":\"\",\"attributes\":{\"id\":\"i5lbf\"},\"components\":[{\"type\":\"text\",\"attributes\":{\"id\":\"idc1t\"},\"components\":[{\"type\":\"textnode\",\"content\":\"메인 화면 입니다.\"},{\"tagName\":\"br\",\"void\":true},{\"type\":\"link\",\"attributes\":{\"href\":\"/web-builder/admin\",\"id\":\"iz17t\"},\"components\":[{\"type\":\"textnode\",\"content\":\"admin\"}]},{\"type\":\"textnode\",\"content\":\" 을 클릭하면 수정 페이지로 이동합니다.\"}]}]},{\"type\":\"flex-cell\",\"style\":\"\",\"attributes\":{\"id\":\"iepf6\"}},{\"type\":\"flex-cell\",\"style\":\"\",\"attributes\":{\"id\":\"ija2s\"}}]}]}}],\"type\":\"main\",\"id\":\"6RN568o7ATQ3y21H\"}]}}]}"
        val configFile = File("$path/config.json")
        configFile.createNewFile()
        configFile.writeText(config)
        val deployFile = File("$path/deploy.json")
        deployFile.createNewFile()
        deployFile.writeText(config)
    }
    private fun loadS3File() {
        val s3Objects = amazonS3Client.listObjects(Const.bucketName, "$id/web-builder")
        for (s3ObjectSummary in s3Objects.objectSummaries) {
            val key = s3ObjectSummary.key
            val s3Object = amazonS3Client.getObject(Const.bucketName, key)
            val file = File(key.replace("$id/", ""))
            if (!file.exists())
                FileUtils.copyInputStreamToFile(s3Object.objectContent, file)
        }
    }
}