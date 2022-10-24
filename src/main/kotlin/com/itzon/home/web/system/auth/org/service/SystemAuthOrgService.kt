package com.itzon.home.web.system.auth.org.service

import com.itzon.home.domain.repository.TAuthInfoRepo
import com.itzon.home.domain.repository.TAuthOrgSetRepo
import com.itzon.home.domain.repository.TOrgInfoRepo
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.TAuthOrgSetDto
import com.itzon.home.domain.table.TOrgInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SystemAuthOrgService (
    private val tAuthInfoRepo: TAuthInfoRepo,
    private val tAuthOrgSetRepo: TAuthOrgSetRepo,
    private val tOrgInfoRepo: TOrgInfoRepo
) {

    fun getAllAuth() : List<TAuthInfoDto> {
        return tAuthInfoRepo.findAllByUseYnOrderByOrdNo()
    }

    fun getAllMenu() : List<TOrgInfoDto> {
        return tOrgInfoRepo.findAll()
    }

    fun findAllMenuListWhenClickAuth(authId: String) : List<TAuthOrgSetDto> {
        return tAuthOrgSetRepo.findAllByAuthId(authId)
    }

    fun save(tAuthOrgSetDto: List<TAuthOrgSetDto>) {

        for (data in tAuthOrgSetDto) {
            if (data.orgId == "0" || data.orgId == "1") {
                tAuthOrgSetRepo.deleteAllOrgId(data)
            } else {
                tAuthOrgSetRepo.deleteAllAndOne(data)
            }

            if (!tAuthOrgSetRepo.isExist(data)) {
                tAuthOrgSetRepo.insert(data)
            }
        }
    }

    fun delete(tAuthOrgSetDto: List<TAuthOrgSetDto>){

        for (data in tAuthOrgSetDto) {
            if (tAuthOrgSetRepo.isExist(data)) {
                val pk = tAuthOrgSetRepo.getPk(data)
                tAuthOrgSetRepo.delete(pk)
            }
        }


    }


}