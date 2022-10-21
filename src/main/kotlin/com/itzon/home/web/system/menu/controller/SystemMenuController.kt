package com.itzon.home.web.system.menu.controller

import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.web.system.menu.service.SystemMenuManageService
import com.itzon.itz.common.constant.REST_SYSTEM_MENU_MANAGE
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@RestController
@Transactional
@RequestMapping("$REST_SYSTEM_MENU_MANAGE")
class SystemMenuManageApiController (
    private val systemMenuManageService: SystemMenuManageService
){

    @GetMapping
    fun findAllOrderByMenuLvAndOrdNoDesc() : List<TMenuInfoDto>{
        return systemMenuManageService.findAllOrderByMenuLvAndOrdNoDesc()
    }

    @PostMapping
    fun save(@RequestBody tMenuInfoDto: TMenuInfoDto){
        systemMenuManageService.save(tMenuInfoDto)
    }

    @DeleteMapping
    fun delete(@RequestBody tMenuInfoDto: TMenuInfoDto){
        systemMenuManageService.delete(tMenuInfoDto)
    }

}
