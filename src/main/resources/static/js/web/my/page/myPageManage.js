const myPageManage = {
    init() {
        grid.makeColumn(allMenu_gridOptions, "allMenu_grid");

        grid.makeColumn(myPageManage_gridOptions, "myPageManage_grid");

        $("#myPageManage_btnDelete").on("click", function () {
            myPageManage.deleteMyPage();
        });
        $("#myPageManage_btnSave").on("click", function () {
            myPageManage.saveMyPageDtl();
        });
    },

    findAllMenu() {
        $.ajax({
            type: 'GET',
            url: REST_MY_PAGE_URL+ '/menu',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            allMenu_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    findAllMyPage() {
        $.ajax({
            type: 'GET',
            url: REST_MY_PAGE_URL+ '/myPage',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            myPageManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    saveMyPage (data) {
        $.ajax({
            type: 'POST',
            url: REST_MY_PAGE_URL,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            myPageManage.findAllMenu();
            myPageManage.findAllMyPage();
        }).fail(function (error) {
        });
    },

    saveMyPageDtl () {
        $.ajax({
            type: 'POST',
            url: REST_MY_PAGE_URL + '/detail',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(myPageManage_gridOptions.api.getSelectedRows())
        }).done(function (data) {
            myPageManage.findAllMenu();
            myPageManage.findAllMyPage();
        }).fail(function (error) {
        });
    },

    deleteMyPage () {
        $.ajax({
            type: 'DELETE',
            url: REST_MY_PAGE_URL,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(myPageManage_gridOptions.api.getSelectedRows()),
        }).done(function (data) {
            myPageManage.findAllMenu();
            myPageManage.findAllMyPage();
        }).fail(function (error) {
        });

    },
}

let allMenu_gridOptions = {
    columnDefs: [],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        myPageManage.findAllMenu();
    },
    onRowClicked(event) {
        console.log(event)
        myPageManage.saveMyPage(event.node.data)
        console.log(event.node.data)
    }
}
let myPageManage_gridOptions = {
    columnDefs: [
    ],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellEditingStopped (event) {
        myPageManage.saveMyPageDtl(event.node.data)
    },
    onGridReady() {
        myPageManage.findAllMyPage();
    },
    onRowClicked(event) {
        console.log(event)
        console.log(event.node.data)
    }
}

myPageManage.init();