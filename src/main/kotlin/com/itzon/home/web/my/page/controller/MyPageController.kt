package com.itzon.home.web.my.page.controller

import com.itzon.home.common.constant.REST_MY_PAGE
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TMyPageSetDto
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.web.my.page.service.MyPageService
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpSession

@RestController
@RequestMapping("$REST_MY_PAGE")
class MyPageController (
    private val myPageService: MyPageService,
    private val httpSession: HttpSession,
){

    @GetMapping("/menu")
    fun findAllMenu():List<TMenuInfoDto>{
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return myPageService.findAllMenu(tUserInfoDto)
    }

    @GetMapping("/myPage")
    fun findAllMyPage():List<TMyPageSetDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return myPageService.findAllMyPage(tUserInfoDto.userId)
    }

    @PostMapping()
    fun saveMyPage(@RequestBody tMenuInfoDto: TMenuInfoDto){
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        myPageService.saveMyPage(tUserInfoDto.userId, tMenuInfoDto.menuId)
    }

    @PostMapping("/detail")
    fun saveMyPageDtl(@RequestBody tMyPageSetDtoList: List<TMyPageSetDto>){
        myPageService.saveMyPageDtl(tMyPageSetDtoList)
    }

    @DeleteMapping()
    fun deleteMyPage(@RequestBody tMyPageSetDtoList: List<TMyPageSetDto>){
        myPageService.deleteMyPage(tMyPageSetDtoList)
    }
}