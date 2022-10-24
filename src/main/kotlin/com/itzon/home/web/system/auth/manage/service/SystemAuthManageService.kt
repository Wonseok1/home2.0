package com.itzon.home.web.system.auth.manage.service

import com.itzon.home.common.constant.REST_SYSTEM_AUTH_MANAGE
import com.itzon.home.domain.repository.TAuthInfoRepo
import com.itzon.home.domain.table.TAuthInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@Service
@Transactional
class SystemAuthManageService(
    private val tAuthInfoRepo: TAuthInfoRepo
){
    fun selectAll() :List<TAuthInfoDto> {
        return tAuthInfoRepo.selectAll()
    }
    fun save(tAuthInfoDtos: List<TAuthInfoDto>) {
        tAuthInfoDtos.forEach{
            if (tAuthInfoRepo.isExist(it)) {
                tAuthInfoRepo.update(it)
            }else{
                tAuthInfoRepo.insert(it)
            }
        }
    }
    fun delete(tAuthInfoDtos: List<TAuthInfoDto>) {
        tAuthInfoDtos.forEach {
            tAuthInfoRepo.delete(it)
        }
    }
}