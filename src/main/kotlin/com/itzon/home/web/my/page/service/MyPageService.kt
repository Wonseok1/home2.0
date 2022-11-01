package com.itzon.home.web.my.page.service

import com.itzon.home.domain.repository.TMyPageSetRepo
import com.itzon.home.domain.table.TMenuInfoDto
import com.itzon.home.domain.table.TMyPageSetDto
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class MyPageService (
    private val myPageSetRepo: TMyPageSetRepo
){

    fun findAllMenu(userInfoDto: TUserInfoDto):List<TMenuInfoDto> {
        return myPageSetRepo.findAllMenu(userInfoDto)
    }

    fun findAllMyPage(userId: String):List<TMyPageSetDto>{
        return myPageSetRepo.findAllMyPage(userId)
    }

    fun saveMyPage(userId: String, menuId: String){
        myPageSetRepo.insert(
            TMyPageSetDto(userId = userId, menuId = menuId, myPagePk = 0, ordNo = 0)
        )
    }

    fun saveMyPageDtl(tMyPageSetDtoList: List<TMyPageSetDto>){
        tMyPageSetDtoList.forEach {
            if (myPageSetRepo.isExist(it)){
                myPageSetRepo.update(it)
            }else{
                myPageSetRepo.insert(it)
            }
        }
    }

    fun deleteMyPage(tMyPageSetDtoList: List<TMyPageSetDto>){
        tMyPageSetDtoList.forEach {
            myPageSetRepo.delete(it)
        }
    }
}