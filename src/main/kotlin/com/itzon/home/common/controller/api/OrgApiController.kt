package com.itzon.home.common.controller.api

import com.itzon.home.common.constant.REST_COMMON_ORG
import com.itzon.home.common.service.OrgService
import com.itzon.home.domain.table.TOrgInfoDto
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpSession


@RestController
@RequestMapping("$REST_COMMON_ORG")
class OrgApiController (
    private val orgService: OrgService,
    private val httpSession: HttpSession,
){
    @GetMapping
    fun findOrgByOrgAuth(): List<TOrgInfoDto> {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return orgService.findOrgInfoByAuth(tUserInfoDto)
    }
    //api/common/org

}