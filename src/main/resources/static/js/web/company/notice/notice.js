
var noticeNotice = {
    init() {
// alert("알렀뜨니")//잘뜨는군
        noticeNotice.inputDisable()
        var NoticeNoticeGrid = document.querySelector('#NoticeNoticeGrid');
        new agGrid.Grid(NoticeNoticeGrid, noticeNoticeGridOptions);


        // 공지사항

        //신규버튼이벤트
        $("#btnNewNotice").on("click", function () {
            // $("#result").hide()
            $("#formNotice")[0].reset()
            $("#noticeFileList").children().remove()
            $("#result").children().remove()
            $('.file-list').children().remove()
            noticeNotice.inputAllow();
        });


        //조회버튼이벤트
        $("#btnSearchNotice").on("click", function () {

            if($("#noticeSearchCondition").val()==""){
                noticeNotice.findAll();
            }
            if($("#searchSelectBox").val()=='title'){
                noticeNotice.findAllByTitle();
            }
            if($("#searchSelectBox").val()=='content'){
                noticeNotice.findAllByContent();
            }
            if($("#searchSelectBox").val()=='all' && $("#noticeSearchCondition").val()!=""){
                noticeNotice.findAllByTitleOrContentOr();
            }
        });


        // 첨부파일
        $('#btnSaveNotice').on("click",function (){
            var chk = confirm("저장하시겠습니까?");

            if (chk == true){
                if($("#noticeTitle").val()==""){
                    alert("제목은 필수 입력 항목입니다.");
                    return false;
                } else if($("#noticeContent").val()=="") {
                    alert("내용은 필수 입력 항목입니다.");
                    return false;
                } else {
                    if( $("#noticeNo").val()!=0){
                        noticeNotice.update();
                    }else {
                        noticeNotice.save();
                    }
                }
            }
            submitForm();
        })

        //삭제버튼이벤트
        $("#btnDeleteNotice").on("click", function () {
            if (noticeNoticeGridOptions.api.getSelectedRows().length > 0) {
                var chk = confirm("삭제하시겠습니까?");
                if (chk == true) {
                    noticeNotice.delete();
                }
            } else {
                alert("삭제할 대상을 선택해주세요");
            }
        });



    },  //init() End



    //input비활성화
    inputDisable : function (){
        $("#noticeTitle").prop('disabled', true);
        $("#noticeCreId").prop('disabled', true);
        $("#noticeStartDt").prop('disabled', true);
        $("#noticeEndDt").prop('disabled', true);
        $("#noticeContent").prop('disabled', true);
    },

    //input활성화
    inputAllow : function (){
        $("#noticeTitle").prop('disabled', false);
        $("#noticeCreId").prop('disabled', false);
        $("#noticeStartDt").prop('disabled', false);
        $("#noticeEndDt").prop('disabled', false);
        $("#noticeContent").prop('disabled', false);
    },


    // //전체검색
    // findAll : function () {
    //     alert("조회클릭함")
    //     agGrid.simpleHttpRequest({url: REST_COMMON_NOTICE_URL}).then(function(data) {
    //         noticeNoticeGridOptions.api.setRowData(data);
    //     });
    // },


    //전체검색
    findAll : function () {
        alert("조회클릭함")
        $.ajax({
            type: 'GET',
            url: REST_COMMON_NOTICE_URL + "/findUser",
            contentType: 'application/json; charset=utf-8',
            // async : false
        }).done(function (data) {
            alert("data")
            alert(data)
            noticeNoticeGridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },





    //공지제목으로 검색
    findAllByTitle : function(){
        var searchNoticeTitle = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findByTitle/'+searchNoticeTitle}).then(function(data){
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지 내용으로 검색
    findAllByContent : function(){
        var searchNoticeContent = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findByContent/'+searchNoticeContent}).then(function(data) {
            console.log(data)
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //공지제목+공지내용+작성자로 검색
    findAllByTitleOrContentOrCreId : function(){
        var searchNoticeTitleOrContentOrCreId = $("#noticeSearchCondition").val();
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAllByTitleOrContentOrCreId/'+searchNoticeTitleOrContentOrCreId}).then(function(data) {
            console.log(data)
            noticeNoticeGridOptions.api.setRowData(data);
        });
    },

    //저장함수 ( noticeNo가 PK이자 자동증가값이라서 신규작성할 경우에는 formDatas에 넣으면 notNull인데 null드갔다 오류남
    //        근데또 formDatas에 안넣자니 수정할경우에는  PK인 noticeNo를 빼고 넘기면 신규로 인식해버림.. 그래서 걍
    //        save함수랑 update함수로 나눔)
    save(){
        var formDatas = {
            // noticeNo: $("#noticeNo").val(),
            noticeTitle: $("#noticeTitle").val(),
            noticeContent: $("#noticeContent").val(),
            noticeCreId: $("#noticeCreId").val(),
            noticeFileNm: $("#noticeFileNm").val(),

        }

        console.log("formDatas가몰까나")
        console.log(formDatas)
        console.log("formDatas.noticeContent가몰까나")
        console.log(formDatas.noticeContent)
        $.ajax({
            type:'POST',
            url:REST_COMMON_NOTICE,
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){
            if(data=="save"){
                console.log("-----------")
                console.log(formDatas)
                alert("공지사항이 신규등록되었습니다.")
                noticeNotice.findAll();
                noticeNoticeGridOptions.api.setRowData(null)
                $("#formNotice")[0].reset();
                $("#noticeFileList").children().remove()
                $("#result").children().remove()
                $('.file-list').children().remove()
            }
        });
    }, //save() END

    //수정함수
    update(){
        var formDatas = {
            noticeNo: $("#noticeNo").val(),
            noticeTitle: $("#noticeTitle").val(),
            noticeContent: $("#noticeContent").val(),
        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeNotice/saveNotice',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(formDatas)
        }).done(function(data){
            if(data=="update"){
                alert("구축사례 정보가 수정되었습니다.")
                noticeNotice.findAll();
                noticeNoticeGridOptions.api.setRowData(null)
                $("#formNotice")[0].reset();
                $("#noticeFileList").children().remove()
                $("#result").children().remove()
                $('.file-list').children().remove()
            }
        });
    }, //update() END


    //삭제함수
    delete(){
        var selectedRows = noticeNoticeGridOptions.api.getSelectedRows();
        $.ajax({
            type: 'DELETE',
            url : '/web/notice/noticeNotice/deleteNotice',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(selectedRows)
        }).done(function (){
            alert("삭제되었습니다.");
            noticeNotice.findAll();
            $("#formNotice")[0].reset();
            $("#noticeFileList").children().remove()
            $("#result").children().remove()
        }).fail(function (error){

        });


    }, //delete() END

    setData: function (data) {

        $("#creId").val(data.creId);
        $("#noticeNo").val(data.noticeNo);
        $("#noticeTitle").val(data.noticeTitle);
        $("#noticeContent").val(data.noticeContent);
        $("#noticeStartDt").val(data.noticeStartDt);
        $("#noticeEndDt").val(data.noticeEndDt);
    },
//전달받은 정보를 가지고 화면에 보기 좋게 출력
    output:function (data) {
        console.log(data.file)
        //업로드한 파일을 다운로드할수있도록 화면 구성
        if(data.file && data.file.length != 0){
            $("#result").append("파일:<br/>");
            $.each(data.file, function(index, item){
                //var link = "fileDownload2?f="+item.fileName+"&of="+item.uploadedFileName;
                $("#result").append("<a href='"+ item.downlink +"' download>"+item.fileName+"</a>");
                $("#result").append("<br/>");
            });
        }

        $('#multiform')[0].reset(); //폼 초기화(리셋);
        //$('#multiform').resetForm(); //(jQuery.Form 플러그인 메서드)
        //$('#multiform').clearForm(); //(jQuery.Form 플러그인 메서드)
        $('#multiform input:file').MultiFile('reset'); //멀티파일 초기화

        noticeNotice.inputAllow();
    }

} //noticeNotice END

var noticeNoticeGridOptions = {
    columnDefs: [
        {headerName: "공지번호", field: 'noticeNo', editable: false, width: 10,hide : true}
        , {headerName: "작성자", field: 'noticeCreId', editable: false, width: 100}
        , {headerName: "제목", field: 'noticeTitle', editable: false, width: 400}
        , {headerName: "내용", field: 'noticeContent', editable: false, width: 800}
        , {headerName: "등록일", field: 'creDt', editable: false, width: 140}
        , {headerName: "순번", field: 'ordNo', editable: false, width: 140}
    ],

    //가로스크롤바 비활성화
    suppressHorizontalScroll: true,

    //기본 컬럼 옵션 설정
    defaultColDef: {
        cellStyle: {textAlign: 'center'},
        filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        floatingFilter: false,                   //상단 필터 여부(항상 떠있는지)
        resizable: true,                        //크기 조절 가능 여부
        sortable: true,                         //정렬 가능 여부

    },
    //컬럼 타입별 옵션 설정
    columnTypes: {
        numberColumn: {width: 100, filter: 'agNumberColumnFilter'},
        nonEditableColumn: {editable: false},
        dateColumn: {
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                    var cellDate = new Date(cellValue);
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
            },
        },
    },
    rowSelection: 'single',
    rowMultiSelectWithClick: true,
    editType: 'fullRow',
    stopEditingWhenGridLosesFocus: true,
    onCellEditingStopped: function (event) {
    },
    onRowClicked: function (event) {
        if($("#noticeNo").val()!=noticeNoticeGridOptions.api.getSelectedRows()[0].noticeNo) {
            $("#result").show()
            $("#result").children().remove()
            $('.file-list').children().remove();
        }else {
            return false
        }
        noticeNotice.setData(event.data)
        $("#noticeNo").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeNo);
        $("#noticeCreId").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeCreId);
        $("#noticeStartDt").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeStartDt);
        $("#noticeEndDt").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeEndDt);
        $("#noticeTitle").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeTitle);
        $("#noticeContent").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeContent);
        // $("#result").val(noticeNoticeGridOptions.api.getSelectedRows()[0].noticeContent);

        var noticeNo = noticeNoticeGridOptions.api.getSelectedRows()[0].noticeNo
        console.log(noticeNo);
        $.ajax({
            type: 'GET',
            url : '/web/notice/noticeNotice/findFileInfo/'+noticeNo,
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(noticeNo)
        }).done(function (data){
            console.log("성공")
            console.log(data)

            console.log(data[0])
            console.log(data[0].upload_path)

            console.log("data[0].upload_path")
            console.log(data[0].upload_path)

            for(let i in data){
                console.log("i")
                console.log("data[0].upload_path")
                console.log(data[i].file_name)
                $("#result").append("<a href='"+ data[i].down_Link +"' download>"+data[i].file_name+"　　</a>");
                // $("#result").append("<br/>");
            }


        }).fail(function (error){

        });



    },
    onGridReady(event) {
        noticeNotice.findAll();
        event.api.sizeColumnsToFit();

    }
} // 그리드옵션 End

