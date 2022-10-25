bookList = {
    init() {
        grid.makeColumn(bookList_gridOptions, "bookList_grid");
        bookList_btnNew.onclick = function () {
            window.location.href = '/book/detail';
        };
    }
}

let bookList_gridOptions = {
    columnDefs: [
    ],
    defaultColDef: {
        sortable: true,                         //정렬 가능 여부
    },
    localeText: AG_GRID_LOCALE_KO,
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        systemAuthManage.findAll();
    },
    onRowClicked(event) {
        console.log(event)
    }
}



bookList.init();