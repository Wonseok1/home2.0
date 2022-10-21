package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TGridInfo
import com.itzon.home.domain.table.TGridInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TGridInfoRepo {
    fun selectAll(): List<TGridInfoDto> {
        return TGridInfo.selectAll().map {
            it.toDto()
        }
    }

    fun selectAllOrderByOrdNo(): List<TGridInfoDto> {
        return TGridInfo.selectAll()
            .orderBy(TGridInfo.ordNo to SortOrder.ASC)
            .map {
                it.toDto()
            }
    }
    fun insert(tGridInfoDto: TGridInfoDto){
        TGridInfo.insert {
            it[gridId] = tGridInfoDto.gridId
            it[gridNm] = tGridInfoDto.gridNm
            it[pageId] = tGridInfoDto.pageId
            it[editType] = tGridInfoDto.editType
            it[rowSelection] = tGridInfoDto.rowSelection
            it[useYn] = tGridInfoDto.useYn
            it[ordNo] = tGridInfoDto.ordNo
        }
    }
    fun update(tGridInfoDto: TGridInfoDto) {
        TGridInfo.update({TGridInfo.gridId eq tGridInfoDto.gridId}) {
            it[gridNm] = tGridInfoDto.gridNm
            it[pageId] = tGridInfoDto.pageId
            it[editType] = tGridInfoDto.editType
            it[rowSelection] = tGridInfoDto.rowSelection
            it[useYn] = tGridInfoDto.useYn
            it[ordNo] = tGridInfoDto.ordNo
        }
    }
    fun isExist(tGridInfoDto: TGridInfoDto): Boolean {
        return !TGridInfo.select { TGridInfo.gridId eq tGridInfoDto.gridId }.empty()
    }

    fun delete(tGridInfoDto: TGridInfoDto) {
        TGridInfo.deleteWhere { TGridInfo.gridId eq tGridInfoDto.gridId }
    }

}

private fun ResultRow.toDto() = TGridInfo.rowToDto(this)