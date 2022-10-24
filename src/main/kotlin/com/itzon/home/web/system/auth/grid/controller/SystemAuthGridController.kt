package com.itzon.home.web.system.auth.grid.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_AUTH_GRID
import com.itzon.home.domain.table.TAuthGridSetDto
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.TGridInfoDto
import com.itzon.home.web.system.auth.grid.dto.SelectGridAuthDto
import com.itzon.home.web.system.auth.grid.service.SystemAuthGridService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_AUTH_GRID")
class SystemAuthGridController (
    private val systemAuthGridService: SystemAuthGridService
){

    @GetMapping("/auth")
    fun getAllAuth(): List<TAuthInfoDto> {
        return systemAuthGridService.getAllAuth()

    }

    @GetMapping("/grid")
    fun getAllGrid(): List<TGridInfoDto> {
        return systemAuthGridService.getAllGrid()

    }

    @GetMapping("/{authId}")
    fun findAllGridListWhenClickAuth(@PathVariable authId: String): List<SelectGridAuthDto> {
        return systemAuthGridService.findAllGridListWhenClickAuth(authId)

    }

    @PostMapping
    @ApiRequestLog
    fun save(@RequestBody tAuthMenuSetDto: List<TAuthGridSetDto>) {
        systemAuthGridService.save(tAuthMenuSetDto)
    }

}