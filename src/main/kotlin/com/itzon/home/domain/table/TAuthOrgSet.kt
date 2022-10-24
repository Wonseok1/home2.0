package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TAuthOrgSet : Table(name = "t_auth_org_set"){
    val authOrgPk = integer("auth_org_pk")
    override val primaryKey     = PrimaryKey(authOrgPk, name = "auth_org_pk")

    val authId = varchar("auth_id", 100)
    val orgId = varchar("org_id", 100)
}

data class TAuthOrgSetDto(
    val authOrgPk : Int,
    val authId : String,
    val orgId : String,
){
}

fun TAuthOrgSet.rowToDto(row: ResultRow): TAuthOrgSetDto {
    return TAuthOrgSetDto(
        authOrgPk =  row[authOrgPk],
        authId =  row[authId],
        orgId =  row[orgId],
    )

}

fun TAuthOrgSet.rowToString(row: ResultRow, column: Column<String>) : String{
    return row[column]
}