package com.itzon.home.web.file.share.controller

import com.itzon.home.web.file.share.service.FileShareService
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@RestController
class Controller (
    private val fileShareService: FileShareService,
        ){


    @RequestMapping("/system/main/fileDownload3")
    fun downloadFile(request: HttpServletRequest, response: HttpServletResponse) {

        return fileShareService.downloadFile(request,response)

    }

    @RequestMapping("/system/main/fileDownload1")
    fun downloadFile1(request: HttpServletRequest, response: HttpServletResponse) {

        System.out.println("controller")
        return fileShareService.testDownload(request,response)
//        return fileShareService.downloadImage(request,response)

    }


}