package com.itzon.home.common.controller.api

import com.itzon.home.common.constant.REST_COMMON_SIGNUP
import com.itzon.home.common.service.SignUpService
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("$REST_COMMON_SIGNUP")
class SignUpApiController (
    private val signUpService: SignUpService
        ){
    @PostMapping
    fun insert(@RequestBody tUserInfoDto : TUserInfoDto) {
        signUpService.insert(tUserInfoDto)
    }

    @GetMapping("/check")
    fun check(@RequestParam userId: String): Boolean {
        println(userId)
        return signUpService.isExist(userId)
    }
}