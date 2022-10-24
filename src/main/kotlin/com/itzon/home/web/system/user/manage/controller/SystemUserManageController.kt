package com.itzon.home.web.system.user.manage.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_USER_MANAGE
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.web.system.user.manage.service.SystemUserManageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_USER_MANAGE")
class SystemUserManageController  (
    private val systemUserManageService: SystemUserManageService
){

    @GetMapping
    @ApiRequestLog
    fun selectAllOrderByOrdNo() = systemUserManageService.selectAllOrderByOrdNo()

    @GetMapping("/findOrgId")
    fun selectOrgId(@RequestParam orgId : String): List<TUserInfoDto>{
        return systemUserManageService.selectOrgId(orgId)
    }

    @GetMapping("/countPk")
    fun countPk(@RequestParam userId: String): Long {
        return systemUserManageService.countPk(userId)
    }

    @PostMapping("/saveUserInfo")
    @ApiRequestLog
    fun save(@RequestBody tUserInfoList: List<TUserInfoDto>) = systemUserManageService.save(tUserInfoList)

    @PostMapping("/updateWithoutPassWord")
    @ApiRequestLog
    fun updateWithoutPassWord(@RequestBody tUserInfoList: List<TUserInfoDto>) = systemUserManageService.updateWithoutPassWord(tUserInfoList)

    @DeleteMapping("/deleteUserInfo")
    @ApiRequestLog
    fun deleteUserId(@RequestBody tUserInfoDto : TUserInfoDto) {
        systemUserManageService.delete(tUserInfoDto.userId)
    }


}