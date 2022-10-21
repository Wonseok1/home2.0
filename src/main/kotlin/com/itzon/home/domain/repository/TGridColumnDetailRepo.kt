package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TGridColumnDetail
import com.itzon.home.domain.table.TGridColumnDetailDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository


@Repository
class TGridColumnDetailRepo {
    fun selectAllByGridId(): List<TGridColumnDetailDto> {
        return TGridColumnDetail.selectAll().map{
            it.toDto()
        }
    }
    fun selectGridColumnByGridId(gridId : String) : List<TGridColumnDetailDto>  {
        return TGridColumnDetail.select{
            TGridColumnDetail.gridId eq gridId
        }.orderBy(TGridColumnDetail.ordNo to SortOrder.ASC)
            .map{
                it.toDto()
            }
    }

    fun insert(tGridColumnDetailDto: TGridColumnDetailDto) {
        TGridColumnDetail.insert {
            it[gridId]                  = tGridColumnDetailDto.gridId
            it[gridColumn]              = tGridColumnDetailDto.gridColumn
            it[gridColumnNm]            = tGridColumnDetailDto.gridColumnNm
            it[gridHeader]              = tGridColumnDetailDto.gridHeader
            it[type]                    = tGridColumnDetailDto.type

            it[filter]                  = tGridColumnDetailDto.filter
            it[filterParams]            = tGridColumnDetailDto.filterParams
            it[cellEditor]              = tGridColumnDetailDto.cellEditor
            it[cellEditorParams]        = tGridColumnDetailDto.cellEditorParams
            it[headerTooltip]           = tGridColumnDetailDto.headerTooltip

            it[width]                   = tGridColumnDetailDto.width
            it[maxWidth]                = tGridColumnDetailDto.maxWidth
            it[minWidth]                = tGridColumnDetailDto.minWidth
            it[pinned]                  = tGridColumnDetailDto.pinned
            it[editYn]                  = tGridColumnDetailDto.editYn

            it[hideYn]                  = tGridColumnDetailDto.hideYn
            it[flexYn]                  = tGridColumnDetailDto.flexYn
            it[sortYn]                  = tGridColumnDetailDto.sortYn
            it[filterYn]                = tGridColumnDetailDto.filterYn
            it[floatingFilterYn]        = tGridColumnDetailDto.floatingFilterYn
            it[checkBoxSelectionYn]     = tGridColumnDetailDto.checkBoxSelectionYn

            it[resizeYn]                = tGridColumnDetailDto.resizeYn
            it[useYn]                   = tGridColumnDetailDto.useYn
            it[ordNo]                   = tGridColumnDetailDto.ordNo
        }
    }
    fun update(tGridColumnDetailDto: TGridColumnDetailDto) {
        TGridColumnDetail.update({TGridColumnDetail.gridColumnPk eq tGridColumnDetailDto.gridColumnPk}) {
            it[gridId]                  = tGridColumnDetailDto.gridId
            it[gridColumn]              = tGridColumnDetailDto.gridColumn
            it[gridColumnNm]            = tGridColumnDetailDto.gridColumnNm
            it[gridHeader]              = tGridColumnDetailDto.gridHeader
            it[type]                    = tGridColumnDetailDto.type

            it[filter]                  = tGridColumnDetailDto.filter
            it[filterParams]            = tGridColumnDetailDto.filterParams
            it[cellEditor]              = tGridColumnDetailDto.cellEditor
            it[cellEditorParams]        = tGridColumnDetailDto.cellEditorParams
            it[headerTooltip]           = tGridColumnDetailDto.headerTooltip

            it[width]                   = tGridColumnDetailDto.width
            it[maxWidth]                = tGridColumnDetailDto.maxWidth
            it[minWidth]                = tGridColumnDetailDto.minWidth
            it[pinned]                  = tGridColumnDetailDto.pinned
            it[editYn]                  = tGridColumnDetailDto.editYn

            it[hideYn]                  = tGridColumnDetailDto.hideYn
            it[flexYn]                  = tGridColumnDetailDto.flexYn
            it[sortYn]                  = tGridColumnDetailDto.sortYn
            it[filterYn]                = tGridColumnDetailDto.filterYn
            it[floatingFilterYn]        = tGridColumnDetailDto.floatingFilterYn
            it[checkBoxSelectionYn]     = tGridColumnDetailDto.checkBoxSelectionYn

            it[resizeYn]                = tGridColumnDetailDto.resizeYn
            it[useYn]                   = tGridColumnDetailDto.useYn
            it[ordNo]                   = tGridColumnDetailDto.ordNo
        }
    }
    fun isExist(tGridColumnDetailDto: TGridColumnDetailDto) : Boolean{
        return !TGridColumnDetail.select { TGridColumnDetail.gridColumnPk eq tGridColumnDetailDto.gridColumnPk }.empty()
    }
    fun delete(tGridColumnDetailDto: TGridColumnDetailDto) {
        TGridColumnDetail.deleteWhere {
            TGridColumnDetail.gridColumnPk eq tGridColumnDetailDto.gridColumnPk
        }
    }
}
private fun ResultRow.toDto() = TGridColumnDetail.rowToDto(this)