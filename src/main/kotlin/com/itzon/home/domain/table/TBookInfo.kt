package com.itzon.home.domain.table

import com.itzon.home.domain.table.TAuthGridSet.autoIncrement
import org.jetbrains.exposed.sql.Table

object TBookInfo : Table(name = "t_book_info") {
    val bookPk = integer("book_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(bookPk, name = "book_pk")

}