package com.itzon.home.web.company.project.controller

import com.itzon.home.common.annotation.ApiRequestLog
import com.itzon.home.common.constant.REST_COMPANY_PROJECT_MANAGE
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TProjectManageDto
import com.itzon.home.web.company.project.service.ProjectService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("$REST_COMPANY_PROJECT_MANAGE")
class ProjectApiController(
    private val projectService: ProjectService
) {

    @GetMapping
    @ApiRequestLog
    fun selectAll() : List<TProjectManageDto>{
        return projectService.selectAll()
    }

    @PostMapping("/{type}")
    fun save(@PathVariable type : String, @RequestBody tProjectManageDto: TProjectManageDto) : String {
        println(tProjectManageDto)
        println(type)
        return projectService.save(tProjectManageDto,type)
    }

    @DeleteMapping("/delete")
    fun delete(@RequestBody tProjectManageDto: TProjectManageDto) : String{
        return projectService.delete(tProjectManageDto)
    }

}