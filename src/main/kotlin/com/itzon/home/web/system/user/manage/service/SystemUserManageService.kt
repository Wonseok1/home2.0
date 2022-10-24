package com.itzon.home.web.system.user.manage.service

import com.itzon.home.domain.repository.TUserInfoRepo
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class SystemUserManageService(
    private val tUserInfoRepo: TUserInfoRepo,
    private val passwordEncoder: PasswordEncoder
){
    fun selectAllOrderByOrdNo(): List<TUserInfoDto> {
        return tUserInfoRepo.selectAllOrderByUserId()
    }

    fun selectOrgId(orgId: String): List<TUserInfoDto> {
        return tUserInfoRepo.selectOrgId(orgId)
    }

    fun save(tUserInfoDtoList: List<TUserInfoDto>) {
        tUserInfoDtoList.forEach{
            if (tUserInfoRepo.isExist(it.userId)) {
                tUserInfoRepo.update(
                    TUserInfoDto(
                        userId = tUserInfoDtoList[0].userId,
                        userNm = tUserInfoDtoList[0].userNm,
                        userPw = passwordEncoder.encode(tUserInfoDtoList[0].userPw),
                        userPwCheck = passwordEncoder.encode(tUserInfoDtoList[0].userPwCheck),
                        userExtPhone = tUserInfoDtoList[0].userExtPhone,
                        userPhone = tUserInfoDtoList[0].userPhone,
                        userEmail = tUserInfoDtoList[0].userEmail,
                        userAuthId = tUserInfoDtoList[0].userAuthId,
                        userOrgId = tUserInfoDtoList[0].userOrgId,
                        useYn = tUserInfoDtoList[0].useYn,
                        ctiYn = tUserInfoDtoList[0].ctiYn,
                        workStart = tUserInfoDtoList[0].workStart,
                        workEnd = tUserInfoDtoList[0].workEnd,
                        accountNonExpiredYn = tUserInfoDtoList[0].accountNonExpiredYn,
                        accountNonLockedYn = tUserInfoDtoList[0].accountNonLockedYn,
                        credentialNonExpiredYn = tUserInfoDtoList[0].credentialNonExpiredYn,
                    )
                )
            }else{
                tUserInfoRepo.insert(
                    TUserInfoDto(
                        userId = tUserInfoDtoList[0].userId,
                        userNm = tUserInfoDtoList[0].userNm,
                        userPw = passwordEncoder.encode(tUserInfoDtoList[0].userPw),
                        userPwCheck = passwordEncoder.encode(tUserInfoDtoList[0].userPwCheck),
                        userExtPhone = tUserInfoDtoList[0].userExtPhone,
                        userPhone = tUserInfoDtoList[0].userPhone,
                        userEmail = tUserInfoDtoList[0].userEmail,
                        userAuthId = tUserInfoDtoList[0].userAuthId,
                        userOrgId = tUserInfoDtoList[0].userOrgId,
                        useYn = tUserInfoDtoList[0].useYn,
                        ctiYn = tUserInfoDtoList[0].ctiYn,
                        workStart = tUserInfoDtoList[0].workStart,
                        workEnd = tUserInfoDtoList[0].workEnd,
                        accountNonExpiredYn = tUserInfoDtoList[0].accountNonExpiredYn,
                        accountNonLockedYn = tUserInfoDtoList[0].accountNonLockedYn,
                        credentialNonExpiredYn = tUserInfoDtoList[0].credentialNonExpiredYn,
                    )
                )
            }
        }
    }

    fun updateWithoutPassWord(tUserInfoDtoList: List<TUserInfoDto>) {

        tUserInfoDtoList.forEach {
            if (tUserInfoRepo.isExist(it.userId)) {
                tUserInfoRepo.updateWithoutPassWord(
                    TUserInfoDto(
                        userId = tUserInfoDtoList[0].userId,
                        userNm = tUserInfoDtoList[0].userNm,
                        userPw = passwordEncoder.encode(""),
                        userPwCheck = passwordEncoder.encode(""),
                        userExtPhone = tUserInfoDtoList[0].userExtPhone,
                        userPhone = tUserInfoDtoList[0].userPhone,
                        userEmail = tUserInfoDtoList[0].userEmail,
                        userAuthId = tUserInfoDtoList[0].userAuthId,
                        userOrgId = tUserInfoDtoList[0].userOrgId,
                        useYn = tUserInfoDtoList[0].useYn,
                        ctiYn = tUserInfoDtoList[0].ctiYn,
                        workStart = tUserInfoDtoList[0].workStart,
                        workEnd = tUserInfoDtoList[0].workEnd,
                        accountNonExpiredYn = tUserInfoDtoList[0].accountNonExpiredYn,
                        accountNonLockedYn = tUserInfoDtoList[0].accountNonLockedYn,
                        credentialNonExpiredYn = tUserInfoDtoList[0].credentialNonExpiredYn,
                    )
                )
            }
        }
    }

    fun delete(userId : String) {
        tUserInfoRepo.delete(userId)
    }

    fun countPk(userId: String): Long {
        return tUserInfoRepo.countPk(userId)
    }

}