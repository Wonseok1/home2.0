package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TAuthInfo
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository


@Repository
class TAuthInfoRepo {
    fun selectAll() :List<TAuthInfoDto>{
        return TAuthInfo.selectAll().map { it.toDto() }
    }

    fun findAllByUseYnOrderByOrdNo() : List<TAuthInfoDto> {
        return TAuthInfo.select {
            TAuthInfo.useYn eq true }
            .orderBy(TAuthInfo.ordNo to SortOrder.ASC)
            .map { it.toDto() }
    }


    fun insert(tAuthInfoDto: TAuthInfoDto) {
        TAuthInfo.insert {
            it[authId]                    = tAuthInfoDto.authId
            it[authNm]                    = tAuthInfoDto.authNm
            it[ordNo]                    = tAuthInfoDto.ordNo
            it[useYn]                    = tAuthInfoDto.useYn
        }
    }
    fun update(tAuthInfoDto: TAuthInfoDto) {
        TAuthInfo.update({ TAuthInfo.authId eq tAuthInfoDto.authId }) {
            it[authId]                    = tAuthInfoDto.authId
            it[authNm]                    = tAuthInfoDto.authNm
            it[ordNo]                    = tAuthInfoDto.ordNo
            it[useYn]                    = tAuthInfoDto.useYn
        }
    }
    fun delete(tAuthInfoDto: TAuthInfoDto) {
        TAuthInfo.deleteWhere {
            TAuthInfo.authId eq tAuthInfoDto.authId
        }
    }
    fun isExist(tAuthInfoDto: TAuthInfoDto) : Boolean{
        return !TAuthInfo.select{ TAuthInfo.authId eq tAuthInfoDto.authId}.empty()
    }
}

private fun ResultRow.toDto() = TAuthInfo.rowToDto(this)