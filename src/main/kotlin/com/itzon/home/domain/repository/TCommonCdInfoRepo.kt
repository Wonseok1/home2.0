package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TCommonCdInfo
import com.itzon.home.domain.table.TCommonCdInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TCommonCdInfoRepo {

    fun selectAllOrderByOrdNo(): List<TCommonCdInfoDto> {
        return TCommonCdInfo.selectAll()
            .orderBy(TCommonCdInfo.ordNo to SortOrder.ASC)
            .map {
                it.toDto()
            }
    }

    fun isExist(tCommonCdInfoDto: TCommonCdInfoDto): Boolean {
        return !TCommonCdInfo.select{ TCommonCdInfo.commonCd eq tCommonCdInfoDto.commonCd }.empty()
    }

    fun saveCmnCd(tCommonCdInfoDto: TCommonCdInfoDto){
        TCommonCdInfo.insert {
            it[commonCd]                   = tCommonCdInfoDto.commonCd
            it[commonCdNm]                 = tCommonCdInfoDto.commonCdNm
            it[commonCdComment]            = tCommonCdInfoDto.commonCdComment
            it[useYn]                      = tCommonCdInfoDto.useYn
            it[ordNo]                      = tCommonCdInfoDto.ordNo
        }
    }

    fun update(tCommonCdInfoDto: TCommonCdInfoDto) {
        TCommonCdInfo.update ({TCommonCdInfo.commonCd eq tCommonCdInfoDto.commonCd }) {
            it[commonCd]                   = tCommonCdInfoDto.commonCd
            it[commonCdNm]                 = tCommonCdInfoDto.commonCdNm
            it[commonCdComment]            = tCommonCdInfoDto.commonCdComment
            it[useYn]                      = tCommonCdInfoDto.useYn
            it[ordNo]                      = tCommonCdInfoDto.ordNo
        }
    }

    fun delete(tCommonCdInfoDto: TCommonCdInfoDto) {
        TCommonCdInfo.deleteWhere {
            TCommonCdInfo.commonCd eq tCommonCdInfoDto.commonCd
        }
    }
}

private fun ResultRow.toDto() = TCommonCdInfo.rowToDto(this)