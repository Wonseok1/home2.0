package com.itzon.home.web.system.auth.menu.controller

import com.itzon.home.common.constant.REST_SYSTEM_AUTH_MENU
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.TAuthMenuSetDto
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.web.system.auth.menu.service.SystemAuthMenuService
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_AUTH_MENU")
class SystemAuthMenuController (
    private val systemAuthMenuService: SystemAuthMenuService
) {

    @GetMapping("/auth")
    fun getAllAuth() : List<TAuthInfoDto> {
        return systemAuthMenuService.getAllAuth()

    }

    @PostMapping
    fun save(@RequestBody tAuthMenuSetDto: List<TAuthMenuSetDto>){
        systemAuthMenuService.save(tAuthMenuSetDto)
    }

    @GetMapping("/tree")
    fun getAllMenu() : List<TMenuInfoDto> {
        return systemAuthMenuService.getAllMenu()

    }

    @GetMapping("/{authId}")
    fun findAllMenuListWhenClickAuth(@PathVariable authId: String) : List<TAuthMenuSetDto> {
        return systemAuthMenuService.findAllMenuListWhenClickAuth(authId)

    }

    @DeleteMapping
    fun delete(@RequestBody tAuthMenuSetDto: List<TAuthMenuSetDto>){
        systemAuthMenuService.delete(tAuthMenuSetDto)
    }
}