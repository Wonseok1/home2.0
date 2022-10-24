package com.itzon.home.config

import com.itzon.home.common.handler.CustomLoginFailureHandler
import com.itzon.home.common.handler.CustomLoginSuccessHandler
import com.itzon.home.common.service.CustomUserDetailService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.AuthenticationFailureHandler
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import java.lang.Exception

@Configuration
@EnableWebSecurity
class SecurityConfig (
){

    private val customUserDetailsService : CustomUserDetailService ?= null

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun authenticationSuccessHandler(): AuthenticationSuccessHandler {
        return CustomLoginSuccessHandler()
    }

    @Bean
    fun authenticationFailureHandler(): AuthenticationFailureHandler {
        return CustomLoginFailureHandler()
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeHttpRequests()
//            .antMatchers("/**").permitAll()
            .antMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/signup").permitAll()
            .antMatchers("/api/common/signup/check","/api/common/signup", "/login").permitAll()
            .antMatchers("/","/company/**").permitAll()
            .anyRequest().authenticated()

            .and()
            .formLogin()
            .loginPage("/loginView")
            .loginProcessingUrl("/login")
            .successHandler(authenticationSuccessHandler())
            .failureHandler(authenticationFailureHandler())
            .defaultSuccessUrl("/")
//            .successForwardUrl("/")
            .permitAll()

            .and()
            .logout()
            .deleteCookies()
            .invalidateHttpSession(true)
            .logoutUrl("/logoutProcess")
            .logoutSuccessUrl("/loginView")

            .and()
            .csrf().disable()

        return http.build()
    }


    @Throws(Exception::class)
    fun configureAuthentication(authenticationManagerBuilder: AuthenticationManagerBuilder) {
        authenticationManagerBuilder
            .userDetailsService(this.customUserDetailsService)
            .passwordEncoder(passwordEncoder())
    }
    @Bean
    fun webSecurityCustomizer(): WebSecurityCustomizer {
        return WebSecurityCustomizer { web: WebSecurity ->
            web.ignoring().antMatchers("/ws-stomp/**")
//            web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/signup")
        }
    }

}
