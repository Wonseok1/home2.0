package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TNoticeInfoRepo {

    //조회
    fun findAll(): List<TNoticeInfoDto> {
        return TNoticeInfo.selectAll()
            .map{ it.toDto() }
    }

    fun findByTitle(noticeTitle: String): List<TNoticeInfoDto> {
        println("noticeTitle22222")
        println(noticeTitle)
        return TNoticeInfo.select {
            TNoticeInfo.noticeTitle like "%$noticeTitle%"
        }.map { it.toDto() }
    }

    fun findByContent(noticeContent: String): List<TNoticeInfoDto> {
        return TNoticeInfo.select {
            TNoticeInfo.noticeContent like "%$noticeContent%"
        }.map { it.toDto() }
    }

    fun findByCreId(noticeCreId: String): List<TNoticeInfoDto> {
        return TNoticeInfo.select {
            TNoticeInfo.noticeCreId like "%$noticeCreId%"
        }.map { it.toDto() }
    }

    fun findByNoticeSearchVal(noticeSearchVal: String): List<TNoticeInfoDto> {
        return TNoticeInfo.select {
            (TNoticeInfo.noticeCreId like "%$noticeSearchVal%") or (TNoticeInfo.noticeTitle like "%$noticeSearchVal%") or (TNoticeInfo.noticeContent like "%$noticeSearchVal%")
        }.map { it.toDto() }
    }


//    //그리드 행 클릭시 해당글번호의 첨부파일 찾기 //임시주석
//    fun findFileInfo(noticeNo: Long): List<TFileInfoDto> {
//        return TNoticeInfo.select {
//            TFileInfoDto.noOfNotice eq noticeNo
//        }.map { it.toDto() }
//    }

//----------------------------------------------요기까지함  -------------------


    //    fun isExist(tNoticeInfoDto: TNoticeInfoDto): Boolean {
//        return !TNoticeInfo.select { TNoticeInfo.menuId eq tNoticeInfoDto.menuId }.empty()
//    }
//
    fun insert(tNoticeInfoDto: TNoticeInfoDto){
        TNoticeInfo.insert{
//            it[noticeNo] = tNoticeInfoDto.noticeNo
            it[noticeTitle] = tNoticeInfoDto.noticeTitle.toString()
            it[noticeContent] = tNoticeInfoDto.noticeContent.toString()
            it[noticeCreId] = tNoticeInfoDto.noticeCreId.toString()
            it[noticeFileNm] = tNoticeInfoDto.noticeFileNm.toString()
//            it[ordNo] = tNoticeInfoDto.ordNo
        }
    }
    fun update(tNoticeInfoDto: TNoticeInfoDto) {
        TNoticeInfo.update ({TNoticeInfo.noticeNo eq tNoticeInfoDto.noticeNo}){
            it[noticeTitle] = tNoticeInfoDto.noticeTitle
            it[noticeContent] =tNoticeInfoDto.noticeContent
            it[noticeCreId] =tNoticeInfoDto.noticeCreId
            it[noticeFileNm] = tNoticeInfoDto.noticeFileNm
        }
    }
    fun delete(noticeNo: Int) {
        TNoticeInfo.deleteWhere {
            TNoticeInfo.noticeNo eq noticeNo
        }
    }

//    fun findByNoticeNo(toLong: Long): TNoticeInfo {
//
//    }


}
private fun ResultRow.toDto() = TNoticeInfo.rowToDto(this)