package com.itzon.home.domain.repository

import com.itzon.home.domain.table.*
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository

@Repository
class TProjectManageRepo{

    fun selectAll() : List<TProjectManageDto>{
        return TProjectManage.selectAll().map { it.toDto() }
    }
    fun insert(tProjectManageDto: TProjectManageDto){
        TProjectManage.insert{
            it[projectCmnt] = tProjectManageDto.projectCmnt
            it[custNm] = tProjectManageDto.custNm
            it[projectEnv] = tProjectManageDto.projectEnv
            it[projectStartDt] = tProjectManageDto.projectStartDt
            it[projectEndDt] = tProjectManageDto.projectEndDt
            it[useYn] = tProjectManageDto.useYn
            it[ordNo] = tProjectManageDto.ordNo
        }
    }

    fun update(tProjectManageDto: TProjectManageDto) {
        TProjectManage.update({TProjectManage.projectHistoryPk eq tProjectManageDto.projectHistoryPk}){
                    it[projectCmnt] = tProjectManageDto.projectCmnt
                    it[custNm] = tProjectManageDto.custNm
                    it[projectEnv] = tProjectManageDto.projectEnv
                    it[projectStartDt] = tProjectManageDto.projectStartDt
                    it[projectEndDt] = tProjectManageDto.projectEndDt
                    it[useYn] = tProjectManageDto.useYn
                    it[ordNo] = tProjectManageDto.ordNo
        }
    }

    fun isExist(tProjectManageDto: TProjectManageDto): Boolean {
        return !TProjectManage.select { TProjectManage.projectHistoryPk eq tProjectManageDto.projectHistoryPk }.empty()
    }

    fun delete(tProjectManageDto: TProjectManageDto) {
        TProjectManage.deleteWhere {
            TProjectManage.projectHistoryPk eq tProjectManageDto.projectHistoryPk
        }
    }
}
private fun ResultRow.toDto() = TProjectManage.rowToDto(this)