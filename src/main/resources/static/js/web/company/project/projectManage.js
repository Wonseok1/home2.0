projectManage = {
    init() {
        grid.makeColumn(projectManage_gridOptions, "projectManage_grid");
        projectManage.formDisable('default');

        $("#projectManage_btnNew").on("click", function () {
            projectManage.addNew();
        });

        $("#projectManage_btnSave").on("click", function () {
            projectManage.save(projectManage_saveType.value);
        });
        
        $("#projectManage_btnDelete").on("click", function () {
            if (projectManage_gridOptions.api.getSelectedRows().length > 0) {
                let chk = confirm("삭제하시겠습니까?");
                if (chk == true) {
                    projectManage.delete();
                }
            } else {
                alert("삭제할 행을 선택해주세요");
            }
        });

    },

    findAll() {
        $.ajax({
            type: 'GET',
            url: REST_COMPANY_PROJECT_MANAGE_URL,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            projectManage_gridOptions.api.setRowData(data);
        }).fail(function (error) {
        });
    },

    addNew() {
        projectManage_gridOptions.api.deselectAll();
        projectManage.formDisable('new')
    },

    save(type){

        let el = document.querySelector('#projectManage_form').elements;
        let datas = {};
        for(const e of el){
            let id = e.id.split("_")[1]
            datas[id] = e.value
        }

        let form = document.querySelector('#projectManage_form');

        $.ajax({
            type:'POST',
            url: REST_COMPANY_PROJECT_MANAGE_URL + '/' + type,
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(datas)
        }).done(function(data){
            console.log(data)
            if(data === 'update'){
                alert('수정되었습니다.')
                form.reset();
                projectManage.findAll();
                projectManage.formDisable('default')
            }else{
                alert('신규 저장되었습니다.')
                form.reset();
                projectManage.findAll();
                projectManage.formDisable('default')
            }
        });
    }, //save() END


    delete(){
        let selectedRows = projectManage_gridOptions.api.getSelectedRows()[0];
        let form = document.querySelector('#projectManage_form');

        $.ajax({
            type: 'DELETE',
            url : REST_COMPANY_PROJECT_MANAGE_URL + '/delete',
            contentType: 'application/json; charset=utf-8',
            data : JSON.stringify(selectedRows)
        }).done(function (data){
            if(data != null){
                alert("삭제되었습니다.");
                form.reset();
                projectManage.findAll();
                projectManage.formDisable('default')
            }
        }).fail(function (error){
        });
    }, //delete() END

    formDisable(type) {

        let form = document.querySelector('#projectManage_form');

        let newBtn = document.getElementById('projectManage_btnNew')
        let saveBtn = document.getElementById('projectManage_btnSave');
        let delBtn = document.getElementById('projectManage_btnDelete')

        let el = form.elements;

        switch (type){
            case 'new':
                projectManage_saveType.value = 'save';

                form.reset();
                newBtn.disabled = false
                newBtn.classList.remove('disabled:opacity-50')
                newBtn.classList.add('hover:bg-zinc-700')

                saveBtn.disabled = false
                saveBtn.classList.remove('disabled:opacity-50')
                saveBtn.classList.add('hover:bg-zinc-700')

                delBtn.disabled = true
                delBtn.classList.remove('hover:bg-rose-600')
                delBtn.classList.add('disabled:opacity-50')

                for (const item of el) {
                    item.disabled = false;
                }
                break;
            case 'update':
                projectManage_saveType.value = 'update';

                form.reset();
                newBtn.disabled = false
                newBtn.classList.remove('disabled:opacity-50')
                newBtn.classList.add('hover:bg-zinc-700')

                saveBtn.disabled = false
                saveBtn.classList.remove('disabled:opacity-50')
                saveBtn.classList.add('hover:bg-zinc-700')

                delBtn.disabled = false
                delBtn.classList.add('hover:bg-rose-600')
                delBtn.classList.remove('disabled:opacity-50')

                let selectRow = projectManage_gridOptions.api.getSelectedRows()[0];
                for (const item of el) {
                    let splitEl = item.id.split("_")[1];
                    for(const row of Object.keys(selectRow)){
                        if(row === splitEl){
                            item.value = selectRow[row];
                            item.disabled = false;
                        }
                    }
                }

                break;
            default:
                newBtn.disabled = false
                newBtn.classList.remove('disabled:opacity-50')
                newBtn.classList.add('hover:bg-zinc-700')

                saveBtn.disabled = true
                saveBtn.classList.remove('hover:bg-zinc-700')
                saveBtn.classList.add('disabled:opacity-50')

                delBtn.disabled = true
                delBtn.classList.remove('hover:bg-rose-600')
                delBtn.classList.add('disabled:opacity-50')

                for (const item of el) {
                    item.disabled = true;
                }
                break;

        }
    },



}

let projectManage_gridOptions = {
    columnDefs: [],
    defaultColDef: {
        cellStyle: {textAlign: 'center'},
        filter: 'agTextColumnFilter',           //어떤 필터를 적용할 것인가
        filterParams: {
            buttons: ['reset', 'apply'],
            closeOnApply: true,
        },
        floatingFilter: true,                   //상단 필터 여부(항상 떠있는지)
        resizable: true,                        //크기 조절 가능 여부
        sortable: true,                         //정렬 가능 여부
    },
    localeText: AG_GRID_LOCALE_KO,
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    editType: 'fullRow',
    // example event handler
    onCellClicked: params => {
    },
    onGridReady() {
        projectManage.findAll();
    },
    onRowClicked(event) {
        projectManage.formDisable('update');
    }
};



projectManage.init();