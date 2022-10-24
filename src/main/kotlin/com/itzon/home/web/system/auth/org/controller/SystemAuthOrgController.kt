package com.itzon.home.web.system.auth.org.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_AUTH_ORG
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.TAuthOrgSetDto
import com.itzon.home.domain.table.TOrgInfoDto
import com.itzon.home.web.system.auth.org.service.SystemAuthOrgService
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@RestController
@Transactional
@RequestMapping("$REST_SYSTEM_AUTH_ORG")
class SystemAuthOrgController (
    private val systemAuthOrgService: SystemAuthOrgService,
) {

    @GetMapping("/auth")
    fun getAllAuth() : List<TAuthInfoDto> {
        return systemAuthOrgService.getAllAuth()

    }

    @PostMapping
    @ApiRequestLog
    fun save(@RequestBody tAuthOrgSetDto: List<TAuthOrgSetDto>){
        systemAuthOrgService.save(tAuthOrgSetDto)
    }

    @GetMapping("/tree")
    fun getAllMenu() : List<TOrgInfoDto> {
        return systemAuthOrgService.getAllMenu()

    }

    @GetMapping("/{authId}")
    fun findAllMenuListWhenClickAuth(@PathVariable authId: String) : List<TAuthOrgSetDto> {
        return systemAuthOrgService.findAllMenuListWhenClickAuth(authId)

    }

    @DeleteMapping
    @ApiRequestLog
    fun delete(@RequestBody tAuthOrgSetDto: List<TAuthOrgSetDto>){
        systemAuthOrgService.delete(tAuthOrgSetDto)
    }
}