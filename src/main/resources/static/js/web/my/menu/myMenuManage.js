const myMenuManage = {
    init() {
        grid.makeColumn(allMenuManage_gridOptions, "allMenuManage_grid");

        grid.makeColumn(myMenuManage_gridOptions, "myMenuManage_grid");

        $("#myMenuManage_btnDelete").on("click", function () {
            myMenuManage.deleteMyMenu();
        });

    },

    findMenuExceptMine() {
        $.ajax({
            type: 'GET',
            url: REST_MY_MENU_URL+ '/menu',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            allMenuManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    findAllMyMenu() {
        $.ajax({
            type: 'GET',
            url: REST_MY_MENU_URL+ '/myMenu',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            myMenuManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    saveMyMenu (data) {
        $.ajax({
            type: 'POST',
            url: REST_MY_MENU_URL,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            myMenuManage.findMenuExceptMine();
            myMenuManage.findAllMyMenu();
        }).fail(function (error) {
        });
    },


    deleteMyMenu () {
        $.ajax({
            type: 'DELETE',
            url: REST_MY_MENU_URL,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(myMenuManage_gridOptions.api.getSelectedRows()),
        }).done(function (data) {
            myMenuManage.findMenuExceptMine();
            myMenuManage.findAllMyMenu();
        }).fail(function (error) {
        });

    },

}
let allMenuManage_gridOptions = {
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
        myMenuManage.findMenuExceptMine();
    },
    onRowClicked(event) {
        console.log(event)
        myMenuManage.saveMyMenu(event.node.data)
        console.log(event.node.data)
    }
}
    let myMenuManage_gridOptions = {
        columnDefs: [
        ],
        // default col def properties get applied to all columns
        defaultColDef: {sortable: true, filter: true},
        rowSelection: 'multiple', // allow rows to be selected
        animateRows: true, // have rows animate to new positions when sorted
        editType: 'fullRow',
        // example event handler
        onCellEditingStopped (event) {
        },
        onGridReady() {
            myMenuManage.findAllMyMenu();
        },
        onRowClicked(event) {
            console.log(event)
            console.log(event.node.data)
        }
}
myMenuManage.init();