package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow

object TOrgInfo : IdTable<String>(name = "t_org_info") {
    val orgId = varchar("org_id", 100).uniqueIndex()
    override val id: Column<EntityID<String>> = TOrgInfo.orgId.entityId()
    val orgNm                   = varchar("org_nm", 100).nullable()
    val orgLv                   = integer("org_lv").default(0)
    val orgParentId             = varchar("org_parent_id", 20).nullable()
    val orgParentUrl            = varchar("org_parent_url", 100).nullable()
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)
}

data class TOrgInfoDto(
    var orgId               : String
    , var orgNm             : String?
    , var orgLv             : Int
    , var orgParentId       : String?
    , var orgParentUrl      : String?
    , var useYn             : Boolean
    , var ordNo             : Int
)

fun TOrgInfo.rowToDto(row: ResultRow):TOrgInfoDto{
    return TOrgInfoDto(
        orgId               = row[orgId],
        orgNm               = row[orgNm],
        orgLv               = row[orgLv],
        orgParentId         = row[orgParentId],
        orgParentUrl        = row[orgParentUrl],
        useYn               = row[useYn],
        ordNo               = row[ordNo]
    )
}