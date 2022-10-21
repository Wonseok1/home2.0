package com.itzon.home.web.system.menu.service

import com.itzon.home.domain.repository.TMenuInfoRepo
import com.itzon.home.domain.table.TMenuInfoDto
import org.springframework.stereotype.Service

@Service
class SystemMenuManageService(
    private val tMenuInfoRepo: TMenuInfoRepo
) {
    fun findAll() : List<TMenuInfoDto>{
        return tMenuInfoRepo.findAll()
    }

    fun findAllOrderByMenuLvAndOrdNoDesc(): List<TMenuInfoDto> {
        return tMenuInfoRepo.findAllOrderByMenuLvAndOrdNoDesc()
    }

    fun save(tMenuInfoDto: TMenuInfoDto) {
        if (tMenuInfoRepo.isExist(tMenuInfoDto)) {
            tMenuInfoRepo.update(tMenuInfoDto)
        }else{
            tMenuInfoRepo.insert(tMenuInfoDto)
        }
    }

    fun delete(tMenuInfoDto: TMenuInfoDto) {
        tMenuInfoRepo.delete(tMenuInfoDto)
    }

}