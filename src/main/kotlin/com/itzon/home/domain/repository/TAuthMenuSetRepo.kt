package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TAuthMenuSet
import com.itzon.home.domain.table.TAuthMenuSetDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository


@Repository
class TAuthMenuSetRepo {
    fun selectAll() :List<TAuthMenuSetDto>{
        return TAuthMenuSet.selectAll().map { it.toDto() }
    }

    fun findAllByAuthId(authId: String) : List<TAuthMenuSetDto> {
        return TAuthMenuSet.select() {TAuthMenuSet.authId eq authId}.map { it.toDto() }
    }


    fun insert(tAuthMenuSetDto: TAuthMenuSetDto) {
        TAuthMenuSet.insert {
            it[authId]                   = tAuthMenuSetDto.authId
            it[menuId]                   = tAuthMenuSetDto.menuId
        }
    }
    fun update(tAuthMenuSetDto: TAuthMenuSetDto) {
        TAuthMenuSet.update({ TAuthMenuSet.authMenuPk eq TAuthMenuSet.authMenuPk }) {
            it[authId]                   = tAuthMenuSetDto.authId
            it[menuId]                   = tAuthMenuSetDto.menuId
        }
    }

    fun getPk(tAuthMenuSetDto: TAuthMenuSetDto) : TAuthMenuSetDto {
        return TAuthMenuSet.select { TAuthMenuSet.menuId eq tAuthMenuSetDto.menuId}
            .andWhere { TAuthMenuSet.authId eq tAuthMenuSetDto.authId }.limit(1).single().let {it.toDto()}
    }

    fun isExist(tAuthMenuSetDto: TAuthMenuSetDto) : Boolean{
        return !TAuthMenuSet.select{ TAuthMenuSet.menuId eq tAuthMenuSetDto.menuId}
            .andWhere { TAuthMenuSet.authId eq tAuthMenuSetDto.authId }.empty()
    }

    fun delete (tAuthMenuSetDto: TAuthMenuSetDto){
        TAuthMenuSet.deleteWhere { (TAuthMenuSet.authMenuPk eq tAuthMenuSetDto.authMenuPk ) }
    }


}

private fun ResultRow.toDto() = TAuthMenuSet.rowToDto(this)