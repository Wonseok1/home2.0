package com.itzon.home.domain.table

import com.itzon.home.domain.table.TAuthGridSet.autoIncrement
import com.itzon.home.domain.table.TCommonCdDetail.default
import org.jetbrains.exposed.sql.Table

object TBookInfo : Table(name = "t_book_info") {
    val bookPk = integer("book_pk").autoIncrement()
    override val primaryKey     = PrimaryKey(bookPk, name = "book_pk")
    val bookNm = varchar("book_nm", 100)
    val bookAuthor = varchar("book_author", 100)
    val bookPath = varchar("book_path", 100)
    val bookFileNm = varchar("book_file_nm", 100)
    val bookLastPage = integer("book_last_page")
    val useYn                   = bool("use_yn").default(true)
    val ordNo                   = integer("ord_no").default(0)

}