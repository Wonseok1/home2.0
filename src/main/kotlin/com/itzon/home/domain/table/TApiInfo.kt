package com.itzon.home.domain.table

import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TApiInfo : Table(name = "t_api_info") {
    val apiPk                   = integer("api_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(apiPk, name = "api_pk")

    val apiUri                  = varchar("api_uri", 100)
    val apiNm                   = varchar("api_nm", 100)
    val apiMethod               = varchar("api_method", 10)
    val apiEventObject          = varchar("api_event_object", 100)
    val apiRefreshNeedYn        = bool("api_refresh_need_yn")
    val apiRefreshFunction      = varchar("api_refresh_function", 100).nullable()

}

data class TApiInfoDto(
    val apiPk                           : Int,
    val apiUri                          : String,
    val apiNm                           : String,
    val apiMethod                           : String,
    val apiEventObject                  : String,
    val apiRefreshNeedYn                : Boolean,
    val apiRefreshFunction              : String?,
){}

fun TApiInfo.rowToDto(row: ResultRow):TApiInfoDto {
    return TApiInfoDto(
        apiPk = row[apiPk],
        apiUri = row[apiUri],
        apiNm = row[apiNm],
        apiMethod = row[apiMethod],
        apiEventObject = row[apiEventObject],
        apiRefreshNeedYn = row[apiRefreshNeedYn],
        apiRefreshFunction = row[apiRefreshFunction],
    )
}