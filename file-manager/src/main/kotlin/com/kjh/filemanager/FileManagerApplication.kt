package com.kjh.filemanager

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class FileManagerApplication

fun main(args: Array<String>) {
    runApplication<FileManagerApplication>(*args)
}
