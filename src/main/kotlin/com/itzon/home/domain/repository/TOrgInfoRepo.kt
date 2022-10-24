package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TOrgInfo
import com.itzon.home.domain.table.TOrgInfoDto
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TOrgInfoRepo{
    fun findAll(): List<TOrgInfoDto> {
        return TOrgInfo.selectAll()
            .orderBy(TOrgInfo.orgLv to SortOrder.ASC)
            .orderBy(TOrgInfo.ordNo to SortOrder.ASC)
            .map{
                it.toDto()
            }
    }

    fun findAllByAuthOrderByOrgLvAndOrdNoDesc(tUserInfoDto: TUserInfoDto, tOrgSetDtoList: List<String>) : List<TOrgInfoDto>{
        return TOrgInfo.select {
            TOrgInfo.orgId inList tOrgSetDtoList
        }.orderBy(TOrgInfo.orgLv to SortOrder.ASC)
            .orderBy(TOrgInfo.ordNo to SortOrder.ASC)
            .map { it.toDto() }
    }

    fun findMyOrg(tUserInfoDto: TUserInfoDto) : List<TOrgInfoDto>{
        return TOrgInfo.select {
            TOrgInfo.orgId eq tUserInfoDto.userOrgId
        }.map { it.toDto() }
    }

    fun isExist(tOrgInfoDto: TOrgInfoDto): Boolean {
        return !TOrgInfo.select { TOrgInfo.orgId eq tOrgInfoDto.orgId }.empty()
    }

    fun update(tOrgInfoDto: TOrgInfoDto) {
        TOrgInfo.update({TOrgInfo.orgId eq tOrgInfoDto.orgId}){
            it[orgId] = tOrgInfoDto.orgId
            it[orgNm] = tOrgInfoDto.orgNm
            it[orgLv] = tOrgInfoDto.orgLv
            it[orgParentId] = tOrgInfoDto.orgParentId
            it[orgParentUrl] = tOrgInfoDto.orgParentUrl
            it[useYn] = tOrgInfoDto.useYn
            it[ordNo] = tOrgInfoDto.ordNo
        }
    }

    fun insert(tOrgInfoDto: TOrgInfoDto) {
        TOrgInfo.insert{
            it[orgId] = tOrgInfoDto.orgId
            it[orgNm] = tOrgInfoDto.orgNm
            it[orgLv] = tOrgInfoDto.orgLv
            it[orgParentId] = tOrgInfoDto.orgParentId
            it[orgParentUrl] = tOrgInfoDto.orgParentUrl
            it[useYn] = tOrgInfoDto.useYn
            it[ordNo] = tOrgInfoDto.ordNo
        }
    }

    fun deleteOrg(orgId: String) {
        TOrgInfo.deleteWhere {
            TOrgInfo.orgId eq orgId
        }
    }


}
private fun ResultRow.toDto() = TOrgInfo.rowToDto(this)