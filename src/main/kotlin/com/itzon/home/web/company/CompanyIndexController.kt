package com.itzon.home.web.company

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class CompanyIndexController {

    @GetMapping("/company/company/company")
    fun getCompany() : String {
        return "views/company/company/company"
    }
    @GetMapping("/company/history/history")
    fun getHistory() : String {
        return "views/company/history/history"
    }
    @GetMapping("/company/project/projectView")
    fun getProjectView() : String {
        return "views/company/project/projectView"
    }
    @GetMapping("/company/direction/direction")
    fun getDirection() : String {
        return "views/company/direction/direction"
    }
    @GetMapping("/company/business/business")
    fun getBusiness() : String {
        return "views/company/business/business"
    }
    @GetMapping("/company/solution/solution")
    fun getSolution() : String {
        return "views/company/solution/solution"
    }
    @GetMapping("/company/consulting/consulting")
    fun getConsulting() : String {
        return "views/company/consulting/consulting"
    }
    @GetMapping("/company/job/job")
    fun getJob() : String {
        return "views/company/job/job"
    }
    @GetMapping("/company/notice/notice")
    fun getNotice() : String {
        return "views/company/notice/notice"
    }
    @GetMapping("/company/notice/noticeManage")
    fun getNoticeManage() : String {
        return "views/company/notice/noticeManage"
    }



//    @GetMapping("/system/main/main/company/notice/noticeManage")
//    fun getNoticeManage() : String {
//        return "views/company/notice/noticeManage"
//    }
    @GetMapping("/company/notice/qna")
    fun getQna() : String {
        return "views/company/notice/qna"
    }
}