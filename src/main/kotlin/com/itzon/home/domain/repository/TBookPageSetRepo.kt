package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TBookInfo
import com.itzon.home.domain.table.TBookPageSet
import com.itzon.home.domain.table.TBookPageSetDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.select
import org.springframework.stereotype.Repository

@Repository
class TBookPageSetRepo {
    fun selectUserPageSet(userId: String, bookPk: Int) : List<TBookPageSetDto>{
        return TBookPageSet.select {
            TBookPageSet.userId eq userId
        }.andWhere {
            TBookPageSet.bookPk eq bookPk
        }.map { it.toDto() }
    }
}
private fun ResultRow.toDto() = TBookPageSet.rowToDto(this)