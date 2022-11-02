package com.itzon.home.web.company.history.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_COMPANY_HISTORY_MANAGE
import com.itzon.home.domain.table.TCompanyHistoryDto
import com.itzon.home.web.company.history.service.HistoryService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_COMPANY_HISTORY_MANAGE") // /api/company/notice/notice
class HistoryApiController(
        private val  historyService: HistoryService
) {
    @GetMapping
    fun selectAll(): List<TCompanyHistoryDto> {
        return historyService.selectAll(true)
    }

    @PostMapping()
    @ApiRequestLog
    fun save(@RequestBody tCompanyHistoryDto: List<TCompanyHistoryDto>) {
        historyService.save(tCompanyHistoryDto)
    }

    @DeleteMapping()
    @ApiRequestLog
    fun delete(@RequestBody tCompanyHistoryDto: List<TCompanyHistoryDto>) {
        historyService.delete(tCompanyHistoryDto)
    }

}