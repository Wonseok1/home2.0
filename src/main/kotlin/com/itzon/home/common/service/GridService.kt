package com.itzon.home.common.service

import com.itzon.home.domain.repository.TGridColumnDetailRepo
import com.itzon.home.domain.repository.TGridInfoRepo
import com.itzon.home.domain.table.TGridColumnDetailDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Transactional
@Service
class GridService (
    private val tGridInfoRepo: TGridInfoRepo,
    private val tGridColumnDetailRepo: TGridColumnDetailRepo,
){
    fun selectGridColumnByGridId(gridId: String) : List<TGridColumnDetailDto> {
        return tGridColumnDetailRepo.selectGridColumnByGridId(gridId)

    }
}