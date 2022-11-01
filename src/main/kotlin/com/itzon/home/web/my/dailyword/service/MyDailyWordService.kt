package com.itzon.home.web.my.dailyword.service

import com.itzon.home.domain.repository.TDailyWordsRepo
import com.itzon.home.domain.table.TDailyWordsDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class MyDailyWordService (
    private val tDailyWordsRepo: TDailyWordsRepo,
){

    fun selectAllOrderByOrdNo(userId: String): List<TDailyWordsDto> {
        return tDailyWordsRepo.selectAllOrderByOrdNo(userId)
    }

    fun saveDailyWords(tDailyWordsDto: TDailyWordsDto) {
        if(tDailyWordsRepo.isExist(tDailyWordsDto)){
            tDailyWordsRepo.update(tDailyWordsDto)
        }else{
            tDailyWordsRepo.insert(tDailyWordsDto)
        }
    }

    fun deleteDailyWords(tDailyWordsDto: TDailyWordsDto) {
        tDailyWordsRepo.deleteDailyWords(tDailyWordsDto)
    }

}