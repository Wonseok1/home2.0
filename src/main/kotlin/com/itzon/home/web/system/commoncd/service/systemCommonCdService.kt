package com.itzon.home.web.system.commoncd.service

import com.itzon.home.domain.repository.TCommonCdDetailRepo
import com.itzon.home.domain.repository.TCommonCdInfoRepo
import com.itzon.home.domain.table.TCommonCdDetailDto
import com.itzon.home.domain.table.TCommonCdInfoDto
import org.springframework.stereotype.Service

@Service
class systemCommonCdService (
    private val tCommonCdInfoRepo: TCommonCdInfoRepo,
    private val tCommonCdDetailRepo: TCommonCdDetailRepo,
){

    fun findCmnCd() : List<TCommonCdInfoDto> {
        return tCommonCdInfoRepo.selectAllOrderByOrdNo()
    }

    fun findCmnCdDtl(commonCd: String) : List<TCommonCdDetailDto> {
        return tCommonCdDetailRepo.selectAllOrderByOrdNo(commonCd)
    }

    fun saveCmnCd(tCommonCdInfoDtoList : List<TCommonCdInfoDto>) {
        tCommonCdInfoDtoList.forEach {
            if (tCommonCdInfoRepo.isExist(it)) {
                tCommonCdInfoRepo.update(it)
            }else{
                tCommonCdInfoRepo.saveCmnCd(it)
            }
        }
    }

    fun saveCmnCdDtl(tCommonCdDetailDtoList: List<TCommonCdDetailDto>) {
        tCommonCdDetailDtoList.forEach {
            if(tCommonCdDetailRepo.isExist(it)) {
                tCommonCdDetailRepo.update(it)
            }else{
                tCommonCdDetailRepo.insert(it)
            }
        }
    }


}