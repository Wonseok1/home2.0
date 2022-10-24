package com.itzon.home.web.system.auth.grid.service

import com.itzon.home.domain.repository.TAuthGridSetRepo
import com.itzon.home.domain.repository.TAuthInfoRepo
import com.itzon.home.domain.repository.TGridInfoRepo
import com.itzon.home.domain.table.TAuthGridSetDto
import com.itzon.home.domain.table.TAuthInfoDto
import com.itzon.home.domain.table.TGridInfoDto
import com.itzon.home.web.system.auth.grid.dto.SelectGridAuthDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SystemAuthGridService(
    private val tAuthInfoRepo: TAuthInfoRepo,
    private val tGridInfoRepo: TGridInfoRepo,
    private val tAuthGridSetRepo: TAuthGridSetRepo
) {

    fun getAllAuth(): List<TAuthInfoDto> {
        return tAuthInfoRepo.findAllByUseYnOrderByOrdNo()
    }

    fun getAllGrid(): List<TGridInfoDto> {
        return tGridInfoRepo.selectAllOrderByOrdNo()
    }

    fun findAllGridListWhenClickAuth(authId: String) : List<SelectGridAuthDto> {
        return tAuthGridSetRepo.findAllByAuthId(authId)
    }

    fun save(tAuthMenuSetDto: List<TAuthGridSetDto>) {
        tAuthMenuSetDto.forEach {
            if (tAuthGridSetRepo.isExist(it)) {
                tAuthGridSetRepo.update(it)
            } else {
                tAuthGridSetRepo.insert(it)
            }
        }

    }
}