package com.itzon.home.domain.table

import com.itzon.home.domain.table.TAuthGridSet.autoIncrement
import com.itzon.home.domain.table.TCommonCdDetail.default
import org.jetbrains.exposed.sql.ResultRow
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

data class TBookInfoDto(
    val bookPk : Int,
    val bookNm : String,
    val bookAuthor : String,
    val bookPath : String,
    val bookFileNm : String,
    val bookLastPage : Int,
    val useYn : Boolean,
    val ordNo : Int,
){

}

fun TBookInfo.rowToDto(row: ResultRow): TBookInfoDto {
    return TBookInfoDto(
        bookPk          = row[bookPk      ],
        bookNm          = row[bookNm      ],
        bookAuthor      = row[bookAuthor  ],
        bookPath        = row[bookPath    ],
        bookFileNm      = row[bookFileNm  ],
        bookLastPage    = row[bookLastPage],
        useYn           = row[useYn       ],
        ordNo           = row[ordNo       ],
    )

}