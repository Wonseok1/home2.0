package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TGridColumnDetail : Table(name = "t_grid_column_detail"){
    val gridColumnPk =  integer("grid_column_pk").autoIncrement()
    override val primaryKey = PrimaryKey(gridColumnPk, name= "grid_column_pk")

    val gridId              = varchar("grid_id", 100)
    val gridColumn          = varchar("grid_column", 100)
    val gridColumnNm        = varchar("grid_column_nm", 100)
    val gridHeader          = varchar("grid_header", 100).nullable()
    val type                = varchar("type", 100).nullable()

    val filter              = varchar("filter", 100).nullable()
    val filterParams        = varchar("filter_params", 100).nullable()
    val cellEditor          = varchar("cell_editor", 100).nullable()
    val cellEditorParams    = varchar("cell_editor_params", 100).nullable()
    val headerTooltip       = varchar("header_tooltip", 100).nullable()

    val width               = integer("width")
    val maxWidth            = integer("max_width")
    val minWidth            = integer("min_width")
    val pinned              = varchar("pinned", 100).nullable()
    val editYn              = bool("edit_yn").default(true)

    val hideYn              = bool("hide_yn").default(false)
    val flexYn              = bool("flex_yn").default(true)
    val sortYn              = bool("sort_yn").default(true)
    val filterYn            = bool("filter_yn").default(true)
    val floatingFilterYn    = bool("floating_filter_yn").default(true)
    val checkBoxSelectionYn    = bool("checkbox_selection_yn").default(false)

    val resizeYn            = bool("resize_yn").default(true)
    val useYn               = bool("use_yn").default(true)
    val ordNo               = integer("ord_no").default(0)
}

data class TGridColumnDetailDto(
    val gridColumnPk        : Int,
    val gridId              : String,
    val gridColumn          : String,
    val gridColumnNm        : String,
    val gridHeader          : String?,
    val type                : String?,
    val filter              : String?,
    val filterParams        : String?,
    val cellEditor          : String?,
    val cellEditorParams    : String?,
    val headerTooltip       : String?,
    val width               : Int       = 200,
    val maxWidth            : Int       = 1500,
    val minWidth            : Int       = 100,
    val pinned              : String?,
    val editYn              : Boolean   = true,
    val hideYn              : Boolean   = false,
    val resizeYn            : Boolean   = false,
    val flexYn              : Boolean   = false,
    val sortYn              : Boolean   = false,
    val filterYn            : Boolean   = false,
    val floatingFilterYn    : Boolean   = false,
    val checkBoxSelectionYn : Boolean   = false,
    val useYn               : Boolean   = true,
    val ordNo               : Int       = 0,
){

}

fun TGridColumnDetail.rowToDto( row: ResultRow): TGridColumnDetailDto{
    return TGridColumnDetailDto(
        gridColumnPk        = row[gridColumnPk],
        gridColumn          = row[gridColumn],
        gridColumnNm        = row[gridColumnNm],
        gridId              = row[gridId],
        gridHeader          = row[gridHeader],
        type                = row[type],
        filter              = row[filter],
        filterParams        = row[filterParams],
        cellEditor          = row[cellEditor],
        cellEditorParams    = row[cellEditorParams],
        headerTooltip       = row[headerTooltip],
        width               = row[width],
        maxWidth            = row[maxWidth],
        minWidth            = row[minWidth],
        pinned              = row[pinned],
        editYn              = row[editYn],
        hideYn              = row[hideYn],
        resizeYn            = row[resizeYn],
        flexYn              = row[flexYn],
        sortYn              = row[sortYn],
        filterYn            = row[filterYn],
        floatingFilterYn    = row[floatingFilterYn],
        checkBoxSelectionYn = row[checkBoxSelectionYn],
        useYn               = row[useYn],
        ordNo               = row[ordNo],
    )
}