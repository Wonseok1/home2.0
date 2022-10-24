package com.itzon.home.web.system.auth.manage.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_AUTH_MANAGE
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.web.system.auth.manage.service.SystemAuthManageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_AUTH_MANAGE")
class SystemAuthManageController(
    private val systemAuthManageService: SystemAuthManageService
) {

    @GetMapping
    @ApiRequestLog
    fun selectAll() : List<TAuthInfoDto>{
        return systemAuthManageService.selectAll()
    }

    @PostMapping
    @ApiRequestLog
    fun save(@RequestBody tAuthInfoDtos: List<TAuthInfoDto>) {
        systemAuthManageService.save(tAuthInfoDtos)
    }

    @DeleteMapping
    @ApiRequestLog
    fun delete(@RequestBody tAuthInfoDtos: List<TAuthInfoDto>) {
        systemAuthManageService.delete(tAuthInfoDtos)
    }

}