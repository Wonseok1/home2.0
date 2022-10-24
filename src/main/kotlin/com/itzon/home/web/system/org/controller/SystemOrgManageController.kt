package com.itzon.home.web.system.org.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_ORG_MANAGE
import com.itzon.home.domain.table.TOrgInfoDto
import com.itzon.home.web.system.org.service.SystemOrgManageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_SYSTEM_ORG_MANAGE")
class SystemOrgManageController (
    private val systemOrgManageService : SystemOrgManageService
){

    @GetMapping("/findAllTree")
    @ApiRequestLog
    fun findAllTree() : List<TOrgInfoDto>{
        return systemOrgManageService.findAllTree()
    }

    @PostMapping("/saveOrg")
    @ApiRequestLog
    fun saveCounselScript(@RequestBody tOrgInfoDto: TOrgInfoDto) {
        systemOrgManageService.saveOrg(tOrgInfoDto)
    }

    @DeleteMapping("/deleteOrg")
    @ApiRequestLog
    fun deleteCounselScript(@RequestBody tOrgInfoDto: TOrgInfoDto){
        println("tOrgInfoDto                    =            "+tOrgInfoDto)
        println("tOrgInfoDto                    =            "+tOrgInfoDto.orgId)
        systemOrgManageService.deleteOrg(tOrgInfoDto.orgId)
    }

}