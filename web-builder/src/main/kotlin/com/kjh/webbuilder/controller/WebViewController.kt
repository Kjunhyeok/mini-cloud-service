package com.kjh.webbuilder.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/web-builder")
class WebViewController {

    @GetMapping("/static/js/{file}")
    fun js(@PathVariable file: String): String {
        return "forward:/react/web-builder/static/js/${file}"
    }

    @GetMapping("/static/css/{file}")
    fun css(@PathVariable file: String): String {
        return "forward:/react/web-builder/static/css/${file}"
    }
}