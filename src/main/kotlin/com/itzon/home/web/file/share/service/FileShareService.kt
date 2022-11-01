package com.itzon.home.web.file.share.service

import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestMapping
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class FileShareService {

    @RequestMapping("/fileDownload3")
    fun downloadFile(request: HttpServletRequest, response: HttpServletResponse) {

        //===전달 받은 정보를 가지고 파일객체 생성(S)===//
        val f:String  = request.getParameter("f") //저장된 파일이름
        var of:String  = request.getParameter("of") //원래 파일이름
        val path:String  = request.getParameter("path") //파일이 저장된 경로
        of =  String(of.toByteArray(Charsets.UTF_8),Charsets.ISO_8859_1)
        val fullPath:String  = path+"/"+f
        val downLoadFile: File = File(fullPath)
        response.contentType = "application/download; charset=utf-8"

        //파일 사이즈 지정
        response.setContentLength(downLoadFile.length().toInt())
        //다운로드 창을 띄우기 위한 헤더 조작
        response.contentType = "application/octet-stream; charset=utf-8"
        response.setHeader(
            "Content-Disposition", "attachment;filename="
                    + String(of.toByteArray(), Charsets.ISO_8859_1)
        )

        response.setHeader("Content-Transfer-Encoding","binary")

        var inputStream = FileInputStream(downLoadFile)
        var outputStream = response.outputStream
        var size = -1
        do{
            size=inputStream.read()
            outputStream.write(size)
        } while(size!=-1)

        inputStream.close()
        outputStream.close()

    }

    fun download(request: HttpServletRequest, response: HttpServletResponse,name: String, path: String, downloadLink: String) {

        val downLoadFile: File = File(path)
        response.contentType = "application/download; charset=utf-8"

        //파일 사이즈 지정
        response.setContentLength(downLoadFile.length().toInt())
        //다운로드 창을 띄우기 위한 헤더 조작
        response.contentType = "application/octet-stream; charset=utf-8"
        response.setHeader(
            "Content-Disposition", "attachment;filename="
                    + String(name.toByteArray(), Charsets.ISO_8859_1)
        )
        response.setHeader("Content-Transfer-Encoding","binary")

        val inputStream = FileInputStream(downLoadFile)
        val outputStream = response.outputStream
        var size = -1
        do{
            size=inputStream.read()
            outputStream.write(size)
        } while(size!=-1)

        inputStream.close()
        outputStream.close()

    }

    fun testDownload(request: HttpServletRequest, response: HttpServletResponse) {

        //===전달 받은 정보를 가지고 파일객체 생성(S)===//
        var name:String  = request.getParameter("fileName") //원래 파일이름
        val path:String  = request.getParameter("filePath") //파일이 저장된 경로
        name =  String(name.toByteArray(Charsets.UTF_8),Charsets.ISO_8859_1)

        val downLoadFile: File = File(path)

        //파일 유형
        response.contentType = "application/download; charset=utf-8"
        response.contentType = "application/octet-stream; charset=utf-8"
        //파일 사이즈
        response.setContentLength(downLoadFile.length().toInt())
        //데이터 형식/성향 설정(attachment: 첨부파일)
        response.setHeader("Content-Disposition", "attachment;filename=" + name )
        //내용물 인코딩 방식설정
        response.setHeader("Content-Transfer-Encoding","binary")


        val inputStream = FileInputStream(downLoadFile)
        val outputStream = response.outputStream
        var size = -1
        do{
            size=inputStream.read()
            outputStream.write(size)
        } while(size!=-1)

        inputStream.close()
        outputStream.close()

    }

    fun downloadImage(request: HttpServletRequest, response: HttpServletResponse) : ResponseEntity<Resource>? {
        System.out.println("service")

        var result: ResponseEntity<Resource>? = null

        try {

            var name:String  = request.getParameter("fileName") //원래 파일이름
            val path:String  = request.getParameter("filePath") //파일이 저장된 경로

            val originFileNm = URLDecoder.decode(name, "UTF-8")

            val file: Resource = FileSystemResource(path)

            if(!file.exists()) {
                return ResponseEntity(HttpStatus.NOT_FOUND)
            }

            val onlyFileNm = originFileNm.substring(0,originFileNm.lastIndexOf("."))

            val header: HttpHeaders = HttpHeaders()

            header.add("Content-Disposition", "attachment; filename=$originFileNm")

            System.out.println(onlyFileNm)


            result = ResponseEntity(file, header, HttpStatus.OK)

            System.out.println(result)

        } catch (e: IOException) {
            e.printStackTrace()
        }

        return result





////        name =  String(name.toByteArray(Charsets.UTF_8),Charsets.ISO_8859_1)
//
////        val encodedNm = UrlUtils.encode(name, StandardCharsets.UTF_8)
//        val contentDispostition = "attachment; filename=\"$name\""
//        val resource: UrlResource = UrlResource("file:$path")
//
//        System.out.println(resource)
//        System.out.println(ResponseEntity.ok()
//            .header(HttpHeaders.CONTENT_DISPOSITION, contentDispostition)
//            .body(resource))
//
////        val downLoadFile: File = File(path)
//
//        return ResponseEntity.ok()
//            .header(HttpHeaders.CONTENT_DISPOSITION, contentDispostition)
//            .body(resource)

    }
}

