package com.itzon.home.common.controller.index

import com.itzon.home.common.service.MenuService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Controller
class CommonIndexController (
    private val menuService: MenuService
){
    @GetMapping("/")
    fun getMainFrame(): String {
        return "views/main/main"
    }

    @GetMapping("/login")
    fun getMainFrame2(): String {
        return "views/main/main"
    }

    @GetMapping("/loginView")
    fun getLoginPage(model: Model, request : HttpServletRequest, response: HttpServletResponse): String {
        model.addAttribute("exception",request.getAttribute("loginFailMsg"));
        return "views/login/login"
    }

    @PostMapping("/loginView")
    fun getLoginPagePost(model: Model, request : HttpServletRequest, response: HttpServletResponse): String {
        model.addAttribute("exception",request.getAttribute("loginFailMsg"));
        return "views/login/login"
    }

    @GetMapping("/signup")
    fun getSignUpPage(): String {
        return "views/signup/signup"
    }
    @GetMapping("/getPage/{path1}/{pageId}")
    fun getPage1Depth(@PathVariable path1 : String, @PathVariable pageId : String, model: Model) : String {
        model["menu"] = menuService.findByPageId(pageId)
        return "views/"+path1+"/"+pageId
    }
    @GetMapping("/getPage/{path1}/{path2}/{pageId}")
    fun getPage2Depth(@PathVariable path1 : String, @PathVariable path2 : String, @PathVariable pageId : String, model: Model) : String {
        model["menu"] = menuService.findByPageId(pageId)
        return "views/"+path1+"/"+path2+"/"+pageId
    }
    @GetMapping("/getPage/{path1}/{path2}/{path3}/{pageId}")
    fun getPage3Depth(@PathVariable path1 : String, @PathVariable path2 : String, @PathVariable path3 : String, @PathVariable pageId : String, model: Model) : String {
        model["menu"] = menuService.findByPageId(pageId)
        return "views/"+path1+"/"+path2+"/"+path3+"/"+pageId

    }
    @GetMapping("/getPage/{path1}/{path2}/{path3}/{path4}/{pageId}")
    fun getPage4Depth(@PathVariable path1 : String, @PathVariable path2 : String, @PathVariable path3 : String, @PathVariable path4 : String, @PathVariable pageId : String, model: Model) : String {
        model["menu"] = menuService.findByPageId(pageId)
        return "views/"+path1+"/"+path2+"/"+path3+"/"+path4+"/"+pageId
    }

}