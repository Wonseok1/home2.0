package com.itzon.home.web.company.history.service

import com.itzon.home.domain.repository.TCompanyHistoryRepo
import com.itzon.home.domain.table.TCompanyHistoryDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class HistoryService (
        private val tCompanyHistoryRepo: TCompanyHistoryRepo
        ){
    fun selectAll(useYn : Boolean): List<TCompanyHistoryDto> {
        return tCompanyHistoryRepo.selectAll(useYn)

    }

    fun save(tCompanyHistoryDto: List<TCompanyHistoryDto>) {
        tCompanyHistoryDto.forEach{
            if (tCompanyHistoryRepo.isExist(it)) {
                tCompanyHistoryRepo.update(it)
            }else{
                tCompanyHistoryRepo.insert(it)
            }
        }
    }

    fun delete(tCompanyHistoryDto: List<TCompanyHistoryDto>) {
        tCompanyHistoryDto.forEach{
            tCompanyHistoryRepo.delete(it)
        }
    }

}