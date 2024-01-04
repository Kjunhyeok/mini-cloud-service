package com.kjh.webbuilder.config

import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3Client
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.amazonaws.services.translate.AmazonTranslateClient
import com.amazonaws.services.translate.AmazonTranslateClientBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class AWSS3Config {

    companion object {
        private val REGION = Regions.AP_NORTHEAST_2
    }

    @Bean
    open fun amazonS3Client(): AmazonS3Client {
        return AmazonS3ClientBuilder.standard()
            .withRegion(REGION)
            .build() as AmazonS3Client
    }
    @Bean
    open fun amazonTranslateClient(): AmazonTranslateClient {
        return AmazonTranslateClientBuilder.standard()
            .withRegion(REGION)
            .build() as AmazonTranslateClient
    }
}