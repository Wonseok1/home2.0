package com.itzon.home.web.system.grid.column.service

import com.itzon.home.domain.repository.TGridColumnDetailRepo
import com.itzon.home.domain.repository.TGridInfoRepo
import com.itzon.home.domain.table.TGridColumnDetailDto
import com.itzon.home.domain.table.TGridInfoDto
import org.springframework.stereotype.Service

@Service
class SystemGridColumnService (
    private val tGridInfoRepo: TGridInfoRepo,
    private val tGridColumnDetailRepo: TGridColumnDetailRepo,
){
    fun selectAllOrderByOrdNo() : List<TGridInfoDto> {
        return tGridInfoRepo.selectAllOrderByOrdNo()
    }
    fun findAllGridColumnInfoByGridId(gridId : String) : List<TGridColumnDetailDto>{
        return tGridColumnDetailRepo.selectGridColumnByGridId(gridId)
    }
    fun saveGridInfo(tGridInfoDtoList: List<TGridInfoDto>) {
        tGridInfoDtoList.forEach{
            if (tGridInfoRepo.isExist(it)) {
                tGridInfoRepo.update(it)
            }else{
                tGridInfoRepo.insert(it)
            }
        }
    }
    fun saveGridColumnDetail(tGridColumnDetailDtoList: List<TGridColumnDetailDto>) {
        tGridColumnDetailDtoList.forEach{
            if (tGridColumnDetailRepo.isExist(it)) {
                tGridColumnDetailRepo.update(it)
            }else{
                tGridColumnDetailRepo.insert(it)
            }
        }
    }

    fun deleteGridInfo(tGridInfoDtoList: List<TGridInfoDto>) {
        tGridInfoDtoList.forEach{
            tGridInfoRepo.delete(it)
        }
    }

    fun deleteGridColumn(tGridColumnDetailDtoList: List<TGridColumnDetailDto>) {
        tGridColumnDetailDtoList.forEach{
            tGridColumnDetailRepo.delete(it)
        }
    }
}