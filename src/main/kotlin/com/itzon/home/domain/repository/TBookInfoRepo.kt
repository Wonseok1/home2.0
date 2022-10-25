package com.itzon.home.domain.repository

import com.itzon.home.domain.table.TAuthOrgSet
import com.itzon.home.domain.table.TBookInfo
import com.itzon.home.domain.table.rowToDto
import org.jetbrains.exposed.sql.ResultRow
import org.springframework.stereotype.Repository


@Repository
class TBookInfoRepo {
    
}
private fun ResultRow.toDto() = TBookInfo.rowToDto(this)