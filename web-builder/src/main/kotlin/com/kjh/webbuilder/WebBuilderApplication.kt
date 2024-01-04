package com.kjh.webbuilder

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class WebBuilderApplication

fun main(args: Array<String>) {
    runApplication<WebBuilderApplication>(*args)
}
