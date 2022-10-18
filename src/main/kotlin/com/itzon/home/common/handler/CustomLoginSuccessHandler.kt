package com.itzon.home.common.handler

import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler

class CustomLoginSuccessHandler (): SavedRequestAwareAuthenticationSuccessHandler() {
    override fun setDefaultTargetUrl(defaultTargetUrl: String?) {
        super.setDefaultTargetUrl(defaultTargetUrl)
    }
}