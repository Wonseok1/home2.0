package com.itzon.home.domain.table

import org.jetbrains.exposed.sql.Table

object TFileInfo : Table(name = "t_file_info"){
    val filePk =  integer("file_pk").autoIncrement()
    override val primaryKey = PrimaryKey(filePk, name= "t_my_page_set")

    val filePath              = varchar("file_path", 100)
    val fileNm              = varchar("file_nm", 100)
}