package com.itzon.home.common.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding


@ConstructorBinding
@ConfigurationProperties("itzon.book")
class BookProperties (
    val defaultPath : String,
        ){

}