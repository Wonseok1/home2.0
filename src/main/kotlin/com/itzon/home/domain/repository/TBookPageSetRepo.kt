package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TBookPageSet
import com.itzon.home.domain.table.TBookPageSetDto
import com.itzon.home.domain.table.rowToDto
import com.itzon.home.web.book.dto.BookPageSetSaveRequestDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
class TBookPageSetRepo {
    fun selectUserPageSet(userId: String, bookPk: Int) : List<TBookPageSetDto>{
        return TBookPageSet.select {
            TBookPageSet.userId eq userId
        }.andWhere {
            TBookPageSet.bookPk eq bookPk
        }.map { it.toDto() }
    }
    fun insert(bookPageSetSaveRequestDto: BookPageSetSaveRequestDto) {
        TBookPageSet.insert {
            it[bookPk] = bookPageSetSaveRequestDto.bookPk
            it[pageNum] = bookPageSetSaveRequestDto.pageNum
            it[userId] = bookPageSetSaveRequestDto.userId
            it[lastDttm] = LocalDateTime.now()
        }
    }
    fun update(bookPageSetSaveRequestDto: BookPageSetSaveRequestDto) {
        TBookPageSet.update(
            {TBookPageSet.bookPk eq bookPageSetSaveRequestDto.bookPk
                TBookPageSet.userId eq bookPageSetSaveRequestDto.userId}
        ){
            it[pageNum] = bookPageSetSaveRequestDto.pageNum
            it[lastDttm] = LocalDateTime.now()
        }

    }
    fun isExist(bookPageSetSaveRequestDto: BookPageSetSaveRequestDto) :Boolean{
        return !TBookPageSet.select{
            TBookPageSet.bookPk eq bookPageSetSaveRequestDto.bookPk
        }.andWhere { TBookPageSet.userId eq bookPageSetSaveRequestDto.userId }.empty()
    }
}
private fun ResultRow.toDto() = TBookPageSet.rowToDto(this)