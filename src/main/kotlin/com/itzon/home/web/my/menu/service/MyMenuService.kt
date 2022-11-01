package com.itzon.home.web.my.menu.service

import com.itzon.home.domain.repository.TMyMenuSetRepo
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TMyMenuSetDto
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class MyMenuService (
    private val myMenuSetRepo: TMyMenuSetRepo
){
    fun findMenuExceptMine(userInfoDto: TUserInfoDto):List<TMenuInfoDto> {
        return myMenuSetRepo.findAllMenuExceptMine(userInfoDto)
    }

    fun findAllMyMenu(userId: String):List<TMyMenuSetDto> {
        return myMenuSetRepo.findAllMyMenu(userId)
    }
    fun insert(userId : String, menuId : String) {
        myMenuSetRepo.insert(
            TMyMenuSetDto(userId = userId, menuId = menuId, myMenuPk = 0)
        )
    }

    fun deleteMyMenu(tMyMenuSetDtoList: List<TMyMenuSetDto>){
        tMyMenuSetDtoList.forEach {
            myMenuSetRepo.delete(it)
        }
    }
}