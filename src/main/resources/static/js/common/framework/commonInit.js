const commonInit = {
    init() {
        const _this = this;
        _this.initMenu();
        _this.initGrid();
        // _this.initEventSocket();
        _this.initMainHeaderBtn();

        btnMobileMenu.onclick = function () {
            divMobileMenu.classList.toggle("hidden")
        };
        btnMobileMenuClose.onclick = function () {
            console.log("test")
            divMobileMenu.classList.add("hidden")
        };

    },
    initMenu() {
        divMenu.onclick = function () {
            menu.expandMenu();
        };
        divRight.onclick = function () {
            menu.shrinkMenu();
            const elementList = document.getElementsByClassName('menu-spread');
            for (var i=0; i<elementList.length; i++) {
                elementList[i].classList.add("hidden");
            }
        };
        menu.loadMenu();
        menu.loadMyMenu();
        menu.loadMyPage();
    },
    initGrid() {

    },
    // initEventSocket() {
    //     eventSocket.init();
    // },
    loadMainPage() {
        //메인페이지로 설정된 메뉴info들고와서
        //loadPage하기
        // common.loadPage()
    },
    initMainHeaderBtn() {
        mainHeader_btnLogout.onclick = function () {
            mainHeader_btnLogout.classList.toggle('main-header-btn-selected')
            mainHeader_btnLogout.classList.toggle('main-header-btn-unselected')
            window.location.href = '/logoutProcess';
        };

    }

}

commonInit.init();