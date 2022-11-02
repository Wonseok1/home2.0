package com.itzon.home.web.company.project.service

import com.itzon.home.domain.repository.TProjectManageRepo
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TProjectManage
import com.itzon.home.domain.table.TProjectManageDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class ProjectService(
    private val tProjectManageRepo : TProjectManageRepo
){
    fun selectAll() : List<TProjectManageDto>{
        return tProjectManageRepo.selectAll()
    }

    fun save(tProjectManageDto: TProjectManageDto, type : String): String {
        if(type == "update"){
                if (tProjectManageRepo.isExist(tProjectManageDto)) {
                    tProjectManageRepo.update(tProjectManageDto)
                }
        }else{
            tProjectManageRepo.insert(tProjectManageDto)
        }
        return type
    }

    fun delete(tProjectManageDto: TProjectManageDto) : String {
        tProjectManageRepo.delete(tProjectManageDto)
        return "delete"
    }
}