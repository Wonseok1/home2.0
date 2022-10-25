let onFocusMenu ;
const systemMenuManage ={
    init() {
        const _this = this;
        _this.findAll();
        systemGridManage_btnNew.onclick = function () {
            _this.addNewMenu();
        };
        systemGridManage_btnSave.onclick = function () {
            _this.save();
        };
        systemGridManage_btnDelete.onclick = function () {
            _this.delete();
        };

    },
    findAll(){

        $.ajax({
            type: 'GET',
            url: REST_SYSTEM_MENU_MANAGE_URL,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            console.log(data)
            systemMenuManage_divForAppend.innerHTML = '';
            systemMenuManage.makeMenu(data);
            systemMenuManage.clearForm();
        }).fail(function (error) {
        });
    },
    makeMenu(menuList) {
        let tempArrayList = new Array();
        menuList.forEach(function (menu) {
            let menuHtml = '';
            menuHtml += `<button id="systemMenuManage_${menu.menuId}" type="button" class="bg-slate-${(800-(100*parseInt(menu.menuLv)))} hover:bg-slate-${(800-(100*parseInt(menu.menuLv)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" aria-controls="systemMenuManage_${menu.menuId}DivForAppend" aria-expanded="false">`;
            menuHtml +=     `<i class="${menu.menuIcon} mr-3 flex-shrink-0 h-6 w-6 "></i>`;
            menuHtml +=     `<span class="flex-1 text-sm ml-2" style="white-space: nowrap;">${menu.menuNm}</span>`;
            menuHtml +=  `</button>`;
            menuHtml +=  `<div class="space-y-1  ml-2" id="systemMenuManage_${menu.menuId}DivForAppend"></div>`;
            if (menu.menuLv == 0) {
                $("#systemMenuManage_divForAppend").append(menuHtml);
            }else {
                $("#systemMenuManage_"+ menu.menuParentId+"DivForAppend").append(menuHtml);
            }
            const menuDiv = document.getElementById('systemMenuManage_'+menu.menuId);
            menuDiv.addEventListener('click', function () {
                systemMenuManage.clickMenu(menu);
            });

        });
    },
    clickMenu(menu) {
        console.log(menu)
        onFocusMenu = menu;
        systemGridManage_menuId.value = menu.menuId;
        systemGridManage_menuNm.value = menu.menuNm;
        systemGridManage_menuComment.value = menu.menuComment;
        systemGridManage_menuLevel.value = menu.menuLv;
        systemGridManage_menuIcon.value = menu.menuIcon;
        systemGridManage_menuPageId.value = menu.menuPageId;
        systemGridManage_menuParentId.value = menu.menuParentId;
        systemGridManage_menuParentUrl.value = menu.menuParentUrl;
        systemGridManage_menuUrl.value = menu.menuUrl;
        systemGridManage_menuPopupType.value = menu.menuPopupType;
        systemGridManage_menuPopupYn.value = menu.menuPopupYn;
        systemGridManage_ordNo.value = menu.ordNo;
        systemGridManage_useYn.value = menu.useYn;
    },
    clearForm() {
        systemGridManage_menuId.value           = "";
        systemGridManage_menuNm.value           = "";
        systemGridManage_menuComment.value      = "";
        systemGridManage_menuLevel.value        = "";
        systemGridManage_menuIcon.value        = "";
        systemGridManage_menuPageId.value       = "";
        systemGridManage_menuParentId.value     = "";
        systemGridManage_menuParentUrl.value    = "";
        systemGridManage_menuUrl.value          = "";
        systemGridManage_menuPopupType.value    = "";
        systemGridManage_menuPopupYn.value      = "";
        systemGridManage_ordNo.value            = "";
        systemGridManage_useYn.value            = "";

    },
    addNewMenu() {
        systemMenuManage.clearForm();
        if (onFocusMenu) {
            let menuHtml = '';
            menuHtml += `<button id="systemMenuManage_newMenu" type="button" class="bg-slate-${(800-(100*parseInt(onFocusMenu.menuLv+1)))} hover:bg-slate-${(800-(100*parseInt(onFocusMenu.menuLv+1)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" aria-controls="systemMenuManage_${menu.menuId}DivForAppend" aria-expanded="false">`;
            menuHtml +=     `<i class="${onFocusMenu.menuIcon} mr-3 flex-shrink-0 h-6 w-6 "></i>`;
            menuHtml +=     `<input class="bg-slate-${(800-(100*parseInt(onFocusMenu.menuLv+1)))}  flex-1 text-sm ml-2" style="white-space: nowrap;" id="systemMenuManage_newMenuInput"></input>`;
            menuHtml +=  `</button>`;
            menuHtml +=  `<div class="space-y-1  ml-2" id="systemMenuManage_newMenuDivForAppend"></div>`;

            $("#systemMenuManage_" + onFocusMenu.menuId + "DivForAppend").append(menuHtml);

            const menuDiv = document.getElementById('systemMenuManage_newMenuInput');
            menuDiv.addEventListener('keyup', function () {
                systemGridManage_menuNm.value = systemMenuManage_newMenuInput.value;
            });

            const menuForm = document.getElementById('systemGridManage_menuNm');
            menuForm.addEventListener('keyup', function () {
                systemMenuManage_newMenuInput.value = systemGridManage_menuNm.value;
            });
            systemGridManage_menuLevel.value = parseInt(onFocusMenu.menuLv)+1;
            systemGridManage_menuParentId.value = onFocusMenu.menuId;
            if (onFocusMenu.menuParentUrl) {
                systemGridManage_menuParentUrl.value = onFocusMenu.menuParentUrl+ onFocusMenu.menuUrl;
            }else{
                systemGridManage_menuParentUrl.value = onFocusMenu.menuUrl;
            }
            if (onFocusMenu.menuParentId) {
                systemGridManage_menuId.value = onFocusMenu.menuId+"_"
            }
        }else{
            let menuHtml = '';
            menuHtml += `<button id="systemMenuManage_newMenu" type="button" class="bg-slate-800 hover:bg-slate-900 text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" aria-controls="systemMenuManage_DivForAppend" aria-expanded="false">`;
            menuHtml +=     `<i class="fa-solid fa-gear} mr-3 flex-shrink-0 h-6 w-6 "></i>`;
            menuHtml +=     `<input class="bg-slate-800  flex-1 text-sm ml-2" style="white-space: nowrap;" id="systemMenuManage_newMenuInput"></input>`;
            menuHtml +=  `</button>`;
            menuHtml +=  `<div class="space-y-1  ml-2" id="systemMenuManage_newMenuDivForAppend"></div>`;

            $("#systemMenuManage_divForAppend").append(menuHtml);

            const menuDiv = document.getElementById('systemMenuManage_newMenuInput');
            menuDiv.addEventListener('keyup', function () {
                systemGridManage_menuNm.value = systemMenuManage_newMenuInput.value;
            });

            const menuForm = document.getElementById('systemGridManage_menuNm');
            menuForm.addEventListener('keyup', function () {
                systemMenuManage_newMenuInput.value = systemGridManage_menuNm.value;
            });

            systemGridManage_menuLevel.value = 0;
        }

        systemGridManage_menuUrl.value          = "/";
        systemGridManage_menuPopupYn.value      = false;
        systemGridManage_ordNo.value            = 0;
        systemGridManage_useYn.value            = true;

    },
    save() {
        var menuData = {
            menuId           : systemGridManage_menuId.value       ,
            menuNm           : systemGridManage_menuNm.value       ,
            menuComment      : systemGridManage_menuComment.value  ,
            menuIcon         : systemGridManage_menuIcon.value  ,
            menuLv           : systemGridManage_menuLevel.value    ,
            menuPageId       : systemGridManage_menuPageId.value   ,
            menuParentId     : systemGridManage_menuParentId.value ,
            menuParentUrl    : systemGridManage_menuParentUrl.value,
            menuUrl          : systemGridManage_menuUrl.value      ,
            menuPopupType    : systemGridManage_menuPopupType.value,
            menuPopupYn      : systemGridManage_menuPopupYn.value  ,
            ordNo            : systemGridManage_ordNo.value        ,
            useYn            : systemGridManage_useYn.value        ,
        }
        console.log(menuData);
        $.ajax({
            type: 'POST',
            url: REST_SYSTEM_MENU_MANAGE_URL ,
            data: JSON.stringify(menuData),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            itzAlert.notice(itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인") , systemMenuManage.findAll );
        }).fail(function (error) {
        });
    },
    delete() {
        var menuData = {
            menuId           : systemGridManage_menuId.value       ,
            menuNm           : systemGridManage_menuNm.value       ,
            menuComment      : systemGridManage_menuComment.value  ,
            menuIcon         : systemGridManage_menuIcon.value  ,
            menuLv           : systemGridManage_menuLevel.value    ,
            menuPageId       : systemGridManage_menuPageId.value   ,
            menuParentId     : systemGridManage_menuParentId.value ,
            menuParentUrl    : systemGridManage_menuParentUrl.value,
            menuUrl          : systemGridManage_menuUrl.value      ,
            menuPopupType    : systemGridManage_menuPopupType.value,
            menuPopupYn      : systemGridManage_menuPopupYn.value  ,
            ordNo            : systemGridManage_ordNo.value        ,
            useYn            : systemGridManage_useYn.value        ,
        }
        $.ajax({
            type: 'DELETE',
            url: REST_SYSTEM_MENU_MANAGE_URL ,
            data: JSON.stringify(menuData),
            contentType: 'application/json; charset=utf-8',
        }).done(function (data) {
            systemMenuManage.findAll();

        }).fail(function (error) {
        });
    }

}



systemMenuManage.init();