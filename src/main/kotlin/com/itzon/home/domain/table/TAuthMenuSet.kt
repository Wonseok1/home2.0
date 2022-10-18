package com.itzon.home.domain.table

import javassist.CtMethod.ConstParameter.integer
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TAuthMenuSet : Table(name = "t_auth_menu_set"){
    val authMenuPk = integer("auth_menu_pk").autoIncrement()
    override val primaryKey = PrimaryKey(authMenuPk, name= "t_my_page_set")
    val authId = varchar("auth_id", 100)
    val menuId = varchar("menu_id", 100)
}

data class TAuthMenuSetDto(
    val authMenuPk : Int,
    val authId : String,
    val menuId : String,
){
}

fun TAuthMenuSet.rowToDto(row: ResultRow): TAuthMenuSetDto {
    return TAuthMenuSetDto(
        authMenuPk =  row[authMenuPk],
        authId =  row[authId],
        menuId =  row[menuId],
    )

}