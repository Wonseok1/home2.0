package com.itzon.home.domain.table

import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TProjectManage : Table(name = "t_project_manage") {

    val projectHistoryPk = integer("project_history_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(projectHistoryPk, name = "projcet_history_pk")


    val projectCmnt                 = varchar("comment", 100)
    val custNm             = varchar("customer_nm", 100)
    val projectEnv      = varchar("project_environment", 100)
    val projectStartDt          = varchar("project_startDt",100)
    val projectEndDt            = varchar("project_endDt",100)
    val useYn                   = varchar("use_yn",1).default("Y")
    val ordNo                   = integer("ord_no").default(0)

}

data class TProjectManageDto(
    val projectHistoryPk : Int,
    val projectCmnt          : String,
    val custNm      : String,
    val projectEnv : String,
    val projectStartDt   : String,
    val projectEndDt     : String,
    val useYn            : String,
    val ordNo            : Int
){

}


fun TProjectManage.rowToDto(row: ResultRow) : TProjectManageDto {
    return TProjectManageDto(
        projectHistoryPk    = row[projectHistoryPk],
        projectCmnt             = row[projectCmnt],
        custNm         = row[custNm],
        projectEnv  = row[projectEnv],
        projectStartDt      = row[projectStartDt],
        projectEndDt        = row[projectEndDt],
        useYn               = row[useYn],
        ordNo               = row[ordNo],
    )
}

