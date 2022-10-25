package com.itzon.home.domain.table

import com.itzon.home.domain.table.TCompanyHistory.autoIncrement
import com.itzon.home.domain.table.TCompanyHistory.default
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object TProjcetHistory: Table(name = "t_projcet_history") {

    val projectHistoryPk        = integer("project_history_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(projectHistoryPk, name = "projcet_history_pk")

    val comment                 = varchar("comment", 100)
    val customer_nm             = varchar("customer_nm", 100)
    val projectEnvironment      = varchar("project_environment", 100)
    val projectStartDttm        = datetime("project_start_dttm")
    val projectEndDttm          = datetime("project_end_dttm")
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}