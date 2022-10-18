package com.itzon.home.domain.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.HashSet


object TUserInfo : IdTable<String>(name = "t_user_info") {
    val userId                      = varchar("user_id", 100).uniqueIndex()
    override val id : Column<EntityID<String>> = TUserInfo.userId.entityId()
    val userPw                      = varchar("user_pw", 200)
    val userPwCheck                 = varchar("user_pw_check", 200).nullable()
    val userAuthId                  = varchar("user_auth_id", 100)
    val userOrgId                   = varchar("user_org_id", 100)
    val userNm                      = varchar("user_nm", 200).nullable()
    val useYn                       = bool("use_yn").default(true)
    val accountNonExpiredYn         = bool("account_non_expired_yn")
    val accountNonLockedYn          = bool("account_non_locked_yn")
    val credentialNonExpiredYn      = bool("credential_non_expired_yn")
    val ctiYn                       = bool("cti_yn")
    var userExtPhone                   = varchar("user_ext_phone",10).nullable()
    var userEmail                   = varchar("user_email",30).nullable()
    var userPhone                   = varchar("user_phone",14).nullable()
    var workStart                   = varchar("work_start",10).nullable()
    var workEnd                     = varchar("work_end",10).nullable()
}

class TUserInfoDto (
    val userId                          : String,
    val userPw                          : String,
    val userPwCheck                     : String?,
    val userNm                          : String?,
    val userAuthId                      : String,
    val userOrgId                       : String,
    val useYn                           : Boolean,
    val accountNonExpiredYn             : Boolean,
    val accountNonLockedYn              : Boolean,
    val credentialNonExpiredYn          : Boolean,
    val ctiYn                           : Boolean,
    val userExtPhone                    : String?,
    val userEmail                       : String?,
    val userPhone                       : String?,
    val workStart                       : String?,
    val workEnd                         : String?,

    ): UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val grantedAuthorities: MutableSet<GrantedAuthority> = HashSet()
        grantedAuthorities.add(SimpleGrantedAuthority("ROLE_ADMIN"))
        return grantedAuthorities
    }

    override fun getPassword(): String {
        return userPw
    }

    override fun getUsername(): String {
        return userId
    }

    override fun isAccountNonExpired(): Boolean {
        return accountNonExpiredYn
    }

    override fun isAccountNonLocked(): Boolean {
        return accountNonLockedYn
    }

    override fun isCredentialsNonExpired(): Boolean {
        return credentialNonExpiredYn
    }

    override fun isEnabled(): Boolean {
        return useYn
    }
}

fun TUserInfo.rowToDto(row: ResultRow): TUserInfoDto {
    return TUserInfoDto(
        userId                      = row[userId],
        userPw                      = row[userPw],
        userPwCheck                 = row[userPwCheck],
        userNm                      = row[userNm],
        userAuthId                  = row[userAuthId],
        userOrgId                   = row[userOrgId],
        useYn                       = row[useYn],
        accountNonExpiredYn         = row[accountNonExpiredYn],
        accountNonLockedYn          = row[accountNonLockedYn],
        credentialNonExpiredYn      = row[credentialNonExpiredYn],
        ctiYn                       = row[ctiYn],
        userExtPhone                = row[userExtPhone],
        userEmail                   = row[userEmail],
        userPhone                   = row[userPhone],
        workStart                   = row[workStart],
        workEnd                     = row[workEnd]
    )
}
