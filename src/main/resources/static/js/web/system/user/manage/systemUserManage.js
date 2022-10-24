let systemUserManage_myTree;
systemUserManage_objectMenu = {};
const systemUserManage = {
    init() {
        const _this = this;
        grid.makeColumn(systemUserManage_gridOptions, "systemUserManage_grid");
        systemUserManage_objectMenu = common.findTreeByOrgAuth(systemUserManage)

        _this.loadAuth();

        systemUserManage_btnNew.onclick = function () {
            _this.clear()
            systemUserManage_objectMenu = common.findTreeByOrgAuth(systemUserManage)
        };
        systemUserManage_btnSave.onclick = function () {
            _this.countPk();
        };
        systemUserManage_btnDelete.onclick = function () {
            _this.delete();
        };
        userIdDiv.onclick = function() {
            if(systemUserManage_userId.value==''){
                itzAlert.alert(itzAlert.makeMsgJson("알림", "조직을 선택하면 아이디가 자동으로 생성됩니다. <br> 조직을 선택해주세요.", "확인","취소"))
            }
        }

        /*
        //div에 아이디 줘서 onchange
        userPwDiv.onchange = function(){
            let mPw = $("#systemUserManage_userPw").val(); // 사용자가 mPw에 입력한 값
            // var rule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/;
            const rule = /^[A-Za-z0-9]{6,12}$/;
            if(mPw.length < 6 || mPw.length > 12){
                itzAlert.notice(itzAlert.makeMsgJson("알림", "비밀번호는 6 ~ 12자리와 영문과 숫자 혼합으로 <br> 입력해주세요.", "확인","취소"))
            }
            if(!rule.test(mPw)){
                itzAlert.notice(itzAlert.makeMsgJson("알림", "비밀번호는 6 ~ 12자리와 영문과 숫자 혼합으로 <br> 입력해주세요.", "확인","취소"))
            }
        };*/

        $("#systemUserManage_userPw").change(function(){
            let mPw = systemUserManage_userPw.value; // 사용자가 mPw에 입력한 값
            const rule = /^[A-Za-z0-9]{6,12}$/;
            if(mPw.length < 6 || mPw.length > 12){
                itzAlert.alert(itzAlert.makeMsgJson("알림", "비밀번호는 6 ~ 12자리와 영문과 숫자 혼합으로 <br> 입력해주세요.", "확인","취소"))
            }
            if(!rule.test(mPw)){
                itzAlert.alert(itzAlert.makeMsgJson("알림", "비밀번호는 6 ~ 12자리와 영문과 숫자 혼합으로 <br> 입력해주세요.", "확인","취소"))
            }
        });

        //구글 아이디 비번 자동저장 막기
        systemUserManage_userNm.value = "ㅤ"
        userNmDiv.onclick = function() {
            if(systemUserManage_userNm.value=='ㅤ'){
                systemUserManage_userNm.value = ''
            }
        }

        //selectBox
        common.loadSelectBoxByCommonCd("systemUserManage_ctiYn","CTI_YN");
        common.loadSelectBoxByCommonCd("systemUserManage_useYn","USE_YN");



    },

    countPk(){

        let data = {
            userId : systemUserManage_userId.value
        }
        console.log("data countPk = "+JSON.stringify(data))
        console.log("systemUserManage_userId.value = "+systemUserManage_userId.value)
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_USER_MANAGE_URL+'/countPk',
            data: data,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemUserManage.save(data)
        }).fail(function (error) {
        });
    },

    save(count) {

        if(count === 0){
            //insert
            let selectedNodeId = "";
            for(let i in systemUserManage_myTree.selectedNodes){
                selectedNodeId = (systemUserManage_myTree.selectedNodes[i].id)
            }

            let datas = {
                userId : systemUserManage_userId.value,
                userNm : systemUserManage_userNm.value,
                userPw : systemUserManage_userPw.value,
                userPwCheck : systemUserManage_userPw_check.value,
                userExtPhone : systemUserManage_userExtPhone.value,
                userAuthId : systemUserManage_userAuthId.value,
                useYn : systemUserManage_useYn.value,
                userOrgId : selectedNodeId,
                ctiYn : systemUserManage_ctiYn.value,
                workStart : systemUserManage_work_start.value,
                workEnd : systemUserManage_work_end.value,
                accountNonExpiredYn : true,
                accountNonLockedYn : true,
                credentialNonExpiredYn : true
            }

            if(systemUserManage_userId.value==""){
                itzAlert.error(itzAlert.makeMsgJson("저장 실패", "ID를 입력해주세요.", "확인","취소"))
            }else if(systemUserManage_userNm.value==""){
                itzAlert.error(itzAlert.makeMsgJson("저장 실패", "이름을 입력해주세요.", "확인","취소"))
            }else if(systemUserManage_userPw.value==""){
                itzAlert.error(itzAlert.makeMsgJson("저장 실패", "비밀번호를 입력해주세요.", "확인","취소"))
            }else if(systemUserManage_userPw.value!=systemUserManage_userPw_check.value){
                itzAlert.error(itzAlert.makeMsgJson("저장 실패", "비밀번호가 일치하지 않습니다.", "확인","취소"))
            }else if(systemUserManage_userAuthId.value==""){
                itzAlert.error(itzAlert.makeMsgJson("저장 실패", "권한을 선택해주세요.", "확인","취소"))
            }else if(selectedNodeId==""){
                itzAlert.error(itzAlert.makeMsgJson("저장 실패", "조직을 선택해주세요.", "확인","취소"))
            }else{

                let dataList = [];
                dataList.push(datas)

                $.ajax({
                    type: 'POST',
                    url: REST_SYSTEM_USER_MANAGE_URL + '/saveUserInfo',
                    data: JSON.stringify(dataList),
                    contentType: 'application/json; charset=utf-8',
                }).done(function (data) {
                    systemUserManage.findAll();
                    systemUserManage.clear();
                    itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "신규 저장이 완료되었습니다.", "확인","취소"))
                }).fail(function (error) {
                });
            }
        }else{
            //update
            let selectedNodeId = "";
            for(let i in systemUserManage_myTree.selectedNodes){
                selectedNodeId = (systemUserManage_myTree.selectedNodes[i].id)
            }

            if(systemUserManage_userPw.value==""&&systemUserManage_userPw_check.value==""){
                //비번 입력 안하고 업데이트 업데이트
                alert("비번 입력 안하고 업데이트 업데이트")
                let datas = {
                    userId : systemUserManage_userId.value,
                    userNm : systemUserManage_userNm.value,
                    userPw : systemUserManage_userPw.value,
                    userAuthId : systemUserManage_userAuthId.value,
                    useYn : systemUserManage_useYn.value,
                    userOrgId : selectedNodeId,
                    ctiYn : systemUserManage_ctiYn.value,
                    workStart : systemUserManage_work_start.value,
                    workEnd : systemUserManage_work_end.value,
                }

                if(systemUserManage_userId.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "ID를 입력해주세요.", "확인","취소"))
                }else if(systemUserManage_userNm.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "이름을 입력해주세요.", "확인","취소"))
                }else if(systemUserManage_userAuthId.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "권한을 선택해주세요.", "확인","취소"))
                }else if(selectedNodeId==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "조직을 선택해주세요.", "확인","취소"))
                }else{

                    let dataList = [];
                    dataList.push(datas)

                    $.ajax({
                        type: 'POST',
                        url: REST_SYSTEM_USER_MANAGE_URL + '/updateWithoutPassWord',
                        data: JSON.stringify(dataList),
                        contentType: 'application/json; charset=utf-8',
                    }).done(function (data) {
                        systemUserManage.findAll();
                        systemUserManage.clear();
                        itzAlert.notice(itzAlert.makeMsgJson("수정 완료", "수정이 완료되었습니다.", "확인","취소"))
                    }).fail(function (error) {
                    });
                }

            }else if(systemUserManage_userPw.value!=""||systemUserManage_userPw_check.value!=""){
                //비번 입력했을때 업데이트
                let datas = {
                    userId : systemUserManage_userId.value,
                    userNm : systemUserManage_userNm.value,
                    userPw : systemUserManage_userPw.value,
                    userPwCheck : systemUserManage_userPw_check.value,
                    userExtPhone : systemUserManage_userExtPhone.value,
                    userAuthId : systemUserManage_userAuthId.value,
                    useYn : systemUserManage_useYn.value,
                    userOrgId : selectedNodeId,
                    ctiYn : systemUserManage_ctiYn.value,
                    workStart : systemUserManage_work_start.value,
                    workEnd : systemUserManage_work_end.value,
                }

                if(systemUserManage_userId.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "ID를 입력해주세요.", "확인","취소"))
                }else if(systemUserManage_userNm.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "이름을 입력해주세요.", "확인","취소"))
                }else if(systemUserManage_userPw.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "비밀번호를 입력해주세요.", "확인","취소"))
                }else if(systemUserManage_userPw.value!=systemUserManage_userPw_check.value){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "비밀번호가 일치하지 않습니다.", "확인","취소"))
                }else if(systemUserManage_userAuthId.value==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "권한을 선택해주세요.", "확인","취소"))
                }else if(selectedNodeId==""){
                    itzAlert.error(itzAlert.makeMsgJson("저장 실패", "조직을 선택해주세요.", "확인","취소"))
                }else{

                    let dataList = [];
                    dataList.push(datas)

                    $.ajax({
                        type: 'POST',
                        url: REST_SYSTEM_USER_MANAGE_URL + '/saveUserInfo',
                        data: JSON.stringify(dataList),
                        contentType: 'application/json; charset=utf-8',
                    }).done(function (data) {
                        systemUserManage.findAll();
                        systemUserManage.clear();
                        itzAlert.notice(itzAlert.makeMsgJson("수정 완료", "수정이 완료되었습니다.", "확인","취소"))
                    }).fail(function (error) {
                    });
                }
            }
        }

    },

    loadAuth(){
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_MANAGE_URL,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            for(let i in data){
                $('#systemUserManage_userAuthId').append('<option value = ' +data[i].authId +'>' + data[i].authNm + '</option>');
            }
        }).fail(function (error) {
        });
    },

    clear(){
        systemUserManage_userId.value = ""
        systemUserManage_userNm.value = ""
        systemUserManage_userPw.value = ""
        systemUserManage_userPw_check.value = ""
        systemUserManage_userExtPhone.value = ""
        systemUserManage_work_start.value = ""
        systemUserManage_work_end.value = ""
        $("#systemUserManage_userAuthId option:eq(0)").prop("selected", true);
        $("#systemUserManage_useYn option:eq(0)").prop("selected", true);
        $("#systemUserManage_ctiYn option:eq(0)").prop("selected", true);
    },

    delete() {
        let data = {
            userId : systemUserManage_gridOptions.api.getSelectedRows()[0].userId,
            userPw : systemUserManage_gridOptions.api.getSelectedRows()[0].userPw,
            userAuthId : systemUserManage_gridOptions.api.getSelectedRows()[0].userAuthId,
            userOrgId : systemUserManage_gridOptions.api.getSelectedRows()[0].userOrgId,
        }

        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_USER_MANAGE_URL + '/deleteUserInfo',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemUserManage.findAll();
            itzAlert.notice(itzAlert.makeMsgJson("삭제 완료", "삭제되었습니다.", "확인","취소"))
        }).fail(function (error) {
        });
    },

    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_USER_MANAGE_URL ,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemUserManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    treeData(treeData, checkedList) {

        systemUserManage_myTree = new Tree('#systemUserManage_divTree', {

            data: treeData,
            checkBoxOptions : "single", //single , multi, onlyClick

            beforeLoad: function (rawData) {

                function formatData() {
                    // do some format
                }

                return formatData(rawData);
            },

            loaded: function () {
                if (checkedList) {
                    this.values = checkedList;
                }
            },

            onChange: function () {
                //아이디자동생성
                let data = {
                    orgId : systemUserManage_myTree.selectedNodes[0].id
                }
                let systemUserManage_userIdArr = []
                $.ajax({
                    type: 'GET',
                    data: data,
                    url: REST_SYSTEM_USER_MANAGE_URL + '/findOrgId',
                    contentType: 'application/json; charset=utf-8'
                }).done(function (data){
                    if(data.length==0){
                        let firstIdSet = ("01").padStart(6,'0')
                        let firstUserid = systemUserManage_myTree.selectedNodes[0].id + "-" + firstIdSet
                        systemUserManage_userId.value = firstUserid
                    }else{
                        for(let i in data){
                            systemUserManage_userIdArr.push(parseInt(data[i].userId.substr(5,6)))
                        }

                        let max = Math.max.apply(null, systemUserManage_userIdArr)+1
                        let nextIdNoStr = max.toString()
                        let nextIdSet = nextIdNoStr.padStart(6,'0')
                        let orgId = systemUserManage_myTree.selectedNodes[0].id
                        let userId = orgId+"-"+nextIdSet

                        systemUserManage_userId.value = userId
                    }
                }).fail(function (error){
                });
            },
        })
        common.putIconTreeAndTextSizeSmall(systemUserManage_myTree, "systemUserManage_divTree");
    },
}

let systemUserManage_gridOptions = {
    columnDefs: [
    ],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemUserManage.findAll();
    },
    onRowClicked(event) {
        systemUserManage_userId.value = event.data.userId
        systemUserManage_userNm.value = event.data.userNm
        systemUserManage_userExtPhone.value = event.data.userExtPhone
        systemUserManage_work_start.value = event.data.workStart
        systemUserManage_work_end.value = event.data.workEnd

        //selectBox + treejs
        systemUserManage_userAuthId.value = event.data.userAuthId
        systemUserManage_useYn.value = event.data.useYn
        systemUserManage_ctiYn.value = event.data.ctiYn
        let checkedList = [];
        checkedList.push(event.data.userOrgId)
        systemUserManage.treeData(systemUserManage_objectMenu, checkedList)
    }
}
systemUserManage.init();