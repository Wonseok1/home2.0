package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository


@Repository
class TCompanyHistoryRepo {

    fun selectAll(useYn : Boolean)  : List<TCompanyHistoryDto>{
        return TCompanyHistory.select {TCompanyHistory.useYn eq useYn}
                .orderBy(TCompanyHistory.historyDttm to SortOrder.ASC)
                .orderBy(TCompanyHistory.ordNo to SortOrder.ASC)
                .map { it.toDto() }
    }

    fun isExist(tCompanyHistoryDto: TCompanyHistoryDto): Boolean {
        return !TCompanyHistory.select { TCompanyHistory.companyHistoryPk eq tCompanyHistoryDto.companyHistoryPk }.empty()
    }

    fun insert(tCompanyHistoryDto: TCompanyHistoryDto) {
        TCompanyHistory.insert {
            it[companyHistoryPk] = tCompanyHistoryDto.companyHistoryPk
            it[comment] = tCompanyHistoryDto.comment
            it[historyDttm] = tCompanyHistoryDto.historyDttm
            it[useYn] = tCompanyHistoryDto.useYn
            it[ordNo] = tCompanyHistoryDto.ordNo
        }
    }

    fun update(tCompanyHistoryDto: TCompanyHistoryDto) {
        TCompanyHistory.update({TCompanyHistory.companyHistoryPk eq tCompanyHistoryDto.companyHistoryPk}) {
            it[comment] = tCompanyHistoryDto.comment
            it[historyDttm] = tCompanyHistoryDto.historyDttm
            it[useYn] = tCompanyHistoryDto.useYn
            it[ordNo] = tCompanyHistoryDto.ordNo
        }
    }

    fun delete(tCompanyHistoryDto: TCompanyHistoryDto) {
        TCompanyHistory.deleteWhere { TCompanyHistory.companyHistoryPk eq tCompanyHistoryDto.companyHistoryPk }
    }

}
private fun ResultRow.toDto() = TCompanyHistory.rowToDto(this)