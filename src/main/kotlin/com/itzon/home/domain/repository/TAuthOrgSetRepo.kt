package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TAuthOrgSet
import com.itzon.home.domain.table.TAuthOrgSetDto
import com.itzon.home.domain.table.rowToDto
import com.itzon.home.domain.table.rowToString
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TAuthOrgSetRepo {
    fun selectAll() :List<TAuthOrgSetDto>{
        return TAuthOrgSet.selectAll().map { it.toDto() }
    }

    fun findAllByAuthId(authId: String) : List<TAuthOrgSetDto> {
        return TAuthOrgSet.select() {TAuthOrgSet.authId eq authId}.map { it.toDto() }
    }


    fun findOrgSetByAuthId(authId: String) : List<String> {
        return TAuthOrgSet.slice(TAuthOrgSet.orgId).select() {TAuthOrgSet.authId eq authId}.map { it.rowToString(TAuthOrgSet.orgId) }
    }
    fun insert(tAuthOrgSetDto: TAuthOrgSetDto) {
        TAuthOrgSet.insert {
            it[authId]                   = tAuthOrgSetDto.authId
            it[orgId]                   = tAuthOrgSetDto.orgId
        }
    }
    fun update(tAuthOrgSetDto: TAuthOrgSetDto) {
        TAuthOrgSet.update({ TAuthOrgSet.authOrgPk eq tAuthOrgSetDto.authOrgPk }) {
            it[authId]                   = tAuthOrgSetDto.authId
            it[orgId]                   = tAuthOrgSetDto.orgId
        }
    }

    fun getPk(tAuthOrgSetDto: TAuthOrgSetDto) : TAuthOrgSetDto {
        return TAuthOrgSet.select { TAuthOrgSet.orgId eq tAuthOrgSetDto.orgId }
            .andWhere { TAuthOrgSet.authId eq tAuthOrgSetDto.authId }.limit(1).single().let {it.toDto()}
    }

    fun isExist(tAuthOrgSetDto: TAuthOrgSetDto) : Boolean{
        return !TAuthOrgSet.select{ TAuthOrgSet.orgId eq tAuthOrgSetDto.orgId }
            .andWhere { TAuthOrgSet.authId eq tAuthOrgSetDto.authId }.empty()
    }

    fun delete (tAuthOrgSetDto: TAuthOrgSetDto){
        TAuthOrgSet.deleteWhere { (TAuthOrgSet.authOrgPk eq tAuthOrgSetDto.authOrgPk ) }
    }

    fun deleteAllOrgId (tAuthOrgSetDto: TAuthOrgSetDto) {
        TAuthOrgSet.deleteWhere { TAuthOrgSet.authId eq tAuthOrgSetDto.authId }
    }

    fun deleteAllAndOne (tAuthOrgSetDto: TAuthOrgSetDto) {
        TAuthOrgSet.deleteWhere { (TAuthOrgSet.authId eq tAuthOrgSetDto.authId) and ((TAuthOrgSet.orgId eq "0") or (TAuthOrgSet.orgId eq "1") ) }
    }


}

private fun ResultRow.toDto() = TAuthOrgSet.rowToDto(this)
private fun ResultRow.rowToString(column: Column<String>) = TAuthOrgSet.rowToString(this, column)