bookList = {
    init() {
        grid.makeColumn(bookList_gridOptions, "bookList_grid");
        bookList_btnNew.onclick = function () {
            window.location.href = '/book/detail';
        };
    },
    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_BOOK_URL,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            bookList_gridOptions.api.setRowData(data);
        }).fail(function (error) {

        });
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
        bookList.findAll();
    },
    onRowClicked(event) {
        location.href = REST_BOOK_DETAIL_URL+"/"+event.node.data.bookPk;
    }
}



bookList.init();