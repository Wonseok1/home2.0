package com.itzon.home.web.system.auth.menu.service

import com.itzon.home.domain.repository.TAuthInfoRepo
import com.itzon.home.domain.repository.TAuthMenuSetRepo
import com.itzon.home.domain.repository.TMenuInfoRepo
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.TAuthMenuSet
import com.itzon.home.domain.table.TAuthMenuSetDto
import com.itzon.home.domain.table.TMenuInfoDto
import org.jetbrains.exposed.sql.batchInsert
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Transactional
@Service
class SystemAuthMenuService (
    private val tAuthInfoRepo: TAuthInfoRepo,
    private val tMenuInfoRepo: TMenuInfoRepo,
    private val tAuthMenuSetRepo: TAuthMenuSetRepo,
) {

    fun getAllAuth() : List<TAuthInfoDto> {
        return tAuthInfoRepo.findAllByUseYnOrderByOrdNo()
    }

    fun getAllMenu() : List<TMenuInfoDto> {
        return tMenuInfoRepo.findAllOrderByMenuLvAndOrdNoDesc()
    }

    fun findAllMenuListWhenClickAuth(authId: String) : List<TAuthMenuSetDto> {
        return tAuthMenuSetRepo.findAllByAuthId(authId)
    }

    fun save(tAuthMenuSetDto: List<TAuthMenuSetDto>) {

        TAuthMenuSet.batchInsert(tAuthMenuSetDto){
                it ->
            this[TAuthMenuSet.menuId] = it.menuId
            this[TAuthMenuSet.authId] = it.authId
        }

        /*for (data in tAuthMenuSetDto) {
            if (!tAuthMenuSetRepo.isExist(data)) {
                tAuthMenuSetRepo.insert(data)
            }
        }*/
    }

    fun delete(tAuthMenuSetDto: List<TAuthMenuSetDto>){

        for (data in tAuthMenuSetDto) {
            if (tAuthMenuSetRepo.isExist(data)) {
                val pk = tAuthMenuSetRepo.getPk(data)
                tAuthMenuSetRepo.delete(pk)
            }
        }


    }


}