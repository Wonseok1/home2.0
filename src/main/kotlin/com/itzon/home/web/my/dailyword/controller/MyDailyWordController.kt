package com.itzon.home.web.my.dailyword.controller

import com.itzon.home.common.constant.REST_MY_DAILYWORD
import com.itzon.home.domain.table.TDailyWordSaveRequestDto
import com.itzon.home.domain.table.TDailyWordsDto
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.web.my.dailyword.service.MyDailyWordService
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpSession

@RestController
@RequestMapping("$REST_MY_DAILYWORD")
class MyDailyWordController (

    private val myDailyWordService: MyDailyWordService,
    private val httpSession: HttpSession,
){
    @GetMapping("/findAll")
    fun selectAllOrderByOrdNo() : List<TDailyWordsDto>{
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        return myDailyWordService.selectAllOrderByOrdNo(tUserInfoDto.userId)
    }

    @PostMapping("/saveDailyWords")
    fun saveDailyWords(@RequestBody tDailyWordSaveRequestDto: TDailyWordSaveRequestDto) {
        val tUserInfoDto : TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        println(tUserInfoDto.userId)
        return myDailyWordService.saveDailyWords(
            TDailyWordsDto(
                dailyWordsPk = tDailyWordSaveRequestDto.dailyWordsPk,
                userId = tUserInfoDto.userId,
                dailyUseWordTitle=tDailyWordSaveRequestDto.dailyUseWordTitle,
                dailyUseWordContent=tDailyWordSaveRequestDto.dailyUseWordContent,
                useYn=tDailyWordSaveRequestDto.useYn,
                ordNo=tDailyWordSaveRequestDto.ordNo,
            )
        )
    }

    @DeleteMapping("/deleteDailyWords")
    fun deleteDailyWords(@RequestBody tDailyWordSaveRequestDto: TDailyWordSaveRequestDto){
        println("삭제")
        println(tDailyWordSaveRequestDto)
        val tUserInfoDto: TUserInfoDto = httpSession.getAttribute("user") as TUserInfoDto
        myDailyWordService.deleteDailyWords(
            TDailyWordsDto(
                dailyWordsPk = tDailyWordSaveRequestDto.dailyWordsPk,
                userId = tUserInfoDto.userId,
                dailyUseWordTitle=tDailyWordSaveRequestDto.dailyUseWordTitle,
                dailyUseWordContent=tDailyWordSaveRequestDto.dailyUseWordContent,
                useYn=tDailyWordSaveRequestDto.useYn,
                ordNo=tDailyWordSaveRequestDto.ordNo,
            )
        )
    }

}