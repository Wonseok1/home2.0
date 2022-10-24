package com.itzon.home.common.annotation

@Target(AnnotationTarget.VALUE_PARAMETER)
@kotlin.annotation.Retention(AnnotationRetention.RUNTIME)
//@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : loginUserDto")
annotation class LoginUser()