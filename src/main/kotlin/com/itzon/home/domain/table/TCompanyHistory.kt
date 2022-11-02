package com.itzon.home.domain.table

import com.itzon.home.domain.table.TAuthGridSet.autoIncrement
import com.itzon.home.domain.table.TMenuInfo.default
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime

object TCompanyHistory  : Table(name = "t_company_history") {

    val companyHistoryPk        = integer("company_history_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(companyHistoryPk, name = "company_history_pk")

    val comment                 = varchar("comment", 100)
    val historyDttm             = datetime("history_dttm")
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}

data class TCompanyHistoryDto(
        val companyHistoryPk : Int,
        val comment : String,
        val historyDttm : LocalDateTime,
        val useYn : Boolean,
        val ordNo : Int,
){

}

fun TCompanyHistory.rowToDto(row: ResultRow): TCompanyHistoryDto {
    return TCompanyHistoryDto(
            companyHistoryPk = row[companyHistoryPk      ],
            comment          = row[comment               ],
            historyDttm      = row[historyDttm           ],
            useYn            = row[useYn                 ],
            ordNo            = row[ordNo                 ],
    )

}