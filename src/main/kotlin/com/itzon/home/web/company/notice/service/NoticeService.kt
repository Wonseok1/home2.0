package com.itzon.home.web.company.notice.service

import com.itzon.home.domain.repository.TNoticeInfoRepo
import com.itzon.home.domain.table.TNoticeInfoDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.RequestMapping
import java.io.File
import java.io.FileInputStream
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Service
@Transactional
class NoticeService(
 private val tNoticeInfoRepo: TNoticeInfoRepo,
// private val tbFileInfoRepository: TFileInfoRepository, //일단주석
) {

    fun findByTitle(searchNoticeTitle: String): List<TNoticeInfoDto> {

        println("serviceSearchNoticeTitle")
        println(searchNoticeTitle)

        return tNoticeInfoRepo.findByTitle(searchNoticeTitle)
    }

    fun findByContent(searchNoticeContent: String): List<TNoticeInfoDto> {
        return tNoticeInfoRepo.findByContent(searchNoticeContent)
    }


    fun findByCreId(searchNoticeCreId: String): List<TNoticeInfoDto> {

        return tNoticeInfoRepo.findByCreId(searchNoticeCreId)
    }

    fun findByNoticeSearchVal(noticeSearchVal: String): List<TNoticeInfoDto> {

        return tNoticeInfoRepo.findByNoticeSearchVal(noticeSearchVal)
    }


    fun findAll(): List<TNoticeInfoDto> {

        return tNoticeInfoRepo.findAll()

    }

    //----------------------------------------------요기까지함  -------------------




    @Transactional
    fun saveNotice(noticeNo:Int,noticeTitle: String,noticeContent: String,noticeCreId: String, noticeFileNm:String? ) {

        val path = "/static/File/"
//        println("write.jsp - realPath : $path")
//
//        println(tNoticeInfoList)
        println("TEST!@")
        println("조회")
        var result: String = ""

//            ("noticeNo" in map) : map에 해당키 존재하는지여부체크
            if(noticeNo!=0 || noticeNo>0) {
                println("ReReReTest! ")
                println(noticeNo)
                tNoticeInfoRepo.update(
                    TNoticeInfoDto(

                        noticeNo = noticeNo,
                        noticeTitle = noticeTitle,
                        noticeContent = noticeContent
//                        , noticeStartDt = map["noticeStartDt"] as Int
//                        , noticeEndDt = map["noticeEndDt"] as Int
                        , noticeCreId = noticeCreId,
                        noticeFileNm = noticeFileNm
//                    , ordNo = tNoticeInfoList[0].ordNo
//                        , useYn = map["useYn"].toString()
                    )
                )
//                val tbNotice: TNoticeInfo =
//                    tNoticeInfoRepo.findByNoticeNo((map["noticeNo"].toString().toInt()).toLong())
//                tbNotice.update(map)

                result = "update"
                println("update")
                println("update")
            }else {
                tNoticeInfoRepo.insert(
                    TNoticeInfoDto(

                        noticeNo = 0,
                        noticeTitle = noticeTitle, noticeContent = noticeContent
//                        , noticeStartDt = map["noticeStartDt"] as Int
//                        , noticeEndDt = map["noticeEndDt"] as Int
                        , noticeCreId = noticeCreId, noticeFileNm = noticeFileNm
//                    , ordNo = tNoticeInfoList[0].ordNo
//                        , useYn = map["useYn"].toString()
                    )
                )
            }
//        TNoticeInfo.batchInsert(tNoticeInfoList){
//            this[TNoticeInfo.noticeTitle]=it.noticeTitle
//            this[TNoticeInfo.noticeContent]=it.noticeContent.toString()
//            this[TNoticeInfo.noticeCreId]=it.noticeCreId.toString()
//            this[TNoticeInfo.noticeFileNm]=it.noticeFileNm
//        }



                println("save")
                result = "save"
//            }
//        return result
    }//saveNotice() END


    fun deleteNotice(noticeNo: Int) {

    return tNoticeInfoRepo.delete(noticeNo)
    }//deleteNotice() END

//
//    @Transactional
//    @ResponseBody
//    fun saveNoticeFile(multipartFile:List<MultipartFile>, response: HttpServletResponse, request: MultipartHttpServletRequest): HashMap<String, Any> {
//        val title = request.getParameter("noticeTitle")
//        var creId =request.getParameter("noticeCreId")
//        var content =request.getParameter("noticeContent")
//
//        println("title:")
//        println(title)
//        println("creId")
//        println(creId)
//        println("content")
//        println(content)
//
//        var result=  HashMap<String, Any>()
//
//        val mfList = request.getFiles("attach_file")
//        println("uploadFileCnt:" + mfList.size)
//
//
//        var fileList = ArrayList<FileInfo>()
//        for(mf:MultipartFile in mfList){
//            val name: String = mf.name //필드 이름 얻기
//            val fileName: String? = mf.originalFilename //파일명 얻기
//            val contentType: String? = mf.contentType //컨텐츠 타입 얻기
//            val size: Long? = mf.size //파일크기 얻기
//
//            println("---------name---------")
//            println(name)
//            println("---------contentType---------")
//            println(contentType)
//            println("---------fileName---------")
//            println(fileName)
//            println("---------size---------")
//            println(size)
//
//            var uploadedFileName: String = (System.currentTimeMillis().toString()+ UUID.randomUUID().toString() + fileName!!.substring(fileName.lastIndexOf(".")))
//            var uploadPath:String =  request.session.servletContext.getRealPath("upload");
//
//            println("---------uploadPath---------")
//            println(uploadPath)
//            println("---------uploadedFileName---------")
//            println(uploadedFileName)
//
//
//            var f = File(uploadPath+"/"+uploadedFileName)
//            println("-------------f(uploadPath+/+uploadedFileName-----------")
//            println(f)
//
//            //사용자 컴퓨터에 해당하는 파일 경로 없을때 폴더 생성
//            f.getParentFile().mkdirs();
//
//            //파일 업로드
//            if(mf.size.toInt()!= 0) {
//                mf.transferTo(f)
//            }
//
//            val downlink = ("fileDownload2?of=" + URLEncoder.encode(fileName, "UTF-8")
//                    + "&f=" + URLEncoder.encode(uploadedFileName, "UTF-8")
//                    + "&path="+ URLEncoder.encode(uploadPath,"UTF-8"))
//            println("---------downlink---------")
//            println(downlink)
//            val seqMap : Map<String,Any> = tNoticeInfoRepo.getMaxSeq();
//            var maxSeq : Long = 0
//            if(seqMap.isNotEmpty()){
//                maxSeq = (seqMap["noticeNo"].toString().toLong())
//            }else{
//                maxSeq = 1
//            }
//            println()
//            var file=  tbFileInfoRepository.save(
//                FileInfo(
//                    name = name
//                    , fileName =fileName
//                    , uploadedFileName = uploadedFileName
//                    , fileSize =  size
//                    , contentType =  contentType
//                    , downlink = downlink
//                    , uploadPath = uploadPath
//                    ,noOfNotice=maxSeq
//                )
//            )
//
//            println("---------file--------")
//            println(file)
//            fileList.add(file)
//        }
//
//        println(mfList)
//
//        result.put("title",title);
//        result.put("creId",creId);
//        result.put("file",fileList);
//        result.put("content",content);
//        return result
//    }


    @RequestMapping("/fileDownload2")
    fun fileDownload2(request:HttpServletRequest , response:HttpServletResponse ) {

        //===전달 받은 정보를 가지고 파일객체 생성(S)===//
        var f:String  = request.getParameter("f"); //저장된 파일이름
        var of:String  = request.getParameter("of"); //원래 파일이름
        var path:String  = request.getParameter("path"); //파일이 저장된 경로
        of =  String(of.toByteArray(Charsets.UTF_8),Charsets.ISO_8859_1);
//        of =  String(of.toByteArray(Charsets.ISO_8859_1),Charsets.UTF_8);//얘가원래꺼 너도 쫌따봐서살려줄게 ㄱㄷㄱㄷ
        //서버설정(server.xml)에 따로 인코딩을 지정하지 않았기 때문에 get방식으로 받은 값에 대해 인코딩 변환

        println("-----controller-f----")
        println(f)
        println("----controller-of----")
        println(of)
        //웹사이트 루트디렉토리의 실제 디스크상의 경로 알아내기.
//        var path:String  = request.servletContext.getRealPath("upload");//일닫ㄴ잠깐죽어있어봐바 251번째줄 path 테스트하고 살려주고싶음 살려줄게 //테스트성공해버렸음 넌 살아나지못해
//        var path:String  =  request.session.servletContext.getRealPath("upload");
//        val uploadPath =  request.session.servletContext.getRealPath("upload");
        //String path = request.getSession().getServletContext().getRealPath("upload");
        //String path = WebUtils.getRealPath(request.getServletContext(), "upload");
        //String path = "D:\\upload\\";
        println("path----------")
        println(path)
        var fullPath:String  = path+"/"+f
//    var fullPath:String  = "C:\\Users\\ITZON\\AppData\\Local\\Temp\\tomcat-docbase.6001.278853139242136980\\upload\\1660030602243afb1e233-a4f8-466c-acf5-04421578771b.png"


        println("path:")
        println(path)
        println("fullPath")
        println(fullPath)
        var downloadFile:File  = File(fullPath);
        println("downloadFile")
        println(downloadFile)
//    var downloadFile  = File("C:\Users\ITZON\AppData\Local\Temp\tomcat-docbase.6001.12625642280851090215\upload\1660026743274df1f9a28-6062-451d-b811-8a7fe7fd078a.png")

        //===전달 받은 정보를 가지고 파일객체 생성(E)===//


        //파일 다운로드를 위해 컨테츠 타입을 application/download 설정
        response.contentType = "application/download; charset=utf-8";

        //파일 사이즈 지정
//        response.setContentLength(downloadFile.length().toLong().toInt())
        response.setContentLength(downloadFile.length().toInt())
        //다운로드 창을 띄우기 위한 헤더 조작
        response.contentType = "application/octet-stream; charset=utf-8";
//        response.setHeader("Content-Disposition", "attachment;filename=$of")  //잠깐죽어있어봐바
        response.setHeader(
            "Content-Disposition", "attachment;filename="
                    + String(of.toByteArray(), Charsets.ISO_8859_1)
        )

        response.setHeader("Content-Transfer-Encoding","binary");
        /*
         * Content-disposition 속성
         * 1) "Content-disposition: attachment" 브라우저 인식 파일확장자를 포함하여 모든 확장자의 파일들에 대해
         *                          , 다운로드시 무조건 "파일 다운로드" 대화상자가 뜨도록 하는 헤더속성이다
         * 2) "Content-disposition: inline" 브라우저 인식 파일확장자를 가진 파일들에 대해서는
         *                                  웹브라우저 상에서 바로 파일을 열고, 그외의 파일들에 대해서는
         *                                  "파일 다운로드" 대화상자가 뜨도록 하는 헤더속성이다.
         */

        var fin = FileInputStream(downloadFile);
        var sout = response.outputStream

        var buf = ByteArray(1024)
        var size = -1
        do{
            size=fin.read(buf, 0, buf.size)
            sout.write(buf,0,size)
        } while(size!=-1)



        fin.close();
        sout.close();

    }
//
//    fun findFileInfo(noticeNo: Long): List<Map<String, Any>>? {
//
//        return  tNoticeInfoRepo.findFileInfo(noticeNo)
//    }

//}

}



