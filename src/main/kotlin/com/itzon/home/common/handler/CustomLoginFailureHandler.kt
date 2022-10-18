package com.itzon.home.common.handler

import org.springframework.security.authentication.*
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import java.io.IOException
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class CustomLoginFailureHandler : SimpleUrlAuthenticationFailureHandler(){
    @Throws(IOException::class, ServletException::class)
    override fun onAuthenticationFailure(
        request: HttpServletRequest,
        response: HttpServletResponse,
        exception: AuthenticationException
    ) {
        println("Failed to auth.")
        val sslYn = if (request.isSecure) "Y" else "N"
        var failReason = ""
//        val tbUserInfo = userInfoService!!.getUserInfo(request.getParameter("username"))
        if (exception is AuthenticationServiceException) {
            failReason = "존재하지 않는 사용자입니다."
            request.setAttribute("loginFailMsg", failReason)
        } else if (exception is BadCredentialsException) {
            failReason = "아이디 또는 비밀번호가 틀립니다."
            request.setAttribute("loginFailMsg", failReason)
        } else if (exception is LockedException) {
            failReason = "잠긴 계정입니다.."
            request.setAttribute("loginFailMsg", failReason)
        } else if (exception is DisabledException) {
            failReason = "비활성화된 계정입니다.."
            request.setAttribute("loginFailMsg", failReason)
        } else if (exception is AccountExpiredException) {
            failReason = "만료된 계정입니다.."
            request.setAttribute("loginFailMsg", failReason)
        } else if (exception is CredentialsExpiredException) {
            failReason = "비밀번호가 만료되었습니다."
            request.setAttribute("loginFailMsg", failReason)
        }
//        if (tbUserInfo != null) {
//            if (userInfoService.failCnt(request.getParameter("username"))) {
//                failReason = "로그인 실패 횟수 초과(5회) 관리자에게 문의하세요."
//                request.setAttribute("loginFailMsg", failReason)
//            }
//        }
        println(failReason + "실패 원인")

        request.getRequestDispatcher("/loginView").forward(request, response)

//        super.onAuthenticationFailure(request,response,exception);
    }
}
