package com.itzon.home.domain.table

import com.itzon.home.domain.table.TAuthGridSet.autoIncrement
import com.itzon.home.domain.table.TMenuInfo.default
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object TCompanyHistory  : Table(name = "t_company_history") {

    val companyHistoryPk        = integer("company_history_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(companyHistoryPk, name = "company_history_pk")

    val comment                 = varchar("comment", 100)
    val historyDttm             = datetime("history_dttm")
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}