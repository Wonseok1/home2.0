package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import com.itzon.home.web.system.auth.grid.dto.SelectGridAuthDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TAuthGridSetRepo {
    fun selectAll() :List<TAuthGridSetDto>{
        return TAuthGridSet.selectAll()
            .orderBy(TGridInfo.ordNo to SortOrder.ASC)
            .map { it.toDto() }
    }

    fun findAllByAuthId(authId: String) : List<SelectGridAuthDto> {
        return TAuthGridSet.join(TGridInfo, JoinType.RIGHT,
            additionalConstraint = { (TAuthGridSet.gridId eq TGridInfo.gridId) and (TAuthGridSet.authId eq authId) } )
            .slice(TAuthGridSet.authGridPk,
                TAuthGridSet.authId,
                TGridInfo.gridId,
                TGridInfo.gridNm,
                TAuthGridSet.accessAuthYn,
                TAuthGridSet.writeAuthYn)
            .selectAll()
            .orderBy(TGridInfo.ordNo to SortOrder.ASC)
            .orderBy((TGridInfo.gridId))
            .map { it.toDtoSelect() }

    }

    fun insert(tAuthGridSetDto: TAuthGridSetDto) {
        TAuthGridSet.insert {
            it[authId]                    = tAuthGridSetDto.authId
            it[gridId]                    = tAuthGridSetDto.gridId
            it[accessAuthYn]              = tAuthGridSetDto.accessAuthYn
            it[writeAuthYn]               = tAuthGridSetDto.writeAuthYn
        }
    }
    fun update(tAuthGridSetDto: TAuthGridSetDto) {
        TAuthGridSet.update({ TAuthGridSet.authGridPk eq tAuthGridSetDto.authGridPk }) {
            it[authId]                    = tAuthGridSetDto.authId
            it[gridId]                    = tAuthGridSetDto.gridId
            it[accessAuthYn]              = tAuthGridSetDto.accessAuthYn
            it[writeAuthYn]               = tAuthGridSetDto.writeAuthYn
        }
    }
    fun delete(tAuthGridSetDto: TAuthGridSetDto) {
        TAuthGridSet.deleteWhere {
            TAuthGridSet.authGridPk eq tAuthGridSetDto.authGridPk
        }
    }
    fun isExist(tAuthGridSetDto: TAuthGridSetDto) : Boolean{
        return !TAuthGridSet.select{ TAuthGridSet.authGridPk eq tAuthGridSetDto.authGridPk}.empty()
    }
}

private fun ResultRow.toDto() = TAuthGridSet.rowToDto(this)
private fun ResultRow.toDtoSelect() = TAuthGridSet.rowToDtoSelect(this)