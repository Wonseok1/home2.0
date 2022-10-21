package com.itzon.homepage.web.notice.notice.controller

//import com.itzon.homepage.domain.TbNotice
import com.itzon.home.common.constant.REST_COMMON_NOTICE
import com.itzon.home.domain.table.TNoticeInfo
import com.itzon.home.domain.table.TNoticeInfoDto
import com.itzon.homepage.web.notice.notice.service.NoticeService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.ModelAndView

import org.springframework.web.multipart.MultipartHttpServletRequest

import javax.servlet.http.HttpServletResponse

import javax.servlet.http.HttpServletRequest

import org.springframework.web.bind.annotation.RequestMethod

import org.springframework.web.bind.annotation.RequestMapping
import java.lang.Exception
import javax.servlet.http.HttpSession
import javax.transaction.Transactional


@RestController
@Transactional
//@RequestMapping("$REST_STAT_CONSULT_USER")
@RequestMapping("$REST_COMMON_NOTICE")
class NoticeApiController(
    private val noticeService: NoticeService,
)
{
//    @GetMapping("/web/notice/noticeNotice/findFileInfo/{noticeNo}")
//    fun findFileInfo(@PathVariable noticeNo : Long) : List<Map<String,Any>>? {
//        println("testtest")
//        println(noticeNo.toString().toLong())
//        return noticeService.findFileInfo(noticeNo)
////        return null
//    }
//
//    //공지제목으로 조회
//    @GetMapping("/web/notice/noticeNotice/findByTitle/{searchNoticeTitle}")
//    fun findByTitle(@PathVariable searchNoticeTitle : String) : List<TNoticeInfoDto> {
//        println("controllerSearchNoticeTitle")
//        println(searchNoticeTitle)
//        return noticeService.findByTitle(searchNoticeTitle)
//    }
//
//    //공지내용으로 조회
//    @GetMapping("/web/notice/noticeNotice/findByContent/{searchNoticeContent}")
//    fun findByContent(@PathVariable searchNoticeContent : String) : List<TNoticeInfoDto> {
//        println("controllerSearchNoticeContent")
//        println(searchNoticeContent)
//        return noticeService.findByContent(searchNoticeContent)
//    }
//
//    //공지제목+공지내용+작성자로 검색
//
//    @GetMapping("/web/notice/noticeNotice/findAllByTitleOrContentOrCreId/{searchNoticeTitleOrContentOrCreId}")
//    fun findByCreId(@PathVariable searchNoticeTitleOrContentOrCreId : String) : List<TNoticeInfoDto> {
//        println("controllerSearchNoticeTitleOrContentOrCreId")
//        println(searchNoticeTitleOrContentOrCreId)
//        return noticeService.findByCreId(searchNoticeTitleOrContentOrCreId)
//    }

    //전체조회
    @GetMapping("/findUser")
    fun findAll() : List<TNoticeInfoDto> {
        println("여까지는 넘어오니 ")
        return noticeService.findAll()
    }

////    저장
//    @PostMapping("/web/notice/noticeNotice/saveNotice")
//    fun saveNotice(@RequestBody map : Map<String,Any> ) :String {
//        return noticeService.saveNotice(map)
//    }
//
//    //삭제
//    @DeleteMapping("/web/notice/noticeNotice/deleteNotice")
//    fun deleteNotice(@RequestBody list : List<Map<String,Any>> ) :String {
//        return noticeService.deleteNotice(list)
//    }
//
//    @Transactional
//    @ResponseBody
//    @PostMapping("/web/notice/noticeNotice/fileUpload", "multipart/form-data","application/json;")
//    fun saveNoticeFile(@RequestParam("attach_file") multipartFile:List<MultipartFile>,  response:HttpServletResponse, request:MultipartHttpServletRequest): HashMap<String, Any> {
//
//        return noticeService.saveNoticeFile(multipartFile,response, request)
//    }

@RequestMapping("/fileDownload2")
fun fileDownload2(request:HttpServletRequest , response:HttpServletResponse ) {

 return noticeService.fileDownload2(request,response)

}


    @Controller("mainController") //애너테이션을 이용해 빈으로 자동 변환
    @RequestMapping(value = ["/test"]) //클래스 단계의 url 맵핑
    class MainController {
        @RequestMapping(value = ["/main1.do"], method = [RequestMethod.GET]) //메서드 단계의 url 맵핑
        @Throws(Exception::class)
        fun main1(request: HttpServletRequest?, response: HttpServletResponse?): ModelAndView {
            val mv = ModelAndView()
            mv.addObject("msg", "main1")
            mv.viewName = "main"
            return mv
        }

        @RequestMapping(value = ["/main2.do"], method = [RequestMethod.POST])
        @Throws(Exception::class)
        fun main2(
            request: HttpServletRequest?,
            response: HttpServletResponse?,
            mRequest: MultipartHttpServletRequest?
        ): ModelAndView {
            val mv = ModelAndView()
            mv.addObject("msg", "main2")
            mv.viewName = "main"
            return mv
        }
    }
}