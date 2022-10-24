
let systemOrgManage_objectOrgManage = {};
let systemOrgManage_orgListAll = [];
const systemOrgManage = {
    init() {

        const _this = this;
        _this.findAllTree();

        systemOrgManage_btnNew.onclick = function (){

            if(systemOrgManage_org_id.value!=""){
                systemOrgManage_org_parent_id.value = systemOrgManage_org_id.value;
                systemOrgManage_org_lv.value = Number (systemOrgManage_org_lv.value)+1;
                systemOrgManage_org_id.value = "";
                systemOrgManage_org_nm.value = "";
                systemOrgManage_org_parent_url.value = "";
                systemOrgManage_use_yn.value = true;
                systemOrgManage_ord_no.value = 0;
                // systemOrgManage_org_id_arr.value = "";
            }else{
                itzAlert.notice(itzAlert.makeMsgJson("알림", "조직을 선택해주세요.", "확인","취소"));
            }
        };

        systemOrgManage_btnDelete.onclick = function () {

            if(systemOrgManage_org_id.value==""){
                itzAlert.notice(itzAlert.makeMsgJson("알림", "조직을 선택해주세요.", "확인","취소"));
            }else{


                let id = myTree.selectedNode[0].id;
                let selectNode = myTree.nodesById[id]
                let childrenLength = selectNode.children.length
                let childrenArr = [];

                if(childrenLength>0){
                    // itzAlert.confirm(itzAlert.makeMsgJson("삭제", "해당 제목을 삭제하면 관련된 모든 스크립트가 삭제됩니다. <br> 삭제하시겠습니까?", "확인", "취소"), systemOrgManage.deleteOrg(childrenArr))
                    //하위항목 있을 때

                    itzAlert.notice(itzAlert.makeMsgJson("알림", "하위항목이 존재합니다. 하위항목을 먼저 삭제해주세요.", "확인","취소"));

                    /*

                     if(selectNode["children"][0].children.length==0){
                         console.log("id     =  ",id)
                         console.log("칠드런 찾기 1        =     ",selectNode)
                         console.log("칠드런 찾기 2        =     ",childrenLength)
                         console.log("칠드런 찾기 3        =     ",selectNode["children"])
                         console.log("칠드런 찾기 4        =     ",selectNode["children"][0])
                         console.log("칠드런 찾기 *        =     ",selectNode["children"][0].children.length)
                         console.log("칠드런 찾기 5        =     ",selectNode["children"][0]["id"])//칠드런의 0번째 id값
                         for(let i in selectNode["children"]){
                             childrenArr.push(selectNode["children"][i]["id"])
                         }
                         console.log(childrenArr)
                         childrenArr.push(id)
                         console.log(childrenArr)
                         alert("칠드런있음")
                         // itzAlert.confirm(itzAlert.makeMsgJson("삭제", "해당 제목을 삭제하면 관련된 모든 스크립트가 삭제됩니다. <br> 삭제하시겠습니까?", "확인", "취소"), systemOrgManage.deleteOrg(childrenArr))


                     }else{

                         //하위항목의 하위항목이 있을 때...

                     }


                     */


                }else{

                    //하위항목 없을 때
                    itzAlert.confirm(itzAlert.makeMsgJson("삭제", "선택한 항목을 삭제하시겠습니까?", "확인", "취소"), systemOrgManage.deleteOrg)
                }
            }
        };

        systemOrgManage_btnSave.onclick = function () {
            if(systemOrgManage_org_id.value==""){
                itzAlert.notice(itzAlert.makeMsgJson("저장 실패", "조직 ID를 입력해야됩니다.", "확인","취소"));
            }else{
                _this.saveOrg();
            }
        };

    },

    findAllTree() {

        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_ORG_MANAGE_URL + '/findAllTree',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            let putArrObj = {};
            let data_length = 0;
            let lastOrgLv = 0;
            let endOrgLv = 0;

            data_length = data[data.length - 1].orgLv + 3;
            lastOrgLv = data[data.length - 1].orgLv +2;
            endOrgLv = lastOrgLv - 1;

            for (let i = 0; i < data_length; i++) {
                systemOrgManage_objectOrgManage['orgLv_' + i] = [];

                data.forEach(function (item) {

                    let tmp = new Object();
                    if (item.orgLv == i) {
                        tmp.id = item.orgId;
                        tmp.text = item.orgNm;
                        tmp.orgParentId = item.orgParentId;
                        tmp.orgLv = item.orgLv;
                        tmp.orgParentUrl = item.orgParentUrl;
                        tmp.useYn = item.useYn;
                        tmp.ordNo = item.ordNo;
                        systemOrgManage_objectOrgManage['orgLv_' + i].push(tmp);
                    }

                    if (!systemOrgManage_orgListAll.includes((item.orgId))) {
                        systemOrgManage_orgListAll.push(item.orgId);
                    }

                })
            }

            for (let i in systemOrgManage_objectOrgManage['orgLv_' + (lastOrgLv - 1)]) {
                putArrObj['orgLv_' + lastOrgLv] = [];

                for (let j in systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv]) {
                    if (systemOrgManage_objectOrgManage['orgLv_' + (lastOrgLv - 1)][i].id === systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].orgParentId) {
                        let tmp = new Object();
                        tmp.id = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].id;
                        tmp.text = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].text;
                        tmp.orgParentId = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].orgParentId;
                        tmp.orgLv = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].orgLv;
                        tmp.orgParentUrl = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].orgParentUrl;
                        tmp.useYn = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].useYn;
                        tmp.ordNo = systemOrgManage_objectOrgManage['orgLv_' + lastOrgLv][j].ordNo;
                        putArrObj['orgLv_' + lastOrgLv].push(tmp);
                    }
                }
                systemOrgManage_objectOrgManage['orgLv_' + (lastOrgLv - 1)][i].children = putArrObj['orgLv_' + lastOrgLv]
            }

            while (endOrgLv >= 0) {
                for (let k in systemOrgManage_objectOrgManage['orgLv_' + endOrgLv]) {

                    putArrObj['orgLv_' + (endOrgLv + 1)] = [];

                    for (let n in systemOrgManage_objectOrgManage['orgLv_' + (endOrgLv + 1)]) {
                        if (systemOrgManage_objectOrgManage['orgLv_' + endOrgLv][k].id === systemOrgManage_objectOrgManage['orgLv_' + (endOrgLv + 1)][n].orgParentId) {
                            putArrObj['orgLv_' + (endOrgLv + 1)].push(systemOrgManage_objectOrgManage['orgLv_' + (endOrgLv + 1)][n])
                        }
                    }
                    systemOrgManage_objectOrgManage['orgLv_' + endOrgLv][k].children = putArrObj['orgLv_' + (endOrgLv + 1)]
                }
                endOrgLv--;
            }

            systemOrgManage.treeData(systemOrgManage_objectOrgManage['orgLv_0'])



        }).fail(function (error) {
        });
    },

    saveOrg(){
        let orgData = {
            orgId :         systemOrgManage_org_id.value ,
            orgNm:          systemOrgManage_org_nm.value ,
            orgLv:          systemOrgManage_org_lv.value ,
            orgParentId:    systemOrgManage_org_parent_id.value ,
            orgParentUrl:   systemOrgManage_org_parent_url.value ,
            useYn:          systemOrgManage_use_yn.value ,
            ordNo:          systemOrgManage_ord_no.value
        }
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_ORG_MANAGE_URL + '/saveOrg',
            data: JSON.stringify(orgData),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {

            // itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인"));
            // counselScript.findAll();
            systemOrgManage.findAllTree()
            itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인"))
        }).fail(function (error) {
        });
    },

    putMenuIcon() {
        let nodeList = myTree.nodesById;
        let nodeList_length = 0;
        let parent = document.querySelectorAll('.treejs-label');

        for(let j in nodeList) {
            let icon = nodeList[j].orgId;
            // let iconSplit = icon.split(" ");
            let element = document.createElement('i');
            // element.classList.add(iconSplit[0], iconSplit[1], 'pr-1', 'text-blue-700');
            parent[nodeList_length].insertBefore(element, parent[nodeList_length].firstChild);

            nodeList_length++;
        }
    },

    deleteOrg(id) {

        let strId = ""
        if(id==undefined){
            strId = myTree.selectedNode[0].id
        }else{
            strId = id.toString()
        }


        let deleteData = {
            orgId : strId
        }
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_ORG_MANAGE_URL + '/deleteOrg',
            data: JSON.stringify(deleteData),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemOrgManage.clear();
            itzAlert.notice(itzAlert.makeMsgJson("삭제 완료", "삭제되었습니다.", "확인"));
            systemOrgManage.findAllTree();
        }).fail(function (error) {
        });
    },

    clear(){
        systemOrgManage_org_id.value = "";
        systemOrgManage_org_nm.value = "";
        systemOrgManage_org_lv.value = "";
        systemOrgManage_org_parent_id.value = "";
        systemOrgManage_org_parent_url.value = "";
        systemOrgManage_use_yn.value = "";
        systemOrgManage_ord_no.value = "";
        // systemOrgManage_org_id_arr.value = "";
    },

    treeData(treeData) {

        myTree = new Tree('#systemOrgManage_divTree', {
            data: treeData,
            beforeLoad: null,
            loaded: null,
            checkBoxOptions : "single", //single , multi, onlyclick
            onChange: function () {

                let selectedNodes = myTree.selectedNode;
                // let object = myTree.nodesById


                if(selectedNodes.length>0){
                    systemOrgManage_org_id.value = selectedNodes[0].id;
                    systemOrgManage_org_nm.value = selectedNodes[0].text;
                    systemOrgManage_org_lv.value = selectedNodes[0].orgLv;
                    systemOrgManage_org_parent_id.value = selectedNodes[0].orgParentId;
                    systemOrgManage_org_parent_url.value = selectedNodes[0].orgParentUrl;
                    systemOrgManage_use_yn.value = selectedNodes[0].useYn;
                    systemOrgManage_ord_no.value = selectedNodes[0].ordNo;
                    // systemOrgManage_org_id_arr.value = selectedNodes[0].id;
                    selectedNodes ={};
                }

                if(selectedNodes.length===0){
                    systemOrgManage.clear();
                };

            },

        });

    },

}

systemOrgManage.init();