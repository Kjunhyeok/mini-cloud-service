package com.kjh.paymentservice.config


class TossAuthentication private constructor() {

    companion object {
        val CLIENT_KEY: String = System.getenv("toss-client-key") ?: ""
        val SECRET_KEY: String = System.getenv("toss-secret-key") ?: ""
    }
}