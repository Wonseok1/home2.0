package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TMenuInfoRepo {
    fun findAll(): List<TMenuInfoDto> {
        return TMenuInfo.selectAll()
            .map{ it.toDto() }
    }
    fun findAllOrderByMenuLvAndOrdNoDesc(): List<TMenuInfoDto> {
        return TMenuInfo.selectAll()
            .orderBy(TMenuInfo.menuLv to SortOrder.ASC)
            .orderBy(TMenuInfo.ordNo to SortOrder.ASC)
            .map { it.toDto() }
    }
    fun findAllMenuByUserMenuAuthOrderByMenuLvAndOrdNoDesc(userAuthId: String) : List<TMenuInfoDto>{
        return TMenuInfo.select {
            TMenuInfo.menuId inSubQuery TAuthMenuSet.slice(TAuthMenuSet.menuId).select { TAuthMenuSet.authId eq userAuthId }
        }.orderBy(TMenuInfo.menuLv to SortOrder.ASC)
            .orderBy(TMenuInfo.ordNo to SortOrder.ASC)
            .map { it.toDto() }
    }

    fun findByPageId(pageId: String) : TMenuInfoDto{
        return TMenuInfo.select {
            TMenuInfo.menuPageId eq pageId
        }.limit(1).single().let {
            it.toDto()
        }
    }
    fun isExist(tMenuInfoDto: TMenuInfoDto): Boolean {
        return !TMenuInfo.select { TMenuInfo.menuId eq tMenuInfoDto.menuId }.empty()
    }

    fun insert(tMenuInfoDto: TMenuInfoDto){
        TMenuInfo.insert{
            it[menuId] = tMenuInfoDto.menuId
            it[menuNm] = tMenuInfoDto.menuNm
            it[menuLv] = tMenuInfoDto.menuLv
            it[menuParentId] = tMenuInfoDto.menuParentId
            it[menuParentUrl] = tMenuInfoDto.menuParentUrl
            it[menuUrl] = tMenuInfoDto.menuUrl
            it[menuIcon] = tMenuInfoDto.menuIcon
            it[menuPageId] = tMenuInfoDto.menuPageId
            it[menuComment] = tMenuInfoDto.menuComment
            it[menuPopupYn] = tMenuInfoDto.menuPopupYn
            it[menuPopupType] = tMenuInfoDto.menuPopupType
            it[useYn] = tMenuInfoDto.useYn
            it[ordNo] = tMenuInfoDto.ordNo
        }
    }
    fun update(tMenuInfoDto: TMenuInfoDto) {
        TMenuInfo.update ({TMenuInfo.menuId eq tMenuInfoDto.menuId}){
            it[menuNm] = tMenuInfoDto.menuNm
            it[menuLv] = tMenuInfoDto.menuLv
            it[menuParentId] = tMenuInfoDto.menuParentId
            it[menuParentUrl] = tMenuInfoDto.menuParentUrl
            it[menuUrl] = tMenuInfoDto.menuUrl
            it[menuIcon] = tMenuInfoDto.menuIcon
            it[menuPageId] = tMenuInfoDto.menuPageId
            it[menuComment] = tMenuInfoDto.menuComment
            it[menuPopupYn] = tMenuInfoDto.menuPopupYn
            it[menuPopupType] = tMenuInfoDto.menuPopupType
            it[useYn] = tMenuInfoDto.useYn
            it[ordNo] = tMenuInfoDto.ordNo
        }
    }
    fun delete(tMenuInfoDto: TMenuInfoDto) {
        TMenuInfo.deleteWhere {
            TMenuInfo.menuId eq tMenuInfoDto.menuId
        }
    }
    fun findMyMenu(userId : String) : List<TMenuInfoDto> {
        return TMenuInfo.select {
            TMenuInfo.menuId inSubQuery TMyMenuSet.slice(TMyMenuSet.menuId).select { TMyMenuSet.userId eq userId }
        }.map { it.toDto() }
    }
    fun findAllMyPageOrdByOrdNo(userId : String) : List<TMenuInfoDto> {
        return TMenuInfo.join(TMyPageSet, JoinType.INNER, additionalConstraint = {TMenuInfo.menuId eq TMyPageSet.menuId} )
            .slice(TMenuInfo.menuId, TMenuInfo.menuNm, TMenuInfo.menuUrl, TMenuInfo.menuLv, TMenuInfo.menuParentId, TMenuInfo.menuParentUrl, TMenuInfo.menuIcon, TMenuInfo.menuPageId, TMenuInfo.menuComment, TMenuInfo.menuPopupType, TMenuInfo.menuPopupYn, TMenuInfo.useYn, TMenuInfo.ordNo)
            .select({TMyPageSet.userId eq userId})
            .orderBy(TMyPageSet.ordNo)
            .map { it.toDto() }

        /*TMenuInfo.select {
                TMenuInfo.menuId inSubQuery TMyPageSet.slice(TMyPageSet.menuId).select { TMyPageSet.userId eq userId }
            }.orderBy(TMyPageSet.ordNo).map { it.toDto() }*/
    }


}
private fun ResultRow.toDto() = TMenuInfo.rowToDto(this)