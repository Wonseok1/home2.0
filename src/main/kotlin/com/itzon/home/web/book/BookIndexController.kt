package com.itzon.home.web.book

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class BookIndexController {

    @GetMapping("/book/detail")
    fun getBookDetail() : String {
        return "views/book/detail/bookDetail"
    }
}