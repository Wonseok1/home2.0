package com.itzon.home.web.system.grid.manage.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_GRID_MANAGE
import com.itzon.home.domain.table.TGridInfoDto
import com.itzon.home.web.system.grid.manage.service.SystemGridManageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_GRID_MANAGE")
class SystemGridManageController (
    private val systemGridManageService: SystemGridManageService
){
    @GetMapping
    @ApiRequestLog
    fun selectAllOrderByOrdNo() = systemGridManageService.selectAllOrderByOrdNo()

    @PostMapping
    @ApiRequestLog
    fun save(@RequestBody tGridInfoDtoList: List<TGridInfoDto>) = systemGridManageService.save(tGridInfoDtoList)

    @DeleteMapping
    @ApiRequestLog
    fun delete(@RequestBody tGridInfoDtoList: List<TGridInfoDto>) = systemGridManageService.delete(tGridInfoDtoList)

}