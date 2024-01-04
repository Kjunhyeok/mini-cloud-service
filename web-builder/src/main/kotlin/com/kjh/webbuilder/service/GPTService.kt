package com.kjh.webbuilder.service

import com.aallam.openai.api.BetaOpenAI
import com.aallam.openai.api.chat.ChatCompletion
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.exception.OpenAIAPIException
import com.aallam.openai.api.exception.OpenAIException
import com.aallam.openai.api.image.ImageCreation
import com.aallam.openai.api.image.ImageSize
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import com.kjh.webbuilder.vo.Translation
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service

@OptIn(BetaOpenAI::class)
@Service
class GPTService(private val openAI: OpenAI) {
    private val defaultLanguages = listOf("ko", "en", "ja", "zh")
    private val modelId = ModelId("gpt-3.5-turbo")

    private val chatList = ArrayList<ChatMessage>()

    init {
        chatList.add(ChatMessage(ChatRole.System, "앞으로 내가하는 질문은 bootstrap 기반 animation style 이 들어간 html layout elements 형식을 갖춰주고 javascript 코드가 있으면 html attributes 로 바뀐 html code 로만 답변해줘"))
        chatList.add(ChatMessage(ChatRole.System, "답변은 반드시 html code 만 해줘"))
    }
    fun generateHTMLCode(subjectContent: String): String = runBlocking {
        chatList.add(ChatMessage(ChatRole.System, subjectContent))
        val chatCompletionRequest = ChatCompletionRequest(
            model = modelId,
            messages = chatList
        )
        val completion = openAI.chatCompletion(chatCompletionRequest)
        val content = getMessageContent(completion)
        val htmlCode = if (content.contains("```html")) {
            content.substring(content.indexOf("```html") + 7, content.lastIndexOf("```"))
        } else {
            content.replace("```", "")
        }
        println(htmlCode)
        return@runBlocking htmlCode
    }
    fun generateImage(prompt: String): List<String> = runBlocking {
        val imageUrl = openAI.imageJSON(creation = ImageCreation(
            prompt = prompt, size = ImageSize.is1024x1024, n = 4
        ))
        return@runBlocking imageUrl.map { it.b64JSON }
    }
    fun translateLanguage(subjectContent: String, lang: String): String = runBlocking {
        val chatCompletionRequest = ChatCompletionRequest(
            model = modelId,
            messages = listOf(
                ChatMessage(
                    role = ChatRole.System,
                    content = "translate into $lang, \n$subjectContent"
                )
            )
        )
        val completion = openAI.chatCompletion(chatCompletionRequest)
        return@runBlocking getMessageContent(completion)
    }
    fun translateDefaultLanguages(subjectContent: String): List<Translation> = runBlocking {
        val translations = ArrayList<Translation>()
        for (lang in defaultLanguages) {
            val chatCompletionRequest = ChatCompletionRequest(
                model = modelId,
                messages = listOf(ChatMessage(
                    role = ChatRole.System,
                    content = "Translate into $lang, If it's the same language, please answer as it is \n$subjectContent"
                ))
            )
            val completion = openAI.chatCompletion(chatCompletionRequest)
            translations.add(Translation(getMessageContent(completion), lang))
        }
        return@runBlocking translations
    }

    private fun getMessageContent(chatCompletion: ChatCompletion): String {
        return chatCompletion.choices[0].message?.content ?: throw OpenAIAPIException(500, "Message is empty")
    }
}