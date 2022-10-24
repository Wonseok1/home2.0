// https://github.com/daweilv/treejs


const systemAuthGrid = {
    init() {
        grid.makeColumn(systemAuthGrid_gridOptions, "systemAuthGrid_grid");
        grid.makeColumn(systemAuthGrid_gridAuthOptions, "systemAuthGrid_gridAuth");

        systemAuthGrid_btnSave.onclick = function () {
            systemAuthGrid.saveMenuAuth();
        };

    },

    findAuth() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_GRID_URL + '/auth',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemAuthGrid_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    findGrid() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_GRID_URL + '/grid',
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            systemAuthGrid_gridAuthOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    saveMenuAuth() {
        let saveList = [];
        let accessAuthYn = true;
        let writeAuthYn = true;

        if (systemAuthGrid_gridAuthOptions.api.getSelectedRows()[0].accessAuthYn !== null) {
            accessAuthYn = systemAuthGrid_gridAuthOptions.api.getSelectedRows()[0].accessAuthYn
        }
        if (systemAuthGrid_gridAuthOptions.api.getSelectedRows()[0].writeAuthYn !== null) {
            writeAuthYn = systemAuthGrid_gridAuthOptions.api.getSelectedRows()[0].writeAuthYn
        }

        let gridRow = {
            authGridPk: systemAuthGrid_gridAuthOptions.api.getSelectedRows()[0].authGridPk,
            authId: systemAuthGrid_gridOptions.api.getSelectedRows()[0].authId,
            gridId: systemAuthGrid_gridAuthOptions.api.getSelectedRows()[0].gridId,
            accessAuthYn: accessAuthYn,
            writeAuthYn: writeAuthYn
        }

        saveList.push(gridRow)

        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_AUTH_GRID_URL,
            data: JSON.stringify(saveList),
            contentType: 'application/json; charset=utf-8',
        }).done(function () {
            systemAuthGrid.findAllGridListWhenClickAuth();
        }).fail(function (error) {
        });
    },

    findAllGridListWhenClickAuth() {
        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_AUTH_GRID_URL + '/' + systemAuthGrid_gridOptions.api.getSelectedRows()[0].authId,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            console.log("auth grid data")
            console.log(data)
            systemAuthGrid_gridAuthOptions.api.setRowData(data);

        }).fail(function (error) {
        });
    },

};

let systemAuthGrid_gridOptions = {
    columnDefs: [],
    // default col def properties get applied to all columns
    defaultColDef: {sortable: true},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    // example event handler
    onCellEditingStopped(event) {

    },
    onGridReady() {
        systemAuthGrid.findAuth();
    },
    onRowClicked(event) {
        systemAuthGrid.findAllGridListWhenClickAuth();
    }
}

let systemAuthGrid_gridAuthOptions = {
    columnDefs: [],
    // default col def properties get applied to all columns
    defaultColDef: {},
    rowSelection: 'multiple', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    // editType: 'fullRow',
    // example event handler
    onCellEditingStopped(event) {

    },
    onGridReady() {
        systemAuthGrid.findGrid();
    },
    onRowClicked(event) {
        if (systemAuthGrid_gridOptions.api.getSelectedRows().length === 0) {
            itzAlert.notice(itzAlert.makeMsgJson("권한 선택", "권한 선택은 필수입니다.", "확인"), systemAuthGrid.findGrid);

        }
    }
}

// systemAuthGrid_divTree
systemAuthGrid.init();
