package com.kjh.paymentservice.view

import com.kjh.paymentservice.config.TossAuthentication

class PaymentView private constructor() {

    companion object {
        fun create(type: String, amount: Int, orderId: String, orderName: String, customerName: String, successUrl: String, failUrl: String): String {
            return (
                    "<head>" +
                    "  <title>결제하기</title>" +
                    "  <meta charset=\"utf-8\">" +
                    "  <script src=\"https://js.tosspayments.com/v1/payment\"></script>" +
                    "</head>" +
                    "<body>" +
                    "  <script>" +
                    "    var clientKey = '${TossAuthentication.CLIENT_KEY}'\n" +
                    "    var tossPayments = TossPayments(clientKey)\n" +
                    "    tossPayments.requestPayment('$type', {\n" +
                            "  // 결제 정보 파라미터\n" +
                            "  amount: $amount,\n" +
                            "  orderId: '$orderId',\n" +
                            "  orderName: '$orderName',\n" +
                            "  customerName: '$customerName',\n" +
                            "  successUrl: '$successUrl',\n" +
                            "  failUrl: '$failUrl',\n" +
                            "})\n" +
                            ".catch(function (error) {\n" +
                            "  if (error.code === 'USER_CANCEL') {\n" +
                            "  } else if (error.code === 'INVALID_CARD_COMPANY') {\n" +
                            "  }\n" +
                            "})\n" +
                    "  </script>" +
                    "</body>"
                    )
        }
    }
}