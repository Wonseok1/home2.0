package com.itzon.home.web.company

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class CompanyIndexController {

    @GetMapping("/company/company/company")
    fun getCompany() : String {
        println("getCompany")
        return "views/company/company/company"
    }
}