package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TUserInfo
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.springframework.stereotype.Repository

@Repository
class TUserInfoRepo {
    fun selectById(userId: String): TUserInfoDto =
        TUserInfo.select {
            TUserInfo.userId eq userId
        }.limit(1).map { it.toDto() }
            .firstOrNull() ?: throw Exception()

    fun insert(tUserInfoDto: TUserInfoDto) {
        println("tUserInfoDto.ctiYn repo = "+tUserInfoDto.ctiYn)
        println("tUserInfoDto.useYn repo = "+ tUserInfoDto.useYn)
        TUserInfo.insert {
            it[userId] = tUserInfoDto.userId
            it[userNm] = tUserInfoDto.userNm
            it[userPw] = tUserInfoDto.userPw
            it[userPwCheck] = tUserInfoDto.userPwCheck
            it[userAuthId] = tUserInfoDto.userAuthId
            it[userExtPhone] = tUserInfoDto.userExtPhone
            it[userOrgId] = tUserInfoDto.userOrgId
            it[useYn] = tUserInfoDto.useYn
            it[ctiYn] = tUserInfoDto.ctiYn
            it[accountNonExpiredYn] = tUserInfoDto.accountNonExpiredYn
            it[accountNonLockedYn] = tUserInfoDto.accountNonLockedYn
            it[credentialNonExpiredYn] = tUserInfoDto.credentialNonExpiredYn
            it[workStart] = tUserInfoDto.workStart
            it[workEnd] = tUserInfoDto.workEnd
        }
    }
    fun isExist(userId : String) : Boolean{
        return !TUserInfo.select{ TUserInfo.userId eq userId}.empty()
    }
}
private fun ResultRow.toDto() = TUserInfo.rowToDto(this)