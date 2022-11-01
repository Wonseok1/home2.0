package com.itzon.home.web.book.service

import com.itzon.home.domain.repository.TBookInfoRepo
import com.itzon.home.domain.repository.TBookPageSetRepo
import com.itzon.home.domain.table.TBookInfoDto
import com.itzon.home.domain.table.TBookPageSetDto
import com.itzon.home.web.book.dto.BookPageSetSaveRequestDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class BookService (
    private val tBookInfoRepo: TBookInfoRepo,
    private val tBookPageSetRepo: TBookPageSetRepo,
        ){
    fun selectByUseYn(useYn : Boolean)  :List<TBookInfoDto>{
        return tBookInfoRepo.selectByUseYn(useYn)
    }

    fun selectById(bookPk : Int) : TBookInfoDto{
        return tBookInfoRepo.selectById(bookPk)
    }

    fun selectPageSetByBookPkAndUserId(bookPk: Int, userId : String) :List<TBookPageSetDto>{
        return tBookPageSetRepo.selectUserPageSet(userId, bookPk)

    }
    fun selectBookByBookPk(bookPk: Int) : TBookInfoDto {
        return tBookInfoRepo.selectById(bookPk)
    }
    fun savePageSet(bookPageSetSaveRequestDto: BookPageSetSaveRequestDto) {
        if (tBookPageSetRepo.isExist(bookPageSetSaveRequestDto)) {
            tBookPageSetRepo.update(bookPageSetSaveRequestDto)
        }else{
            tBookPageSetRepo.insert(bookPageSetSaveRequestDto)
        }
    }
}