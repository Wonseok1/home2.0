package com.itzon.home.web.system.commoncd.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_COMMONCD
import com.itzon.home.domain.table.TCommonCdDetailDto
import com.itzon.home.domain.table.TCommonCdInfoDto
import com.itzon.home.web.system.commoncd.service.systemCommonCdService
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@Transactional
@RestController
@RequestMapping("$REST_SYSTEM_COMMONCD")
class systemCommonCdController (
    private val systemCommonCdService: systemCommonCdService
) {
    @GetMapping()
    fun findCmnCd(): List<TCommonCdInfoDto> {
        return systemCommonCdService.findCmnCd()
    }

    @GetMapping("/detail")
    fun findCmnCdDtl(@RequestParam commonCd:String) : List<TCommonCdDetailDto> {
        return systemCommonCdService.findCmnCdDtl(commonCd)
    }

    @PostMapping()
    @ApiRequestLog
    fun saveCmnCd(@RequestBody tCommonCdInfoDtoList: List<TCommonCdInfoDto>) {
        println(tCommonCdInfoDtoList)
        systemCommonCdService.saveCmnCd(tCommonCdInfoDtoList)
    }

    @PostMapping("/detail")
    fun saveCmnCdDtl(@RequestBody tCommonCdDetailDtoList: List<TCommonCdDetailDto>) {
        systemCommonCdService.saveCmnCdDtl(tCommonCdDetailDtoList)
    }
}