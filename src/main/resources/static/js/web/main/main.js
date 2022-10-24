
var main = {

    init() {
        var mainNoticeQuickGrid = document.querySelector('#mainNoticeQuickGrid');
        new agGrid.Grid(mainNoticeQuickGrid, mainNoticeQuickGridOptions);
        var mainQnAQuickGrid = document.querySelector('#mainQnAQuickGrid');
        new agGrid.Grid(mainQnAQuickGrid, mainQnAQuickGridOptions);


    },


    //공지사항전체검색
    noticeFindAll : function () {
        agGrid.simpleHttpRequest({url: '/web/notice/noticeNotice/findAll'}).then(function(data) {
            mainNoticeQuickGridOptions.api.setRowData(data);
        });
    },


    // Q&A전체검색
    qnAFindAll : function () {
        agGrid.simpleHttpRequest({url: '/web/notice/noticeQnA/findAll'}).then(function(data) {

            mainQnAQuickGridOptions.api.setRowData(data);
        });
    },


    //공지사항 팝업
    showPopupNotice: function () {
        var str;
        str =  "/noticeNoticePopup";
        var url = str;

        var popupWidth = 1000;
        var popupHeight = 400;

        // 듀얼 모니터 기준
        var left = (screen.availWidth - popupWidth) / 2;
        if (window.screenLeft < 0) {
            left += window.screen.width * -1;
        } else if (window.screenLeft > window.screen.width) {
            left += window.screen.width;
        }

        var top = (screen.availHeight - popupHeight) / 2 - 10;

        var options = 'resizable=no,  left=' + left + ',top=' + top + ', width=' + popupWidth + ',height=' + popupHeight + ',menubar=no, status=no, toolbar=no'+ 'scrollbars=no';
        return window.open(url, name, options);

    },
    //QnA팝업
    showPopupQnA: function () {
        var str;
        str =  "/noticeQnAPopup";
        var url = str;

        var popupWidth = 1000;
        var popupHeight = 400;

        // 듀얼 모니터 기준
        var left = (screen.availWidth - popupWidth) / 2;
        if (window.screenLeft < 0) {
            left += window.screen.width * -1;
        } else if (window.screenLeft > window.screen.width) {
            left += window.screen.width;
        }

        var top = (screen.availHeight - popupHeight) / 2 - 10;

        var options = 'resizable=no,  left=' + left + ',top=' + top + ', width=' + popupWidth + ',height=' + popupHeight + ',menubar=no, status=no, toolbar=no'+ 'scrollbars=no';
        return window.open(url, name, options);

    },
} //main END

//공지사항 바로가기 그리드옵션
var mainNoticeQuickGridOptions = {
    suppressHorizontalScroll:[true],
    eBodyHorizontalScrollViewport:[true],
    columnDefs: [
        {headerName: "공지번호", field: 'noticeNo', editable: false, width: 10,hide : true}
        , {headerName: "작성자", field: 'noticeCreId', editable: false, width: 45,hide : false}
        , {headerName: "시작일", field: 'noticeStartDt', editable: false, width: 140,hide : true}
        , {headerName: "종료일", field: 'noticeEndDt', editable: false, width: 140,hide : true}
        , {headerName: "제목", field: 'noticeTitle', editable: false, width: 200 }
        , {headerName: "내용", field: 'noticeContent', editable: false, width: 800,hide : true}
        , {headerName: "등록일", field: 'creDt', editable: false, width: 80,hide : false}
        // , {headerName: "첨부파일", field: 'test', editable: false, width: 100}
    ],
    //가로스크롤바 비활성화
    suppressHorizontalScroll: true,
    //기본 컬럼 옵션 설정
    defaultColDef: {
        cellStyle: {textAlign: 'center'},         //텍스트정렬
        // filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        // floatingFilter: true,                   //상단 필터 여부(항상 떠있는지)
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
    onRowClicked: function () { //main.html의 hidden id에 값을 넣은뒤 opener를 이용하여 팝업창에 전달

        $("#PopupParentsNoticeTitle").val(mainNoticeQuickGridOptions.api.getSelectedRows()[0].noticeTitle);
        $("#PopupParentsNoticeCreId").val(mainNoticeQuickGridOptions.api.getSelectedRows()[0].noticeCreId);
        $("#PopupParentsNoticeStartDt").val(mainNoticeQuickGridOptions.api.getSelectedRows()[0].noticeStartDt);
        $("#PopupParentsNoticeEndDt").val(mainNoticeQuickGridOptions.api.getSelectedRows()[0].noticeEndDt);
        $("#PopupParentsNoticeContent").val(mainNoticeQuickGridOptions.api.getSelectedRows()[0].noticeContent);
        main.showPopupNotice()

    },
    onGridReady(event) {
        main.noticeFindAll();
        event.api.sizeColumnsToFit();
    }
} // 공지사항 바로가기 그리드옵션 End

//Q&A바로가기 그리드옵션
var mainQnAQuickGridOptions = {
    columnDefs: [
        {headerName: "QnA아이디", field: 'qnAId', editable: false, width: 10,hide : true}
        , {headerName: "고객명", field: 'qnAUserNm', editable: false, width: 45,hide : false}
        , {headerName: "제목", field: 'qnATitle', editable: false, width: 200}
        , {headerName: "처리상태", field: 'qnAState', editable: false, width: 60,hide : true}
        , {headerName: "내용", field: 'qnAContent', editable: false, width: 400,hide : true}
        , {headerName: "회사명", field: 'qnACompNm', editable: false, width: 140,hide : true}
        , {headerName: "Mobile", field: 'qnAPhoneNo', editable: false, width: 120,hide : true}
        , {headerName: "Tel", field: 'qnATelNo', editable: false, width: 120,hide : true}
        , {headerName: "등록일", field: 'creDt', editable: false, width: 80,hide : false }
        , {headerName: "비밀번호", field: 'qnAPassWord', editable: false,width: 10,hide : true}

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
        // floatingFilter: true,                   //상단 필터 여부(항상 떠있는지)
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
    onCellEditingStopped: function (event) {//main.html의 hidden id에 값을 넣은뒤 opener를 이용하여 팝업창에 전달
    },
    onRowClicked: function () {
        $("#PopupParentsQnATitle").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnATitle);
        $("#PopupParentsQnAUserNm").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnAUserNm);
        $("#PopupParentsQnACompNm").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnACompNm);
        $("#PopupParentsQnAPhoneNo").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnAPhoneNo);
        $("#PopupParentsQnATelNo").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnATelNo);
        $("#PopupParentsQnAContent").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnAContent);
        $("#PopupParentsQnAContent").val(mainQnAQuickGridOptions.api.getSelectedRows()[0].qnAContent);
        main.showPopupQnA()
    },
    onGridReady(event) {
        main.qnAFindAll();
        event.api.sizeColumnsToFit();
    }
} // Q&A바로가기 그리드옵션 End

main.init();

