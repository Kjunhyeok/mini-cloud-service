package com.kjh.paymentservice.controller

import com.kjh.paymentservice.api.TossDelegator
import com.kjh.paymentservice.vo.Cancel
import com.kjh.paymentservice.vo.CardRequest
import com.kjh.paymentservice.vo.Transaction
import org.springframework.web.bind.annotation.*
import springfox.documentation.annotations.ApiIgnore
import java.util.*
import javax.servlet.http.HttpServletResponse

@CrossOrigin("*")
@RestController
@RequestMapping
class PaymentController(private val tossDelegator: TossDelegator) {

    @ApiIgnore
    @GetMapping
    fun swagger(response: HttpServletResponse) {
        response.sendRedirect("/payment-service/swagger-ui/index.html")
    }

    @GetMapping("/confirm")
    fun cardPayment(cardRequest: CardRequest): String {
        tossDelegator.cardConfirm(cardRequest)
        return "<script>window.close();</script>"
    }

    @GetMapping("/fail")
    fun failPayment(code: String, message: String): String {
        return message
    }

    @GetMapping("/transactions")
    fun transactions(): List<Transaction> {
        val transactions = tossDelegator.transactions()
        transactions.reverse()
        return transactions
    }

    @PostMapping("/{paymentKey}/cancel")
    fun cancel(@PathVariable paymentKey: String, @RequestBody cancel: Cancel): String {
        return tossDelegator.cancel(paymentKey, cancel)
    }
}