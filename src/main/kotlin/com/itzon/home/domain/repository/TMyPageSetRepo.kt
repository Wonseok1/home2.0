package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository


@Repository
class TMyPageSetRepo {

    fun findAllMenu(userInfoDto: TUserInfoDto):List<TMenuInfoDto>{

        return TMenuInfo.select {
            (TMenuInfo.menuPageId neq "")
                .and(TMenuInfo.menuId notInSubQuery TMyPageSet.slice(TMyPageSet.menuId).select(TMyPageSet.userId eq userInfoDto.userId))
                .and( TMenuInfo.menuId inSubQuery TAuthMenuSet.slice(TAuthMenuSet.menuId).select { TAuthMenuSet.authId eq userInfoDto.userAuthId })
//            .and(notExists( TMyMenuSet.slice(TMyMenuSet.menuId).select { TMyMenuSet.userId eq userId}))
        }.map {
            TMenuInfoDto(
                menuId = it[TMenuInfo.menuId],
                menuNm = it[TMenuInfo.menuNm],
                menuUrl = it[TMenuInfo.menuUrl],
                menuLv =it[TMenuInfo.menuLv],
                menuParentId =it[TMenuInfo.menuParentId],
                menuParentUrl =it[TMenuInfo.menuParentUrl],
                menuIcon =it[TMenuInfo.menuIcon],
                menuPageId =it[TMenuInfo.menuPageId],
                menuComment =it[TMenuInfo.menuComment],
                menuPopupYn =it[TMenuInfo.menuPopupYn],
                menuPopupType =it[TMenuInfo.menuPopupType],
                useYn =it[TMenuInfo.useYn],
                ordNo =it[TMenuInfo.ordNo],
            )
        }
    }

    fun findAllMyPage(userId: String):List<TMyPageSetDto>{

        return TMyPageSet.select {
            TMyPageSet.userId eq userId
        }.map { it.toDto() }
    }

    fun insert(tMyPageSetDto: TMyPageSetDto) {
        TMyPageSet.insert {
            it[menuId] = tMyPageSetDto.menuId
            it[userId] = tMyPageSetDto.userId
            it[ordNo]  = tMyPageSetDto.ordNo
        }
    }

    fun update(tMyPageSetDto: TMyPageSetDto) {
        TMyPageSet.update({TMyPageSet.myPagePk eq tMyPageSetDto.myPagePk}) {
            it[menuId]     =  tMyPageSetDto.menuId
            it[userId]     =  tMyPageSetDto.userId
            it[ordNo]      =  tMyPageSetDto.ordNo
        }
    }

    fun isExist(tMyPageSetDto: TMyPageSetDto) : Boolean{
        return !TMyPageSet.select { TMyPageSet.myPagePk eq tMyPageSetDto.myPagePk }.empty()
    }

    fun delete(tMyPageSetDto: TMyPageSetDto){
        TMyPageSet.deleteWhere {
            TMyPageSet.myPagePk  eq tMyPageSetDto.myPagePk
        }
    }


}

private fun ResultRow.toDto() = TMyPageSet.rowToDto(this)