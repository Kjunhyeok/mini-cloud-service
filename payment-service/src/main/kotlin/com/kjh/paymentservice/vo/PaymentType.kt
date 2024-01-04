package com.kjh.paymentservice.vo

enum class PaymentType(val typeName: String) {
    CARD("카드"),
    VIRTUAL("가상계좌"),
    TRANSFER("계좌이체"),
    MOBILE("휴대폰"),
    GIFT("도서문화상품권")
}