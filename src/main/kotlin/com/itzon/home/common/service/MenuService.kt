package com.itzon.home.common.service

import com.itzon.home.domain.repository.TMenuInfoRepo
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class MenuService(
    private val tMenuInfoRepo: TMenuInfoRepo,
){
    fun findAllOrderByMenuLvAndOrdNoDesc () : List<TMenuInfoDto>{
        return tMenuInfoRepo.findAllOrderByMenuLvAndOrdNoDesc()
    }

    fun findAllMenuByUserMenuAuthOrderByMenuLvAndOrdNoDesc (tUserInfoDto: TUserInfoDto) : List<TMenuInfoDto>{
        return tMenuInfoRepo.findAllMenuByUserMenuAuthOrderByMenuLvAndOrdNoDesc(tUserInfoDto.userAuthId)
    }

    fun findByPageId(pageId : String): TMenuInfoDto{
        return tMenuInfoRepo.findByPageId(pageId)
    }
    fun findAllMyMenu(userId : String) : List<TMenuInfoDto> {
        return tMenuInfoRepo.findMyMenu(userId)

    }
    fun findAllMyPageOrdByOrdNo(userId : String) : List<TMenuInfoDto> {
        return tMenuInfoRepo.findAllMyPageOrdByOrdNo(userId)

    }
}