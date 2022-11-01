package com.itzon.home.web.book

import com.itzon.home.common.constant.REST_BOOK_DETAIL
import com.itzon.home.web.book.service.BookService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

@Controller
class BookIndexController (
    private val bookService: BookService,
        ){


    @GetMapping("$REST_BOOK_DETAIL/{bookPk}")
    fun getBookDetail(@PathVariable bookPk: Int,  model: Model) : String {
        model.addAttribute("bookInfo", bookService.selectById(bookPk))
        return "views/book/detail/bookDetail"
    }
}