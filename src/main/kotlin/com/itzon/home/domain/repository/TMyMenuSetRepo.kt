package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import com.itzon.home.domain.table.TMenuInfo.menuComment
import com.itzon.home.domain.table.TMenuInfo.menuIcon
import com.itzon.home.domain.table.TMenuInfo.menuId
import com.itzon.home.domain.table.TMenuInfo.menuLv
import com.itzon.home.domain.table.TMenuInfo.menuNm
import com.itzon.home.domain.table.TMenuInfo.menuPageId
import com.itzon.home.domain.table.TMenuInfo.menuParentId
import com.itzon.home.domain.table.TMenuInfo.menuParentUrl
import com.itzon.home.domain.table.TMenuInfo.menuPopupType
import com.itzon.home.domain.table.TMenuInfo.menuPopupYn
import com.itzon.home.domain.table.TMenuInfo.menuUrl
import com.itzon.home.domain.table.TMenuInfo.ordNo
import com.itzon.home.domain.table.TMenuInfo.useYn
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TMyMenuSetRepo {

    /*fun findAllMenuExceptMine(param : Map<String, Any>) : List<TMenuInfoDto> {
         var query = """
             SELECT *
             FROM t_menu_info
             WHERE menu_page_id = ${param.get("menuPageId")}
             AND menu_id NOT IN (SELECT menu_id FROM t_my_menu_set WHERE user_id = ${param.get("userId")})
             ;
         """.trimIndent()


        return query.execAndMap { it.toDto() }
    }*/

    fun findAllMenuExceptMine(userInfoDto: TUserInfoDto):List<TMenuInfoDto>{

        return TMenuInfo.select {
            (TMenuInfo.menuPageId neq "")
                .and(TMenuInfo.menuId notInSubQuery TMyMenuSet.slice(TMyMenuSet.menuId).select(TMyMenuSet.userId eq userInfoDto.userId))
                .and( TMenuInfo.menuId inSubQuery TAuthMenuSet.slice(TAuthMenuSet.menuId).select { TAuthMenuSet.authId eq userInfoDto.userAuthId })
//            .and(notExists( TMyMenuSet.slice(TMyMenuSet.menuId).select { TMyMenuSet.userId eq userId}))
        }.map {
            TMenuInfoDto(
                menuId = it[menuId],
                menuNm = it[menuNm],
                menuUrl = it[menuUrl],
                menuLv =it[menuLv],
                menuParentId =it[menuParentId],
                menuParentUrl =it[menuParentUrl],
                menuIcon =it[menuIcon],
                menuPageId =it[menuPageId],
                menuComment =it[menuComment],
                menuPopupYn =it[menuPopupYn],
                menuPopupType =it[menuPopupType],
                useYn =it[useYn],
                ordNo =it[ordNo],
            )
        }
    }

    fun findAllMyMenu(userId: String):List<TMyMenuSetDto>{

        return TMyMenuSet.select {
            TMyMenuSet.userId eq userId
        }.map { it.toDto() }
    }


    fun insert(tMyMenuSetDto: TMyMenuSetDto) {
        TMyMenuSet.insert {
            it[menuId] = tMyMenuSetDto.menuId
            it[userId] = tMyMenuSetDto.userId
        }
    }

    fun delete(tMyMenuSetDto: TMyMenuSetDto){
        TMyMenuSet.deleteWhere {
            TMyMenuSet.myMenuPk  eq tMyMenuSetDto.myMenuPk
        }
    }
}

private fun ResultRow.toDto() = TMyMenuSet.rowToDto(this)