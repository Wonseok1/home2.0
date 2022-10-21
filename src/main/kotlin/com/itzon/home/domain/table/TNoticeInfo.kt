package com.itzon.home.domain.table

import com.itzon.home.domain.table.TMyMenuSet.autoIncrement
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TNoticeInfo  : Table(name = "t_notice_info"){
    val noticeNo = integer("notice_no" ).autoIncrement()/*.uniqueIndex()*/
    override val primaryKey = PrimaryKey(noticeNo, name= "notice_no")
    val noticeTitle = varchar("notice_title",100)
    val noticeContent = varchar("notice_content",2000)
    val noticeCreId = varchar("notice_creId",20)
    val noticeFileNm = varchar("notice_fileNm",200).nullable()
    // W: window M: modal N: none
    val ordNo= integer("ord_no").default(0)

}

data class TNoticeInfoDto(
    val noticeNo                : Int
    ,val noticeTitle            : String
    ,val noticeContent          : String
    ,val noticeCreId            : String
    ,val noticeFileNm           : String?
    ,val ordNo                  : Int
){
}

fun TNoticeInfo.rowToDto(row: ResultRow): TNoticeInfoDto{
    return TNoticeInfoDto(
        noticeNo                  = row[noticeNo],
        noticeTitle                  = row[noticeTitle],
        noticeContent                 = row[noticeContent],
        noticeCreId                  = row[noticeCreId],
        noticeFileNm            = row[noticeFileNm],
        ordNo           = row[ordNo],

    )
}