package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TAuthOrgSet
import com.itzon.home.domain.table.TBookInfo
import com.itzon.home.domain.table.TBookInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.springframework.stereotype.Repository


@Repository
class TBookInfoRepo {
    fun selectByUseYn(useYn : Boolean)  : List<TBookInfoDto>{
        return TBookInfo.select {
            TBookInfo.useYn eq useYn
        }.orderBy(TBookInfo.ordNo to SortOrder.ASC).map { it.toDto() }
    }

    fun selectById(bookPk : Int) :TBookInfoDto{
        return TBookInfo.select {
            TBookInfo.bookPk eq bookPk
        }.limit(1).single().let {
            it.toDto()
        }
    }
}
private fun ResultRow.toDto() = TBookInfo.rowToDto(this)