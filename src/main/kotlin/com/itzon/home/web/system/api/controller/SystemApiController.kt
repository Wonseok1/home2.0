package com.itzon.home.web.system.api.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_API
import com.itzon.home.domain.table.TApiInfoDto
import com.itzon.home.web.system.api.service.SystemApiService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_API")
class SystemApiController (
    private val systemApiService: SystemApiService
){
    @GetMapping
    @ApiRequestLog
    fun selectAll() = systemApiService.selectAll()

    @PostMapping
    @ApiRequestLog
    fun save(@RequestBody tApiInfoDtoList: List<TApiInfoDto>) = systemApiService.save(tApiInfoDtoList)

    @DeleteMapping
    @ApiRequestLog
    fun delete(@RequestBody tApiInfoDtoList: List<TApiInfoDto>) = systemApiService.delete(tApiInfoDtoList)
}