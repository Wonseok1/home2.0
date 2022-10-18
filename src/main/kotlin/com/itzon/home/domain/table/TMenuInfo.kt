package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow

object TMenuInfo  : IdTable<String>(name = "t_menu_info"){
    val menuId = varchar("menu_id",100)/*.uniqueIndex()*/
    override val id: Column<EntityID<String>> = menuId.entityId()

    val menuNm                  = varchar("menu_nm",20)
    val menuUrl                 = varchar("menu_url",100)
    val menuLv                  = integer("menu_lv").default(0)
    val menuParentId            = varchar("menu_parent_id",100).nullable()
    val menuParentUrl           = varchar("menu_parent_url",100).nullable()
    val menuIcon                = varchar("menu_icon",50)
    val menuPageId              = varchar("menu_page_id",100).nullable()
    val menuComment             = varchar("menu_comment",100).nullable()
    val menuPopupYn             = bool("menu_popup_yn")
    val menuPopupType           = varchar("menu_popup_type",1)
    // W: window M: modal N: none
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)

}

data class TMenuInfoDto(
    val menuId                 : String
    ,val menuNm                 : String
    ,val menuUrl                : String
    ,val menuLv                 : Int
    ,val menuParentId           : String?
    ,val menuParentUrl          : String?
    ,val menuIcon               : String
    ,val menuPageId             : String?
    ,val menuComment            : String?
    ,val menuPopupYn            : Boolean
    ,val menuPopupType          : String
    ,val useYn                  : Boolean
    ,val ordNo                  : Int
){
}

fun TMenuInfo.rowToDto(row: ResultRow): TMenuInfoDto{
    return TMenuInfoDto(
        menuId                  = row[menuId],
        menuNm                  = row[menuNm],
        menuUrl                 = row[menuUrl],
        menuLv                  = row[menuLv],
        menuParentId            = row[menuParentId],
        menuParentUrl           = row[menuParentUrl],
        menuIcon                = row[menuIcon],
        menuPageId              = row[menuPageId],
        menuComment             = row[menuComment],
        menuPopupYn             = row[menuPopupYn],
        menuPopupType           = row[menuPopupType],
        useYn                   = row[useYn],
        ordNo                   = row[ordNo],
    )
}