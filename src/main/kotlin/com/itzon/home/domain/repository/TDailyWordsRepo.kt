package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TDailyWords
import com.itzon.home.domain.table.TDailyWordsDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository


@Repository
class TDailyWordsRepo {

    fun selectAllOrderByOrdNo(userId: String): List<TDailyWordsDto> {
        return TDailyWords.select{
            TDailyWords.userId eq userId
        }.orderBy(TDailyWords.ordNo to SortOrder.ASC)
            .map{ it.toDto() }
    }

    fun isExist(tDailyWordsDto: TDailyWordsDto): Boolean {
        return !TDailyWords.select { TDailyWords.dailyWordsPk eq tDailyWordsDto.dailyWordsPk }.empty()
    }

    fun insert(tDailyWordsDto: TDailyWordsDto){
        TDailyWords.insert {
            it[dailyWordsPk] = tDailyWordsDto.dailyWordsPk
            it[dailyUseWordTitle] = tDailyWordsDto.dailyUseWordTitle
            it[dailyUseWordContent] = tDailyWordsDto.dailyUseWordContent
            it[userId] = tDailyWordsDto.userId
            it[useYn] = useYn
            it[ordNo] = tDailyWordsDto.ordNo
        }
    }

    fun update(tDailyWordsDto: TDailyWordsDto) {
        TDailyWords.update({ TDailyWords.dailyWordsPk eq tDailyWordsDto.dailyWordsPk}) {
            it[dailyWordsPk] = tDailyWordsDto.dailyWordsPk
            it[dailyUseWordTitle] = tDailyWordsDto.dailyUseWordTitle
            it[dailyUseWordContent] = tDailyWordsDto.dailyUseWordContent
            it[useYn] = tDailyWordsDto.useYn
            it[ordNo] = tDailyWordsDto.ordNo
        }
    }

    fun deleteDailyWords(tDailyWordsDto: TDailyWordsDto) {
        TDailyWords.deleteWhere{
            TDailyWords.dailyWordsPk eq tDailyWordsDto.dailyWordsPk
        }
    }


}

private fun ResultRow.toDto() = TDailyWords.rowToDto(this);
