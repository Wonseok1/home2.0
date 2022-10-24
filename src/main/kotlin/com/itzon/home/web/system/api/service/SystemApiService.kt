package com.itzon.home.web.system.api.service

import com.itzon.home.domain.repository.TApiInfoRepo
import com.itzon.home.domain.table.TApiInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SystemApiService (
    private val tApiInfoRepo: TApiInfoRepo
){
    fun selectAll(): List<TApiInfoDto>{
        return tApiInfoRepo.selectAll()
    }

    fun save(tApiInfoDtoList: List<TApiInfoDto>) {
        tApiInfoDtoList.forEach{
            if (tApiInfoRepo.isExist(it)) {
                tApiInfoRepo.update(it)
            }else{
                tApiInfoRepo.insert(it)
            }
        }
    }
    fun delete(tApiInfoDtoList: List<TApiInfoDto>) {
        tApiInfoDtoList.forEach{
            tApiInfoRepo.delete(it)
        }
    }
}