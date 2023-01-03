
var menu = {
    loadMenu() {
        $.ajax({
            type: 'GET',
            url: REST_COMMON_MENU_URL,
            // url: "/api/common/menu/findAll",
            contentType: 'application/json; charset=utf-8'
        }).done(function (menuList) {
            menu.makeMenu(menuList);
            menu.makeMobileMenu(menuList);
        }).fail(function (error) {
        });
    },
    changeArrow(menuInfo) {
        const menuArrowDiv = document.getElementById('menu_arrow_'+menu.menuId);
        menuArrowDiv.classList.toggle("arrow-up");
        menuArrowDiv.classList.toggle("arrow-down");
    },
    makeMobileMenu(menuList) {
        let tempArrayList = new Array();
        console.log(menuList);

    },
    makeMenu(menuList) {
        let tempArrayList = new Array();
        console.log(menuList);
        menuList.forEach(function (menuInfo) {
            let menuHtml = '';
            if (menuInfo.menuPageId) {
                //링크되는 페이지 있으면 페이지 열어줌
                menuHtml += `<button 
                                    id="menu_${menuInfo.menuId}" 
                                    onclick="menu_${menuInfo.menuId}DivForAppend.classList.toggle('hidden');" 
                                    type="button" 
                                    class="bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} hover:bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" 
                                    aria-controls="menu_${menuInfo.menuId}DivForAppend" aria-expanded="false">`;

                // menuHtml += `<button id="menu_${menu.menuId}" onclick="menu_${menu.menuId}DivForAppend.classList.toggle('hidden');tab.open('/getPage${menu.menuParentUrl}${menu.menuUrl}/${menu.menuPageId}')" type="button" class="bg-slate-${(800-(100*parseInt(menu.menuLv)))} hover:bg-slate-${(800-(100*parseInt(menu.menuLv)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" aria-controls="menu_${menu.menuId}DivForAppend" aria-expanded="false">`;
            }else{
                menuHtml += `<button 
                                    id="menu_${menuInfo.menuId}" 
                                    onclick="menu_${menuInfo.menuId}DivForAppend.classList.toggle('hidden');" 
                                    type="button" 
                                    class="bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} hover:bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" 
                                    aria-controls="menu_${menuInfo.menuId}DivForAppend" aria-expanded="false">`;
            }
            menuHtml +=     `<i class="${menuInfo.menuIcon} mr-3 flex-shrink-0 h-6 w-6 "></i>`;
            menuHtml +=     `<span class="flex-1 text-sm ml-2" style="white-space: nowrap;">${menuInfo.menuNm}</span>`;
            menuHtml +=  `</button>`;
            menuHtml +=  `<div class="menu-spread space-y-1 hidden ml-2" id="menu_${menuInfo.menuId}DivForAppend"></div>`;
            if (menuInfo.menuLv == 0) {
                $("#divMenu_divForAppend").append(menuHtml);
            }else {
                if (!tempArrayList.includes(menuInfo.menuParentId)) {
                    //let arrowIcon = '<i class="fa-solid fa-angle-right ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-100 transition-colors ease-in-out duration-150"></i>';
                    // let arrowIcon = `<div id="menu_arrow_${menuInfo.menuParentId}"  class="arrow-down ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-100 transition-colors ease-in-out duration-150"></div>`
                    // $("#menu_" + menuInfo.menuParentId).append(arrowIcon);
                    tempArrayList.push(menuInfo.menuParentId);
                }
                $("#menu_"+ menuInfo.menuParentId+"DivForAppend").append(menuHtml);
            }
            const menuDiv = document.getElementById('menu_'+menuInfo.menuId);
            if (menuInfo.menuPageId && menuDiv) {
                menuDiv.addEventListener('click', function () {
                    tab.openPage(menuInfo);
                });
            }
        });
        menuList.forEach(function (menuInfo) {
            let menuHtml = '';
            if (menuInfo.menuPageId) {
                menuHtml += `<button 
                                    id="mobileMenu_${menuInfo.menuId}" 
                                    onclick="mobileMenu_${menuInfo.menuId}DivForAppend.classList.toggle('hidden');" 
                                    type="button" 
                                    class="bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} hover:bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" 
                                    aria-controls="mobileMenu_${menuInfo.menuId}DivForAppend" aria-expanded="false">`;
            }else{
                menuHtml += `<button 
                                    id="mobileMenu_${menuInfo.menuId}" 
                                    onclick="mobileMenu_${menuInfo.menuId}DivForAppend.classList.toggle('hidden');" 
                                    type="button" 
                                    class="bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} hover:bg-slate-${(800-(100*parseInt(menuInfo.menuLv)))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" 
                                    aria-controls="mobileMenu_${menuInfo.menuId}DivForAppend" aria-expanded="false">`;
            }
            menuHtml +=     `<i class="${menuInfo.menuIcon} mr-3 flex-shrink-0 h-6 w-6 "></i>`;
            menuHtml +=     `<span class="flex-1 text-sm ml-2" style="white-space: nowrap;">${menuInfo.menuNm}</span>`;
            menuHtml +=  `</button>`;
            menuHtml +=  `<div class="menu-spread space-y-1 hidden ml-2" id="mobileMenu_${menuInfo.menuId}DivForAppend"></div>`;
            if (menuInfo.menuLv == 0) {
                $("#divMobileMenu_divForAppend").append(menuHtml);
            }else {
                if (!tempArrayList.includes(menuInfo.menuParentId)) {
                    tempArrayList.push(menuInfo.menuParentId);
                }
                $("#mobileMenu_"+ menuInfo.menuParentId+"DivForAppend").append(menuHtml);
            }
            const menuDiv = document.getElementById('mobileMenu_'+menuInfo.menuId);
            if (menuInfo.menuPageId && menuDiv) {
                menuDiv.addEventListener('click', function () {
                    tab.openPage(menuInfo);
                });
            }
        });
    },
    makeMyMenu(menuList) {
        menuList.forEach(function (menuInfo) {
            let menuHtml = '';
            menuHtml += `<button id="myMenu_${menuInfo.menuId}" onclick="myMenu_divForAppend.classList.toggle('hidden');" type="button" class="bg-slate-${(800-(100*3))} hover:bg-slate-${(800-(100*3))} text-white hover:text-gray-100 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white" >`;
            menuHtml +=     `<i class="${menuInfo.menuIcon} mr-3 flex-shrink-0 h-6 w-6 "></i>`;
            menuHtml +=     `<span class="flex-1 text-sm ml-2" style="white-space: nowrap;">${menuInfo.menuNm}</span>`;
            menuHtml +=  `</button>`;
            $("#myMenu_divForAppend").append(menuHtml);
            const menuDiv = document.getElementById('myMenu_'+menuInfo.menuId);
            menuDiv.addEventListener('click', function () {
                tab.openPage(menuInfo);
            });
        });
    },
    expandMenu() {
        divMenu.classList.remove("md:w-14");
        divMenu.classList.add("md:w-64");
    },
    shrinkMenu() {
        divMenu.classList.remove("md:w-64");
        divMenu.classList.add("md:w-14");

    },
    loadMyMenu() {
        $.ajax({
            type: 'GET',
            url: REST_COMMON_MENU_URL+"/myMenu",
            // url: "/api/common/menu/findAll",
            contentType: 'application/json; charset=utf-8'
        }).done(function (menuList) {
            menu.makeMyMenu(menuList);
        }).fail(function (error) {
        });
    },
    loadMyPage() {
        $.ajax({
            type: 'GET',
            url: REST_COMMON_MENU_URL+"/myPage",
            // url: "/api/common/menu/findAll",
            contentType: 'application/json; charset=utf-8'
        }).done(function (menuList) {

            let firstPage = '';
            menuList.forEach(function (menuInfo) {
                if (!firstPage) {
                    firstPage = menuInfo;
                    tab.openPage(firstPage);
                }else{
                    tab.openMyPage(menuInfo);
                    tab.close(menuInfo.menuId);
                }
            });

        }).fail(function (error) {
        });
    }
};