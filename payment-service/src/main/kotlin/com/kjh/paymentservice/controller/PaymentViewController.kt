package com.kjh.paymentservice.controller

import com.kjh.paymentservice.view.PaymentView
import com.kjh.paymentservice.vo.PaymentType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@CrossOrigin("*")
@Controller
@RequestMapping("/payments")
class PaymentViewController {

    @ResponseBody
    @GetMapping(produces = ["text/html; charset=utf-8"])
    fun view(@RequestParam(defaultValue = "CARD") type: PaymentType,
             amount: Int, orderName: String, customerName: String, request: HttpServletRequest): String {
        return PaymentView.create(type.typeName, amount,
            System.currentTimeMillis().toString(), orderName, customerName,
            "https://${request.serverName}/payment-service/confirm", "https://${request.serverName}/payment-service/fail")
    }
}