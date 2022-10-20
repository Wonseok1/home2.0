package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow

object TAuthInfo : IdTable<String>(name = "t_auth_info") {
    val authId = varchar("auth_id", 100)
    override val id: Column<EntityID<String>> = TAuthInfo.authId.entityId()

    val authNm      = varchar("auth_nm", 100)
    val useYn       = bool("use_yn").default(true)
    val ordNo       = integer("ord_no").default(0)
}

data class TAuthInfoDto(

    val authId      : String,
    val authNm      : String,
    val useYn       : Boolean,
    val ordNo       : Int,
){

}

fun TAuthInfo.rowToDto(row: ResultRow) : TAuthInfoDto {
    return TAuthInfoDto(
        authId      = row[authId],
        authNm      = row[authNm],
        useYn       = row[useYn],
        ordNo       = row[ordNo],
    )
}