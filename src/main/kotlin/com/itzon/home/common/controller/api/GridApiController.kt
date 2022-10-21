package com.itzon.home.common.controller.api

import com.itzon.home.common.constant.REST_COMMON_GRID
import com.itzon.home.common.service.GridService
import com.itzon.home.domain.table.TGridColumnDetailDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RequestMapping("$REST_COMMON_GRID")
@RestController
class GridApiController (
    private val gridService: GridService
){
    @GetMapping("/column")
    fun selectGridColumnByGridId(@RequestParam gridId: String) : List<TGridColumnDetailDto>{
        return gridService.selectGridColumnByGridId(gridId)
    }
}