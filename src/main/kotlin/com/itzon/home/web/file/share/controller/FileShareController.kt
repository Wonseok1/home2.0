package com.itzon.home.web.file.share.controller

import com.itzon.home.common.constant.REST_FILE_SHARE
import com.itzon.home.common.properties.SFTPProperties
import com.itzon.home.web.file.share.service.FileShareService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("$REST_FILE_SHARE")
class FileShareController (
    private val sftpProperties: SFTPProperties,
    private val fileShareService: FileShareService,
        ){

    @GetMapping("/dir")
    fun mkdir(@RequestParam("path") path: String ,@RequestParam("dirNm") dirNm: String) {
        var file: File = File("$path/$dirNm")

        if (!file.exists()) {
            try {
                file.mkdir()
                System.out.println("디렉토리 생성")
            } catch (e: Exception) {
                e.stackTrace
                System.err.println("디렉토리 생성 실패")
            }
        } else {
            System.err.println("디렉토리 있음")
        }
    }

    @PostMapping
    fun uploadFile(@RequestParam("path")path: String, @RequestParam("file")file: MultipartFile) {
        val fileName: String? = file.originalFilename //파일명 얻기
        val realFile: File = File("$path/$fileName")

        if(!realFile.exists()) {
            file.transferTo(realFile)
        } else {
            System.err.println("같은 이름의 파일이 이미 존재합니다.")
        }

    }

    @RequestMapping("/fileDownload3")
    fun downloadFile(request: HttpServletRequest, response: HttpServletResponse) {
        return fileShareService.downloadFile(request,response)
    }

    @GetMapping("/download")
    fun download(request: HttpServletRequest, response: HttpServletResponse){
        return fileShareService.testDownload(request,response)
    }

    @GetMapping("/list")
    fun list(): String {
        return sftpProperties.defaultpath

    }

    @GetMapping("/clickList")
    fun clickList(@RequestParam(value = "path") path: String): Array<File>? {
        val dir: File = File(path)
        return dir.listFiles()

    }

    fun uploadMultiFiles() {

    }

    fun downloadMultiFiles() {

    }

    fun getFilesList() {

    }

    @GetMapping("/delete")
    fun delete(request: HttpServletRequest, response: HttpServletResponse, @RequestParam(value = "name") name: String, @RequestParam(value = "path") path: String){

        val file: File = File(path)

        if (file.exists()) {
            if (file.isDirectory){
                val files = file.listFiles()
                if (files.isEmpty()) {
                    file.delete()
                } else {
                    files.forEach {
                        it.delete()
                    }
                    file.delete()
                }
            } else {
                file.delete()
            }
        }
    }

}