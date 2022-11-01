mailAll = {
    init() {
        grid.makeColumn(mailAll_gridOptions, "mailAll_grid");
    },

}
mailAll_gridOptions = {
    columnDefs: [
    ],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true, filter: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    suppressRowClickSelection: true,
    columnTypes: agGridCommonOption.columnTypes,
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
    },
    onRowClicked(event) {
    }
}

mailAll.init()