$(document).ready(function(){
    $("#uploadBtn").on("click", function (e){
        var formData = new FormData();

        var inputFile = $("input[name='file_test']");

        var files = inputFile[0].files;
        console.log(files);
        for(let i of files){
            formData.append("uploadFile",files[i]);
        }
        $.ajax({
            type:'POST',
            url:'/web/notice/noticeNotice/saveNoticeFile',
            enctype: 'multipart/form-data',
            processData:false,
            contentType:false,
            data: formData
        }).done(function(data){
            alert("공지사항이 신규등록되었습니다.")
            noticeNotice.findAll();
        });

    })
})



// 첨부파일 임시 (인터넷 참조)
/**
 * https://purecho.tistory.com/68
 * */
var fileNo = 0;
var filesArr = new Array();

/* 첨부파일 추가 */
function addFile(obj){
    var maxFileCnt = 3;   // 첨부파일 최대 개수 3개까지
    var attFileCnt = document.querySelectorAll('.filebox').length;    // 기존 추가된 첨부파일 개수
    var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
    var curFileCnt = obj.files.length;  // 현재 선택된 첨부파일 개수

    // 첨부파일 개수 확인
    if (curFileCnt > remainFileCnt) {
        alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
    } else {
        for (const file of obj.files) {
            // 첨부파일 검증
            if (validation(file)) {
                // 1. 파일 배열에 담기
                var reader = new FileReader();
                reader.onload = function () {
                    filesArr.push(file);
                };
                reader.readAsDataURL(file);

                //2.  목록 추가
                let htmlData = '';
                htmlData += '<div id="file' + fileNo + '" class="z-50 filebox ml-7 ">';
                htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ');"><i class="far fa-minus-square"></i></a>';
                htmlData += '   <p class="relative name" style="top: -20px; left: 20px;">' + file.name + '</p>';
                htmlData += '　　'+'</div>';
                $('.file-list').append(htmlData);
                fileNo++;
            } else {
                continue;
            }
        }
    }
    // 초기화
    document.querySelector("input[type=file]").value = "";
}

