// https://github.com/daweilv/treejs

systemAuthMenu_treeDataArr = [];
systemAuthMenu_myTree ="";
systemAuthMenu_objectMenu = {};
systemAuthMenu_menuListAll = [];
systemAuthMenu_data_length = 0;


const systemAuthMenu = {
    init() {
        grid.makeColumn(systemAuthMenu_gridOptions, "systemAuthMenu_grid");
        systemAuthMenu.findAuthTree();

    },

    findAuth() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_MENU_URL + '/auth',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemAuthMenu_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    saveMenuAuth(data) {
        let saveRow = [];
        let authId = systemAuthMenu_gridOptions.api.getSelectedRows()[0].authId;

        for (let i in data) {
            let tmpArr = new Object();

            tmpArr.authId = authId;
            tmpArr.menuId = data[i];

            saveRow.push(tmpArr);
        }

        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_AUTH_MENU_URL,
            data: JSON.stringify(saveRow),
            contentType: 'application/json; charset=utf-8',
        }).done(function () {
            itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "메뉴 권한이 저장되었습니다.", "확인"),systemAuthMenu.findAllMenuListWhenClickAuth);

        }).fail(function (error) {
        });
    },

    deleteMenuAuth(deleteList) {
        let deleteRow = [];
        let authId = systemAuthMenu_gridOptions.api.getSelectedRows()[0].authId;

        for (let i in deleteList) {
            let tmpArr = new Object();

            tmpArr.authId = authId;
            tmpArr.menuId = deleteList[i];

            deleteRow.push(tmpArr);
        }

        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_AUTH_MENU_URL,
            data: JSON.stringify(deleteRow),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            itzAlert.notice(itzAlert.makeMsgJson("삭제 완료", "조직 권한이 삭제되었습니다.", "확인"),systemAuthMenu.findAllMenuListWhenClickAuth);

        }).fail(function (error) {
        });

    },

    findAuthTree() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_MENU_URL + '/tree',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {

            systemAuthMenu_objectMenu = common.loadTreeData(data,"menu");
            systemAuthMenu.treeData(systemAuthMenu_objectMenu,"");

            data.forEach(function (item) {
                if (!systemAuthMenu_menuListAll.includes((item.menuId))) {
                    systemAuthMenu_menuListAll.push(item.menuId);
                }
            })
            systemAuthMenu_data_length = data[data.length - 1].menuLv + 1;

        }).fail(function (error) {
        });
    },

    findAllMenuListWhenClickAuth() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_MENU_URL + '/' + systemAuthMenu_gridOptions.api.getSelectedRows()[0].authId,
            contentType: 'application/json; charset=utf-8'
        }).done(function (checked) {

            let checkedWhenClickAuth = [];

            checked.forEach(function (check) {
                checkedWhenClickAuth.push(check.menuId);
            })

            systemAuthMenu.treeData(systemAuthMenu_objectMenu, checkedWhenClickAuth);

        }).fail(function (error) {
        });

    },

    treeData(treeData, checkedList) {

        systemAuthMenu_myTree = new Tree('#systemAuthMenu_divTree', {

            data: treeData,
            checkBoxOptions : "multi",

            beforeLoad: function (rawData) {

                function formatData() {
                }

                return formatData(rawData);
            },

            loaded: function () {
                if (checkedList.length > 0) {
                    this.values = checkedList.filter(x => !delParentId.includes(x));
                }
            },

            onChange: function () {
                console.log("this.selectedNodes",this.selectedNodes);

                let lengthCheck = systemAuthMenu_gridOptions.api.getSelectedRows().length;
                if (lengthCheck === 0) {
                    itzAlert.notice(itzAlert.makeMsgJson("권한 선택", "권한 선택은 필수입니다.", "확인"), systemAuthMenu.findAuthTree);
                    return false;

                } else {
                    systemAuthMenu_treeDataArr = [];
                    let unCheckedList = [];
                    let saveList = [];
                    let deleteList = [];
                    let treeDataArrList = [];


                    //최근에 체크된 노드 리스트
                    systemAuthMenu_treeDataArr = this.selectedNodes;

                    for(let i in systemAuthMenu_treeDataArr){
                        treeDataArrList.push(systemAuthMenu_treeDataArr[i].id);
                    }

                    //체크 안된 노드 리스트
                    unCheckedList = systemAuthMenu_menuListAll.filter(x => !treeDataArrList.includes(x));

                    //최근 체크된 리스트 (차집합) 로딩될때 체크된 리스트
                    saveList = treeDataArrList.filter(x => !checkedList.includes(x));

                    //체크 안된 리스트 (교집합) 로딩될때 체크된 리스트
                    deleteList = unCheckedList.filter(x => checkedList.includes(x));

                    if (saveList.length > 0) {
                        systemAuthMenu.saveMenuAuth(saveList);
                    }
                    if (deleteList.length > 0) {
                        systemAuthMenu.deleteMenuAuth(deleteList);
                    }
                }
            },
        })
        common.putIconTreeAndTextSizeSmall(systemAuthMenu_myTree, "systemAuthMenu_divTree");
    },

};

let systemAuthMenu_gridOptions = {
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
        systemAuthMenu.findAuth();
    },
    onRowClicked(event) {
        console.log(event);
        console.log(event.node.data);
        systemAuthMenu.findAllMenuListWhenClickAuth();
    }
}

// systemAuthMenu_divTree
systemAuthMenu.init();
