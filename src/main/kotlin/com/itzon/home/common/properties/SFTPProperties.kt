package com.itzon.home.common.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("itzon.sftp")
class SFTPProperties (
    val url: String,
    val port: String,
    val id: String,
    val password: String,
        ){
}