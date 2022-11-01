package com.itzon.home.web.book.controller

import com.itzon.home.common.constant.REST_BOOK
import com.itzon.home.common.properties.BookProperties
import com.itzon.home.domain.table.TBookInfoDto
import com.itzon.home.domain.table.TBookPageSetDto
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.web.book.dto.BookPageSetSaveRequestDto
import com.itzon.home.web.book.service.BookService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.FileInputStream
import java.lang.Exception
import javax.servlet.ServletOutputStream
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpSession

@RestController
@RequestMapping("$REST_BOOK") // /api/company/notice/notice
class BookApiController(
    private val bookService: BookService,
    private val httpSession: HttpSession,
    private val bookProperties: BookProperties,
) {
    @GetMapping
    fun selectAllUseYnTrue(): List<TBookInfoDto> {
        return bookService.selectByUseYn(true)
    }

    @GetMapping("/{bookPk}")
    fun selectBookDetailInitInfo(@PathVariable bookPk : Int): List<TBookPageSetDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return bookService.selectPageSetByBookPkAndUserId(bookPk, tUserInfoDto.userId)
    }

    @GetMapping("/{bookPk}/{pageNo}")
    fun loadPage(@PathVariable bookPk : Int, @PathVariable pageNo : Int, response: HttpServletResponse){
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        val tBookInfoDto : TBookInfoDto = bookService.selectBookByBookPk(bookPk)
        response.contentType = "image/gif"
        val bout = response.outputStream
        var imgPath: String = bookProperties.defaultPath + File.separator+ tBookInfoDto.bookPath + File.separator + tBookInfoDto.bookFileNm+ String.format("%03d", pageNo)

        if (pageNo % 2 == 1) {
            bookService.savePageSet(
                BookPageSetSaveRequestDto(
                    bookPk = bookPk,
                    pageNum = pageNo,
                    userId = tUserInfoDto.userId
                )
            )
        }


        println(imgPath)
        val exts = arrayOf(".bmp", ".jpg", ".gif", ".png", ".jpeg")
        for (ext in exts) {
            val f = File(imgPath + ext)
            if (f.exists()) {
                imgPath = imgPath + ext
                break
            }
        }
        val f = FileInputStream(imgPath)
        var length: Int
        val buffer = ByteArray(10)
        while (f.read(buffer).also { length = it } != -1) bout.write(buffer, 0, length)
    }
}