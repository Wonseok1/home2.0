package com.itzon.home.common.service

import com.itzon.home.domain.repository.TCommonCdDetailRepo
import com.itzon.home.domain.table.TCommonCdDetailDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class CommonCodeService (
    private val tCommonCdDetailRepo : TCommonCdDetailRepo
){
    fun loadSelectBoxByCommonCd(commonCd: String) : List<TCommonCdDetailDto> {
        return tCommonCdDetailRepo.loadSelectBoxByCommonCd(commonCd)

    }
}