package com.itzon.home.common.controller.api

import com.itzon.home.common.constant.REST_COMMON_MENU
import com.itzon.home.common.service.MenuService
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpSession

@RestController
@RequestMapping("$REST_COMMON_MENU")
class MenuApiController(
    private val menuService: MenuService,
    private val httpSession: HttpSession,
) {
    @GetMapping
    fun findAllOrderByMenuLvAndOrdNoDesc(): List<TMenuInfoDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return menuService.findAllMenuByUserMenuAuthOrderByMenuLvAndOrdNoDesc(tUserInfoDto)
//        return menuService.findAllOrderByMenuLvAndOrdNoDesc()
    }

    @GetMapping("/myMenu")
    fun findAllMyMenu(): List<TMenuInfoDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return menuService.findAllMyMenu(tUserInfoDto.userId)
    }

    @GetMapping("/myPage")
    fun findAllMyPage(): List<TMenuInfoDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return menuService.findAllMyPageOrdByOrdNo(tUserInfoDto.userId)
    }
}