/* 첨부파일 검증 -fileTypes: 첨부허용할 첨부파일 확장자 */
function validation(obj){
    const fileTypes = ['application/pdf', 'image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif', 'application/haansofthwp', 'application/x-hwp','text/plain'];
    if (obj.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 제외되었습니다.");
        return false;
    } else if (obj.size > (100 * 1024 * 1024)) {
        alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
        return false;
    } else if (obj.name.lastIndexOf('.') == -1) {
        alert("확장자가 없는 파일은 제외되었습니다.");
        return false;
    } else if (!fileTypes.includes(obj.type)) {
        alert("첨부가 불가능한 파일은 제외되었습니다.");
        return false;
    } else {
        return true;
    }
}

/* 첨부파일 삭제 */
function deleteFile(num) {
    document.querySelector("#file" + num).remove();
    filesArr[num].is_delete = true;
}

/* 폼 전송 */
function submitForm() {

    // 폼데이터 담기
    var form = document.getElementById('noticeNotice_form2').querySelector("form");
    var formData = new FormData(form);

    for (var i = 0; i < filesArr.length; i++) {
        console.log("formDat나오나")
        console.log(formData)
        // 삭제되지 않은 파일만 폼데이터에 담기
        if (!filesArr[i].is_delete) {
            console.log("모니넌")  //옵젝파일뜸
            console.log(filesArr[i])  //옵젝파일뜸
            formData.append("attach_file", filesArr[i]);
            console.log("append후에formData")
            console.log(formData)

        }
    }

    $.ajax({
        url: '/web/notice/noticeNotice/fileUpload', //컨트롤러에서 PostMapping하는 메서드의 url
        processData: false, //
        contentType: false, //multipart/form-data 타입 사용하기 위함
        data: formData,
        cache: false,
        type: 'POST',
        // dataType: 'json',
        enctype: 'multipart/form-data',

    }).done(function (data) {
        console.log("성공함");
        console.log(data);
        for(let i of data.file){
            console.log("i다")
            console.log(i)
            console.log("i의다운링크다")
            console.log(i.downlink)
            $("#result").append("<a href='"+ i.downlink +"' download>"+i.fileName+"</a>");
        }

        noticeNotice.output();

    }).fail(function (err) {
        console.log("에러남")
        console.log(err)
    })
}
noticeNotice.init();

