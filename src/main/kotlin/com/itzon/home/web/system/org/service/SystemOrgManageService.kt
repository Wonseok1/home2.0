package com.itzon.home.web.system.org.service

import com.itzon.home.domain.repository.TOrgInfoRepo
import com.itzon.home.domain.table.TOrgInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SystemOrgManageService (
    private val tOrgInfoRepo: TOrgInfoRepo
){

    fun findAllTree(): List<TOrgInfoDto> {
        return tOrgInfoRepo.findAll()

    }

    fun saveOrg(tOrgInfoDto: TOrgInfoDto) {
        if(tOrgInfoRepo.isExist(tOrgInfoDto)){
            tOrgInfoRepo.update(tOrgInfoDto)
        }else{
            tOrgInfoRepo.insert(tOrgInfoDto)
        }
    }

    fun deleteOrg(orgId: String) {
        var orgIdArr = orgId.split(",")

        for(i in 0 .. orgIdArr.size-1 step(1)){
            tOrgInfoRepo.deleteOrg(orgIdArr.get(i))
        }
//        tOrgInfoRepo.deleteOrg(orgId)
    }

}