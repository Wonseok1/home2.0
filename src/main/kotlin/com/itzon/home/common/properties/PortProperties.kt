package com.itzon.home.common.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding


@ConstructorBinding
@ConfigurationProperties("port")
class PortProperties (
    val http : Int,
    val https : Int,
        ){
}