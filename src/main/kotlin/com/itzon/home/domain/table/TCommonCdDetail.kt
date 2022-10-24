package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TCommonCdDetail : Table(name = "t_common_cd_detail"){
    val commonCdDetailPk = integer("common_cd_detail_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(commonCdDetailPk, name = "api_pk")

    val commonCd = varchar("common_cd", 100)
    val commonCdDetail = varchar("common_cd_detail", 100)
    val commonCdDetailNm = varchar("common_cd_detail_nm", 100)
    val commonCdDetailComment = varchar("common_cd_detail_comment", 100)
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}

data class TCommonCdDetailDto(
    val commonCdDetailPk                :  Int,
    val commonCd                        :  String,
    val commonCdDetail                  :  String,
    val commonCdDetailNm                :  String,
    val commonCdDetailComment           :  String,
    val useYn                           :  Boolean,
    val ordNo                           :  Int,
)

fun TCommonCdDetail.rowToDto(row: ResultRow):TCommonCdDetailDto{
    return TCommonCdDetailDto(
        commonCdDetailPk            = row[commonCdDetailPk],
        commonCd                    = row[commonCd],
        commonCdDetail              = row[commonCdDetail],
        commonCdDetailNm            = row[commonCdDetailNm],
        commonCdDetailComment       = row[commonCdDetailComment],
        useYn                       = row[useYn],
        ordNo                       = row[ordNo]
    )
}