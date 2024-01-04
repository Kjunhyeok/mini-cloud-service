package com.kjh.paymentservice.vo

class Transaction {
    var mId: String? = null
    var transactionKey: String? = null
    var paymentKey: String? = null
    var orderId: String? = null
    var currency: String? = null
    var customerKey: String? = null
    var method: String? = null
    var useEscrow: Boolean? = null
    var amount: Int? = null
    var status: Status? = null
    val statusName: String?
        get() = status?.statusName
    var transactionAt: String? = null

    enum class Status(val statusName: String) {
        READY("준비"),
        IN_PROGRESS("결제중"),
        WAITING_FOR_DEPOSIT("입금대기"),
        DONE("결제완료"),
        ABORTED("결제실패"),
        EXPIRED("결제시간초과"),
        CANCELED("결제취소"),
        PARTIAL_CANCELED("결제부분취소")
    }
}