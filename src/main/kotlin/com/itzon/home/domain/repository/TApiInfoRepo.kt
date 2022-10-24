package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TApiInfo
import com.itzon.home.domain.table.TApiInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TApiInfoRepo {
    fun selectAll(): List<TApiInfoDto> {
        return TApiInfo.selectAll().map {
            it.toDto()
        }
    }

    fun insert(tApiInfoDto: TApiInfoDto){
        TApiInfo.insert {
            it[apiPk] = tApiInfoDto.apiPk
            it[apiUri] = tApiInfoDto.apiUri
            it[apiNm] = tApiInfoDto.apiNm
            it[apiEventObject] = tApiInfoDto.apiEventObject
            it[apiRefreshNeedYn] = tApiInfoDto.apiRefreshNeedYn
            it[apiRefreshFunction] = tApiInfoDto.apiRefreshFunction
        }
    }
    fun update(tApiInfoDto: TApiInfoDto) {
        TApiInfo.update({ TApiInfo.apiPk eq TApiInfo.apiPk }) {
            it[apiUri] = tApiInfoDto.apiUri
            it[apiNm] = tApiInfoDto.apiNm
            it[apiEventObject] = tApiInfoDto.apiEventObject
            it[apiRefreshNeedYn] = tApiInfoDto.apiRefreshNeedYn
            it[apiRefreshFunction] = tApiInfoDto.apiRefreshFunction
        }
    }
    fun isExist(tApiInfoDto: TApiInfoDto): Boolean {
        return !TApiInfo.select { TApiInfo.apiPk eq tApiInfoDto.apiPk }.empty()
    }

    fun delete(tApiInfoDto: TApiInfoDto) {
        TApiInfo.deleteWhere { TApiInfo.apiPk eq tApiInfoDto.apiPk }
    }

}

private fun ResultRow.toDto() = TApiInfo.rowToDto(this)