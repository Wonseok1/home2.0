package com.itzon.home.web.my.menu.controller

import com.itzon.home.common.constant.REST_MY_MENU
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TMyMenuSetDto
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.web.my.menu.service.MyMenuService
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpSession


@RequestMapping("$REST_MY_MENU")
@RestController
class MyMenuController (
    private val myMenuService: MyMenuService,
    private val httpSession: HttpSession,
){
    @GetMapping("/menu")
    fun findMenuExceptMine():List<TMenuInfoDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return myMenuService.findMenuExceptMine(tUserInfoDto)
    }

    @GetMapping("/myMenu")
    fun findAllMyMenu():List<TMyMenuSetDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return myMenuService.findAllMyMenu(tUserInfoDto.userId)
    }

    @PostMapping()
    fun insert(@RequestBody tMenuInfoDto: TMenuInfoDto){
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        myMenuService.insert(tUserInfoDto.userId, tMenuInfoDto.menuId)
    }

    @DeleteMapping()
    fun deleteMyMenu(@RequestBody tMyMenuSetDtoList: List<TMyMenuSetDto>){
        myMenuService.deleteMyMenu(tMyMenuSetDtoList)
    }

}