package com.itzon.home.domain.table

import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table


object TMyPageSet : Table(name = "t_my_page_set") {
    val myPagePk = integer("my_page_pk").autoIncrement()
    override val primaryKey = PrimaryKey(myPagePk, name= "t_my_page_set")
    val userId = varchar("user_id", 100)
    val menuId = varchar("menu_id", 100)
    val ordNo = integer("ord_no")
}

data class TMyPageSetDto(
    val myPagePk : Int,
    val userId : String,
    val menuId: String,
    val ordNo: Int,
)

fun TMyPageSet.rowToDto(row: ResultRow):TMyPageSetDto {
    return TMyPageSetDto(
        myPagePk = row[myPagePk],
        userId = row[userId],
        menuId = row[menuId],
        ordNo  = row[ordNo],
    )
}


