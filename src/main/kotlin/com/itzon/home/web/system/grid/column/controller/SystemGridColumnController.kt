package com.itzon.home.web.system.grid.column.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_SYSTEM_GRID_COLUMN
import com.itzon.home.domain.table.TGridColumnDetailDto
import com.itzon.home.domain.table.TGridInfoDto
import com.itzon.home.web.system.grid.column.service.SystemGridColumnService
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@Transactional
@RestController
@RequestMapping("$REST_SYSTEM_GRID_COLUMN")
class SystemGridColumnController(
    private val systemGridColumnService: SystemGridColumnService
) {
    @GetMapping("/gridInfo")
    @ApiRequestLog
    fun selectAllOrderByOrdNo(): List<TGridInfoDto> {
        return systemGridColumnService.selectAllOrderByOrdNo()
    }
    @GetMapping("/columnDetail")
    @ApiRequestLog
    fun findAllByGridIdOrderByGridColumnDesc(@RequestParam gridId: String): List<TGridColumnDetailDto> {
        return systemGridColumnService.findAllGridColumnInfoByGridId(gridId)
    }
    @PostMapping("/gridInfo")
    @ApiRequestLog
    fun saveGridInfo(@RequestBody tGridInfoDtoList: List<TGridInfoDto> ) {
        systemGridColumnService.saveGridInfo(tGridInfoDtoList)
    }
    @PostMapping("/columnDetail")
    @ApiRequestLog
    fun saveGridColumnDetail(@RequestBody tGridColumnDetailDtoList: List<TGridColumnDetailDto> ) {
        systemGridColumnService.saveGridColumnDetail(tGridColumnDetailDtoList)
    }

    @DeleteMapping("/gridInfo")
    @ApiRequestLog
    fun deleteGridInfo(@RequestBody tGridInfoDtoList: List<TGridInfoDto>) {
        systemGridColumnService.deleteGridInfo(tGridInfoDtoList)
    }

    @DeleteMapping("/columnDetail")
    @ApiRequestLog
    fun deleteGridDetail(@RequestBody tGridColumnDetailDtoList: List<TGridColumnDetailDto>) {
        systemGridColumnService.deleteGridColumn(tGridColumnDetailDtoList)
    }
}