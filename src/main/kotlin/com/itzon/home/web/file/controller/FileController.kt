package com.itzon.home.web.file.controller

import com.itzon.home.common.properties.SFTPProperties
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/file")
class FileController (
    val sftpProperties: SFTPProperties,
        ){

    @GetMapping
    fun test() {
        println(sftpProperties.id)

    }
}