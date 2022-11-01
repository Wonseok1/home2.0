package com.itzon.home.common.service

import com.itzon.home.domain.repository.TAuthOrgSetRepo
import com.itzon.home.domain.repository.TOrgInfoRepo
import com.itzon.home.domain.table.TOrgInfoDto
import com.itzon.home.domain.table.TUserInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Transactional
@Service
class OrgService (
    private val tOrgInfoRepo: TOrgInfoRepo,
    private val tAuthOrgSetRepo: TAuthOrgSetRepo,
){
    fun findOrgInfoByAuth(tUserInfoDto: TUserInfoDto) : List<TOrgInfoDto>{

        val tOrgAuthList: List<String> = tAuthOrgSetRepo.findOrgSetByAuthId(tUserInfoDto.userAuthId)

        println(tOrgAuthList.toString())
        if (tOrgAuthList.contains("0")) {
            //전체
            println("ALL")
            return tOrgInfoRepo.findAll()
        }else if (tOrgAuthList.contains("1")) {
            //자기자신만
            println("MYSELF")
            return tOrgInfoRepo.findMyOrg(tUserInfoDto)
        }else{
            //조직권한에 따라
            println("나머지")
            return tOrgInfoRepo.findAllByAuthOrderByOrgLvAndOrdNoDesc(tUserInfoDto,tOrgAuthList )
        }
    }

}