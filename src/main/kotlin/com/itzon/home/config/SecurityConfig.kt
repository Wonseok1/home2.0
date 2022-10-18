package com.itzon.home.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import java.lang.Exception

@Configuration
@EnableWebSecurity
class SecurityConfig (
){
//    private val customUserDetailsService : CustomUserDetailService?= null

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeHttpRequests()
//            .antMatchers("/**").permitAll()
            .antMatchers("/", "/file/**","/getPage/file/**").permitAll()
            .antMatchers("/company", "/intro/comp/history", "/directions", "/business", "/solution", "/job", "/api/intro/comp/**",  "/consulting", "/noticeQnA" ,"/noticeNotice","/projHistoryView", "/web/notice/noticeNotice/**","/web/notice/noticeQnA/**","/web/company/projHistory/**","/api/system/comp/**", "/web/company/projHistory/**","/fileDownload2**").permitAll()
            .antMatchers("/api/common/signup/check","/api/common/signup", "/login", "/","/js/**","/css/**","/lib/**").permitAll()
            .anyRequest().authenticated()

            .and()
            .formLogin()
            .loginPage("/loginView")
            .loginProcessingUrl("/loginProcess")
            .defaultSuccessUrl("/system/user/user")
            .permitAll()

            .and()
            .logout()
            .deleteCookies()
            .invalidateHttpSession(true)
            .logoutUrl("/logout")
            .logoutSuccessUrl("/")

            .and()
            .csrf().disable()

        return http.build()
    }


//    @Throws(Exception::class)
//    fun configureAuthentication(authenticationManagerBuilder: AuthenticationManagerBuilder) {
//        authenticationManagerBuilder
//            .userDetailsService(this.customUserDetailsService)
//            .passwordEncoder(passwordEncoder())
//    }
    @Bean
    fun webSecurityCustomizer(): WebSecurityCustomizer {
        return WebSecurityCustomizer { web: WebSecurity ->
            web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/signup","/login")
        }
    }

}
