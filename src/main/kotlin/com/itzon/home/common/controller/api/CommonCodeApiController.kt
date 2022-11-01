package com.itzon.home.common.controller.api

import com.itzon.home.common.constant.REST_COMMON_CODE
import com.itzon.home.common.service.CommonCodeService
import com.itzon.home.domain.table.TCommonCdDetailDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("$REST_COMMON_CODE")
@RestController
class CommonCodeApiController (
    private val commonCodeService: CommonCodeService
){

    @GetMapping("/{commonCd}")
    fun loadSelectBoxByCommonCd(@PathVariable commonCd: String) : List<TCommonCdDetailDto> {
        return commonCodeService.loadSelectBoxByCommonCd(commonCd)
    }
}
