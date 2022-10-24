// https://github.com/daweilv/treejs

systemAuthOrg_treeDataArr = [];
systemAuthOrg_myTree = "";
systemAuthOrg_objectOrg = {};
systemAuthOrg_orgListAll = [];


const systemAuthOrg = {
    init() {
        grid.makeColumn(systemAuthOrg_gridOptions, "systemAuthOrg_grid");
        systemAuthOrg.findAuthTree();

    },

    findAuth() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_ORG_URL + '/auth',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemAuthOrg_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    saveMenuAuth(data) {
        let saveRow = [];
        let authId = systemAuthOrg_gridOptions.api.getSelectedRows()[0].authId;

        for (let i in data) {
            let tmpArr = new Object();

            tmpArr.authId = authId;
            tmpArr.orgId = data[i];

            saveRow.push(tmpArr);
        }

        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_AUTH_ORG_URL,
            data: JSON.stringify(saveRow),
            contentType: 'application/json; charset=utf-8',
        }).done(function () {
            itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "조직 권한이 저장되었습니다.", "확인"),systemAuthOrg.findAllMenuListWhenClickAuth);
        }).fail(function (error) {
        });
    },

    deleteMenuAuth(deleteList) {
        let deleteRow = [];
        let authId = systemAuthOrg_gridOptions.api.getSelectedRows()[0].authId;

        for (let i in deleteList) {
            let tmpArr = new Object();

            tmpArr.authId = authId;
            tmpArr.orgId = deleteList[i];

            deleteRow.push(tmpArr);
        }

        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_AUTH_ORG_URL,
            data: JSON.stringify(deleteRow),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            itzAlert.notice(itzAlert.makeMsgJson("삭제 완료", "조직 권한이 삭제되었습니다.", "확인"),systemAuthOrg.findAllMenuListWhenClickAuth);
        }).fail(function (error) {
        });

    },

    findAuthTree() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_ORG_URL + '/tree',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {

            systemAuthOrg_objectOrg = common.loadTreeData(data,"org",true);
            systemAuthOrg.treeData(systemAuthOrg_objectOrg,"");

            data.forEach(function (item) {
                if (!systemAuthOrg_orgListAll.includes((item.orgId))) {
                    systemAuthOrg_orgListAll.push(item.orgId);
                }
            })

        }).fail(function (error) {
        });
    },

    findAllMenuListWhenClickAuth() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_ORG_URL + '/' + systemAuthOrg_gridOptions.api.getSelectedRows()[0].authId,
            contentType: 'application/json; charset=utf-8'
        }).done(function (checked) {

            let checkedWhenClickAuth = [];

            checked.forEach(function (check) {
                checkedWhenClickAuth.push(check.orgId);
            })

            systemAuthOrg.treeData(systemAuthOrg_objectOrg, checkedWhenClickAuth);

        }).fail(function (error) {
        });

    },

    treeData(treeData, checkedList) {

        systemAuthOrg_myTree = new Tree('#systemAuthOrg_divTree', {


            data: treeData,

            checkBoxOptions : "onlyClick", //single , multi, onlyClick


            beforeLoad: function (rawData) {

                function formatData() {
                    // do some format
                }

                return formatData(rawData);
            },

            loaded: function () {

                if (checkedList.length > 0) {
                    this.values = checkedList;
                }
            },

            onChange: function () {
                console.log("this.selectedNodes",this.selectedNodes);

                let lengthCheck = systemAuthOrg_gridOptions.api.getSelectedRows().length;
                if (lengthCheck === 0) {
                    itzAlert.notice(itzAlert.makeMsgJson("권한 선택", "권한 선택은 필수입니다.", "확인"), systemAuthOrg.findAuthTree);
                    return false;

                } else {
                    systemAuthOrg_treeDataArr = [];
                    let unCheckedList = [];
                    let saveList = [];
                    let deleteList = [];
                    let treeDataArrList = [];


                    //최근에 체크된 노드 리스트
                    systemAuthOrg_treeDataArr = this.selectedNodes;

                    for(let i in systemAuthOrg_treeDataArr){
                        treeDataArrList.push(systemAuthOrg_treeDataArr[i].id);
                    }

                    //체크 안된 노드 리스트
                    unCheckedList = systemAuthOrg_orgListAll.filter(x => !treeDataArrList.includes(x));

                    //최근 체크된 리스트 (차집합) 로딩될때 체크된 리스트
                    saveList = treeDataArrList.filter(x => !checkedList.includes(x));

                    //체크 안된 리스트 (교집합) 로딩될때 체크된 리스트
                    deleteList = unCheckedList.filter(x => checkedList.includes(x));

                    if (saveList.length > 0) {
                        systemAuthOrg.saveMenuAuth(saveList);
                    }
                    if (deleteList.length > 0) {
                        systemAuthOrg.deleteMenuAuth(deleteList);
                    }
                }

            },
        })
        common.putIconTreeAndTextSizeSmall(systemAuthOrg_myTree, "systemAuthOrg_divTree");
    },

};

let systemAuthOrg_gridOptions = {
    columnDefs: [],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellEditingStopped(event) {

    },
    onGridReady() {
        systemAuthOrg.findAuth();
    },
    onRowClicked(event) {
        console.log(event);
        console.log(event.node.data);
        systemAuthOrg.findAllMenuListWhenClickAuth();
    }
}

// systemAuthOrg_divTree
systemAuthOrg.init();
