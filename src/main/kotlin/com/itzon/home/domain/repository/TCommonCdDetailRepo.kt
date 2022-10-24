package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TCommonCdDetail
import com.itzon.home.domain.table.TCommonCdDetailDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TCommonCdDetailRepo {

    fun selectAllOrderByOrdNo(commonCd: String): List<TCommonCdDetailDto> {
        return TCommonCdDetail.select{
            TCommonCdDetail.commonCd eq commonCd
        }.map{
            it.toDto()
        }

    }

    fun loadSelectBoxByCommonCd(commonCd: String) : List<TCommonCdDetailDto> {
        return TCommonCdDetail.select{ TCommonCdDetail.commonCd eq commonCd }
            .andWhere { TCommonCdDetail.useYn eq true }
            .orderBy(TCommonCdDetail.ordNo to SortOrder.ASC)
            .map { it.toDto() }
    }

    fun insert(tCommonCdDetailDto: TCommonCdDetailDto){
        TCommonCdDetail.insert {
            it[commonCdDetailPk]                   = tCommonCdDetailDto.commonCdDetailPk
            it[commonCd]                           = tCommonCdDetailDto.commonCd
            it[commonCdDetail]                     = tCommonCdDetailDto.commonCdDetail
            it[commonCdDetailNm]                   = tCommonCdDetailDto.commonCdDetailNm
            it[commonCdDetailComment]              = tCommonCdDetailDto.commonCdDetailComment
            it[useYn]                              = tCommonCdDetailDto.useYn
            it[ordNo]                              = tCommonCdDetailDto.ordNo
        }
    }

    fun update(tCommonCdDetailDto: TCommonCdDetailDto) {
        TCommonCdDetail.update ({TCommonCdDetail.commonCdDetailPk eq tCommonCdDetailDto.commonCdDetailPk }) {
            it[commonCd]                           = tCommonCdDetailDto.commonCd
            it[commonCdDetail]                     = tCommonCdDetailDto.commonCdDetail
            it[commonCdDetailNm]                   = tCommonCdDetailDto.commonCdDetailNm
            it[commonCdDetailComment]              = tCommonCdDetailDto.commonCdDetailComment
            it[useYn]                              = tCommonCdDetailDto.useYn
            it[ordNo]                              = tCommonCdDetailDto.ordNo
        }
    }

    fun isExist(tCommonCdDetailDto: TCommonCdDetailDto) : Boolean {
        return !TCommonCdDetail.select{ TCommonCdDetail.commonCdDetailPk eq tCommonCdDetailDto.commonCdDetailPk}.empty()
    }

    fun delete(tCommonCdDetailDto: TCommonCdDetailDto) {
        TCommonCdDetail.deleteWhere {
            TCommonCdDetail.commonCdDetailPk eq tCommonCdDetailDto.commonCdDetailPk
        }
    }
}

private fun ResultRow.toDto() = TCommonCdDetail.rowToDto(this)