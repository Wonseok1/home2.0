package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TDailyWords : Table(name = "t_daily_words"){
    val dailyWordsPk = integer("daily_words_pk")
    override val primaryKey     = PrimaryKey(dailyWordsPk, name = "daily_words_pk")
    val userId                  = varchar("user_id", 100)
    val dailyUseWordTitle       = varchar("daily_word_title", 100)
    val dailyUseWordContent     = varchar("daily_word_content", 100)
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}

data class TDailyWordsDto(
    val dailyWordsPk                : Int,
    val userId                      : String,
    val dailyUseWordTitle           : String,
    val dailyUseWordContent         : String,
    val useYn                       : Boolean,
    val ordNo                       : Int,
)

data class TDailyWordSaveRequestDto(
    val dailyWordsPk                : Int,
    val dailyUseWordTitle           : String,
    val dailyUseWordContent         : String,
    val useYn                       : Boolean,
    val ordNo                       : Int,
)

fun TDailyWords.rowToDto(row: ResultRow):TDailyWordsDto {
    return TDailyWordsDto(
        dailyWordsPk = row[dailyWordsPk],
        userId = row[userId],
        dailyUseWordTitle = row[dailyUseWordTitle],
        dailyUseWordContent  = row[dailyUseWordContent],
        useYn  = row[useYn],
        ordNo  = row[ordNo],
    )
}