package com.itzon.home.domain.table

import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TMyMenuSet : Table(name = "t_my_menu_set"){
    val myMenuPk  = integer("my_menu_pk").autoIncrement()
    override val primaryKey = PrimaryKey(myMenuPk, name= "my_menu_pk")
    val userId = varchar("user_id", 100)
    val menuId = varchar("menu_id", 100)
}
data class TMyMenuSetDto(
    val myMenuPk: Int,
    val userId: String,
    val menuId: String,
){

}

fun TMyMenuSet.rowToDto(row: ResultRow):TMyMenuSetDto {
    return TMyMenuSetDto(
        myMenuPk = row[myMenuPk],
        userId = row[userId],
        menuId = row[menuId],
    )
}