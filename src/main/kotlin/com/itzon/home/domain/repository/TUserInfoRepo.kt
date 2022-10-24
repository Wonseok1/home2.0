package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TUserInfo
import com.itzon.home.domain.table.TUserInfoDto
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
class TUserInfoRepo {
    fun selectById(userId: String): TUserInfoDto =
        TUserInfo.select {
            TUserInfo.userId eq userId
        }.limit(1).map { it.toDto() }
            .firstOrNull() ?: throw Exception()

    fun selectByUserId(userId: String): List<TUserInfoDto> {
        return TUserInfo.select {
            TUserInfo.userId eq userId
        }.map { it.toDto() }
    }

    fun selectOrgId(orgId: String): List<TUserInfoDto> {
        return TUserInfo.select{TUserInfo.userId like orgId+"-%"}
            .orderBy(TUserInfo.userId to SortOrder.ASC)
            .map{
                it.toDto()
            }
    }

    fun insert(tUserInfoDto: TUserInfoDto) {
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

    fun selectAllOrderByUserId(): List<TUserInfoDto> {
        return TUserInfo.selectAll()
            .orderBy(TUserInfo.userId to SortOrder.ASC)
            .map {
                it.toDto()
            }
    }

    fun update(tUserInfoDto: TUserInfoDto) {
        TUserInfo.update ({TUserInfo.userId eq tUserInfoDto.userId}){
            it[userNm] = tUserInfoDto.userNm
            it[userPw] = tUserInfoDto.userPw
            it[userPwCheck] = tUserInfoDto.userPwCheck
            it[userAuthId] = tUserInfoDto.userAuthId
            it[userExtPhone] = tUserInfoDto.userExtPhone
            it[userOrgId] = tUserInfoDto.userOrgId
            it[useYn] = tUserInfoDto.useYn
            it[ctiYn] = tUserInfoDto.ctiYn
            it[workStart] = tUserInfoDto.workStart
            it[workEnd] = tUserInfoDto.workEnd
        }
    }

    fun delete(userId: String) {
        TUserInfo.deleteWhere { TUserInfo.userId eq userId }
    }

    fun countPk(userId: String): Long {
        return TUserInfo.select{TUserInfo.userId eq userId}.count()

    }

    fun updateWithoutPassWord(tUserInfoDto: TUserInfoDto) {
        TUserInfo.update ({TUserInfo.userId eq tUserInfoDto.userId}){
            it[userNm] = tUserInfoDto.userNm
            it[userAuthId] = tUserInfoDto.userAuthId
            it[userExtPhone] = tUserInfoDto.userExtPhone
            it[userOrgId] = tUserInfoDto.userOrgId
            it[useYn] = tUserInfoDto.useYn
            it[ctiYn] = tUserInfoDto.ctiYn
            it[workStart] = tUserInfoDto.workStart
            it[workEnd] = tUserInfoDto.workEnd
        }
    }

}
private fun ResultRow.toDto() = TUserInfo.rowToDto(this)
//
//fun <T:Any> String.execAndMap(transform : (ResultSet) -> T) : List<T> {
//    val result = arrayListOf<T>()
//    TransactionManager.current().exec("") { rs ->
//        while (rs.next()) {
//            result += transform(rs)
//        }
//    }
//    return result
//}
//
//"select u.name, c.name from user u inner join city c where blah blah".execAndMap { rs ->
//    rs.getString("u.name") to rs.getString("c.name")
//}