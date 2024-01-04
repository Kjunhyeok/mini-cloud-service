package com.kjh.paymentservice.api

import com.kjh.paymentservice.config.TossAuthentication
import com.kjh.paymentservice.vo.Cancel
import com.kjh.paymentservice.vo.CardRequest
import com.kjh.paymentservice.vo.Transaction
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestTemplate
import java.util.*

@Component
class TossDelegator {

    companion object {
        private val restTemplate: RestTemplate = RestTemplate()
    }

    fun cardConfirm(cardRequest: CardRequest) {
        restTemplate.postForEntity("https://api.tosspayments.com/v1/payments/confirm",
            requestAuthEntity(cardRequest),
            String::class.java)
    }
    fun transactions(): MutableList<Transaction> {
        return restTemplate.exchange("https://api.tosspayments.com/v1/transactions?startDate=2022-12-01&endDate=2023-12-31",
            HttpMethod.GET, requestAuthEntity(null),
            object : ParameterizedTypeReference<MutableList<Transaction>>() {}).body ?: throw RestClientException("응답값이 비었습니다.")
    }
    fun cancel(paymentKey: String, cancel: Cancel): String {
        return try {
            restTemplate.postForObject(
                "https://api.tosspayments.com/v1/payments/$paymentKey/cancel",
                requestAuthEntity(cancel),
                String::class.java
            )
            "정상 처리되었습니다."
        } catch (e: HttpClientErrorException) {
            e.message!!
        }
    }

    private fun <T> requestAuthEntity(body: T): HttpEntity<T> {
        val encodedBytes = Base64.getEncoder().encode("${TossAuthentication.SECRET_KEY}:".toByteArray())
        val authorizations = "Basic " + String(encodedBytes, 0, encodedBytes.size)
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        headers.add("Authorization", authorizations)
        headers.add("Idempotency-Key", UUID.randomUUID().toString())

        return HttpEntity(body, headers)
    }
}