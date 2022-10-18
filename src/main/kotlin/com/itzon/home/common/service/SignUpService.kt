
package com.itzon.home.common.service

import com.itzon.home.domain.repository.TUserInfoRepo
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SignUpService (
    private val tUserInfoRepo: TUserInfoRepo,
    private val passwordEncoder: PasswordEncoder

        ){
    fun insert(tUserInfoDto : TUserInfoDto) {

        tUserInfoRepo.insert(
            TUserInfoDto(
                userId =  tUserInfoDto.userId,
                userPw = passwordEncoder.encode(tUserInfoDto.userPw),
                userPwCheck = passwordEncoder.encode(tUserInfoDto.userPwCheck),
                userNm = tUserInfoDto.userNm,
                userAuthId= tUserInfoDto.userAuthId,
                userOrgId = tUserInfoDto.userOrgId,
                useYn = tUserInfoDto.useYn,
                ctiYn = tUserInfoDto.ctiYn,
                userExtPhone = tUserInfoDto.userExtPhone,
                userEmail = tUserInfoDto.userEmail,
                userPhone = tUserInfoDto.userPhone,
                accountNonExpiredYn = tUserInfoDto.accountNonExpiredYn,
                accountNonLockedYn = tUserInfoDto.accountNonLockedYn,
                credentialNonExpiredYn = tUserInfoDto.credentialNonExpiredYn,
                workStart = tUserInfoDto.workStart,
                workEnd = tUserInfoDto.workEnd,
            )
        )
    }
    fun isExist(userId : String) : Boolean{
        return tUserInfoRepo.isExist(userId)
    }
}