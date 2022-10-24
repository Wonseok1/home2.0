package com.itzon.home.web.system.auth.grid.dto

class SystemAuthGridDto(
) {

}

data class SelectGridAuthDto(
    val authGridPk      : Int?,
    val authId          : String?,
    val gridId          : String?,
    val gridNm          : String?,
    val accessAuthYn    : Boolean?,
    val writeAuthYn     : Boolean?,

    ){

}

