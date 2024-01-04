package com.kjh.webbuilder.config

import com.aallam.openai.api.http.Timeout
import com.aallam.openai.client.OpenAI
import com.aallam.openai.client.OpenAIConfig
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import kotlin.time.Duration.Companion.seconds

@Configuration
open class GPTConfig {

    @Bean
    open fun openAI(): OpenAI {
        return OpenAI(OpenAIConfig(token = "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", timeout = Timeout(socket = 300.seconds)))
    }
}