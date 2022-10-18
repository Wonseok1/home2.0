package com.itzon.home.common.service

import com.itzon.home.domain.repository.TUserInfoRepo
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.HashSet
import javax.servlet.http.HttpSession

@Service
@Transactional
class CustomUserDetailService(
    private val httpSession: HttpSession,
    private val tUserInfoRepo: TUserInfoRepo,
): UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val userInfo = tUserInfoRepo.selectById(username)

        val grantedAuthorities: MutableSet<GrantedAuthority> = HashSet()
        httpSession.setAttribute("user", userInfo)

        grantedAuthorities.add(SimpleGrantedAuthority("ROLE_ADMIN"))

        println("success to auth")
//        return LoginUserDto(userInfo)
        return User( userInfo?.userId,  userInfo?.userPw, grantedAuthorities)
    }

}