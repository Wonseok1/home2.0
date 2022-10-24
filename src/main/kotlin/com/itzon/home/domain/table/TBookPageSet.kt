package com.itzon.home.domain.table

import com.itzon.home.domain.table.TBookInfo.autoIncrement
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime

object TBookPageSet : Table(name = "t_book_page_set") {
    val bookPageSetPk = integer("book_page_set_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(bookPageSetPk, name = "book_page_set_pk")
    val bookPk = integer("book_pk")
    val pageNum = integer("page_num")
    val userId = varchar("user_id", 100)
    val lastDttm = datetime("last_dttm").default(LocalDateTime.now())
}