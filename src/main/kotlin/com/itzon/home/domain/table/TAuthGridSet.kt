package com.itzon.home.domain.table

import com.itzon.home.web.system.auth.grid.dto.SelectGridAuthDto
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table

object TAuthGridSet : Table(name = "t_auth_grid_set") {

    val authGridPk = integer("auth_grid_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(authGridPk, name = "auth_grid_pk")

    val authId = varchar("auth_id", 100)
    val gridId = varchar("grid_id", 100)
    val accessAuthYn = bool("access_auth_yn").default(true)
    val writeAuthYn = bool("write_auth_yn").default(true)

}

data class TAuthGridSetDto(
    val authGridPk      : Int,
    val authId          : String,
    val gridId          : String,
    val accessAuthYn    : Boolean,
    val writeAuthYn     : Boolean
){

}


fun TAuthGridSet.rowToDto(row: ResultRow) : TAuthGridSetDto {
    return TAuthGridSetDto(
        authGridPk      = row[authGridPk],
        authId          = row[authId],
        gridId          = row[gridId],
        accessAuthYn    = row[accessAuthYn],
        writeAuthYn     = row[writeAuthYn],
    )
}


fun TAuthGridSet.rowToDtoSelect(row: ResultRow) : SelectGridAuthDto {
    return SelectGridAuthDto(
        authGridPk      = row[authGridPk],
        authId          = row[authId],
        gridId          = row[TGridInfo.gridId],
        gridNm          = row[TGridInfo.gridNm],
        accessAuthYn    = row[accessAuthYn],
        writeAuthYn     = row[writeAuthYn],
    )
}
