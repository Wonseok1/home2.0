package com.itzon.home.web.system.grid.manage.service

import com.itzon.home.domain.repository.TGridInfoRepo
import com.itzon.home.domain.table.TGridInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SystemGridManageService (
    private val tGridInfoRepo: TGridInfoRepo
){
    fun selectAllOrderByOrdNo(): List<TGridInfoDto> {
        return tGridInfoRepo.selectAllOrderByOrdNo()
    }
    fun save(tGridInfoDtoList: List<TGridInfoDto>) {
        tGridInfoDtoList.forEach{
            if (tGridInfoRepo.isExist(it)) {
                tGridInfoRepo.update(it)
            }else{
                tGridInfoRepo.insert(it)
            }
        }
    }
    fun delete(tGridInfoDtoList: List<TGridInfoDto>) {
        tGridInfoDtoList.forEach{
            tGridInfoRepo.delete(it)
        }
    }
}