package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow

object TCommonCdInfo: IdTable<String>(name = "t_common_cd") {
    val commonCd = varchar("common_cd", 100).uniqueIndex()
    override val id: Column<EntityID<String>> = commonCd.entityId()
    val commonCdNm = varchar("common_cd_nm", 100)
    val commonCdComment = varchar("common_cd_comment", 100)
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}

data class TCommonCdInfoDto(
    val commonCd                    :  String,
    val commonCdNm                  :  String,
    val commonCdComment             :  String,
    val useYn                       :  Boolean,
    val ordNo                       :  Int,
)

fun TCommonCdInfo.rowToDto(row: ResultRow):TCommonCdInfoDto{
    return TCommonCdInfoDto(
        commonCd                    = row[commonCd],
        commonCdNm                  = row[commonCdNm],
        commonCdComment             = row[commonCdComment],
        useYn                       = row[useYn],
        ordNo                       = row[ordNo]
    )
}
