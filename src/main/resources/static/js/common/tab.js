let tabList = new LinkedList();
let selectedPageId = '';
let tab = {
    make(menuInfo) {
        let tabHtml  = `<div id="tab_${menuInfo.menuId}" class="rounded-t-xl tab-selected" >`;
        tabHtml +=      `<div onclick="tab.close(selectedPageId);tab.open('${menuInfo.menuId}');" class="flex">`
        tabHtml +=          `<i class="${menuInfo.menuIcon} flex-shrink-0 w-auto mt-1 mr-1" ></i>`
        tabHtml +=          `<div class="flex-1 ml-2" style="white-space: nowrap;" >${menuInfo.menuNm}</div>`
        tabHtml +=      `</div>`
        tabHtml +=      `<i class="fa-solid fa-xmark flex-shrink-0 w-auto ml-1 mt-1 " style="cursor:pointer;" onclick="tab.delete('${menuInfo.menuId}');"></i>`
        tabHtml += `</div>`
        $("#divTab").append(tabHtml);
        tabList.insertFirst(menuInfo.menuId);
    },
    openPage(menuInfo) {
        if (selectedPageId != menuInfo.menuId) {
            if (tabList.checkExist(menuInfo.menuId)) {
                if (selectedPageId) {
                    tab.close(selectedPageId);
                }
                tab.open(menuInfo.menuId);
                selectedPageId = menuInfo.menuId;
            }else{
                common.loadPage(menuInfo, false);
                tab.make(menuInfo);
                if (selectedPageId) {
                    tab.close(selectedPageId);
                }
                selectedPageId = menuInfo.menuId;
            }
        }

    },
    openMyPage(menuInfo) {
        common.loadPage(menuInfo, true);
        tab.make(menuInfo);
    },
    open(pageId) {
        console.log("open");
        $("#tab_"+pageId).removeClass('tab-unselected');
        $("#tab_"+pageId).addClass('tab-selected');
        $("#page_" + pageId).removeClass("hidden");
        selectedPageId = pageId;
    },
    close(pageId) {
        console.log("close");
        $("#tab_"+pageId).removeClass('tab-selected');
        $("#tab_"+pageId).addClass('tab-unselected');
        $("#page_" + pageId).addClass("hidden");
    },
    delete(pageId) {
        console.log("delete")
        const tabDiv = document.getElementById('tab_'+pageId);
        tabDiv.remove();
        const pageDiv = document.getElementById('page_'+pageId);
        pageDiv.remove();

        tabList.removeAt(tabList.checkWhere(pageId));
        if (tabList.size > 0) {
            console.log(tabList.head.data)
            tab.open(tabList.head.data);
        }

    },

}