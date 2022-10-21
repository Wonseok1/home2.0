package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow

object TGridInfo : IdTable<String>(name = "t_grid_info"){
    val gridId          = varchar("grid_id", 100).uniqueIndex()
    override val id: Column<EntityID<String>> = TGridInfo.gridId.entityId()

    val gridNm          = varchar("grid_nm", 100).nullable()
    val pageId          = varchar("page_id", 100).nullable()
    val editType        = varchar("edit_type", 20)
    val rowSelection    = varchar("row_selection", 10)
    val useYn           = bool("use_yn").default(true)
    val ordNo           = integer("ord_no").default(0)

}

data class TGridInfoDto(
    val gridId          : String,
    val gridNm          : String?,
    val pageId          : String?,
    val rowSelection    : String,
    val editType        : String,
    val useYn           : Boolean,
    val ordNo           : Int,
){

}

fun TGridInfo.rowToDto(row: ResultRow): TGridInfoDto{
    return TGridInfoDto(
        gridId          = row[gridId],
        gridNm          = row[gridNm],
        pageId          = row[pageId],
        rowSelection    = row[rowSelection],
        editType        = row[editType],
        useYn           = row[useYn],
        ordNo           = row[ordNo],
    )
}