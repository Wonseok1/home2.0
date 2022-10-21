var commonInit = {
    init() {
        commonInit.initGrid();
        commonInit.initMenu();



    },
    initMenu() {
        divMenuLeft.onclick = function () {
            menu.expandMenu();
        };
        divRight.onclick = function () {
            menu.shrinkMenu();
            const elementList = document.getElementsByClassName('menu-spread');
            for (var i=0; i<elementList.length; i++) {
                elementList[i].classList.add("hidden");
            }
        };
        //menu
        /*divMainLogo.onclick = function () {
            // divMenuDetail.classList.toggle("hidden");
            // divMenuDetail.classList.remove("hidden");
            // divMenu.classList.add("hidden");
            $("#divMenuDetail").show(200);
            $("#divMenu").hide(200);
        };
        btnCloseDetailMenu.onclick = function () {
            // divMenuDetail.classList.add("hidden");
            // divMenu.classList.remove("hidden");
            $("#divMenuDetail").hide(200);
            $("#divMenu").show(200);
        };*/

        /* divMenu.onmouseover = function () {
             // divMenuDetail.classList.add("hidden");
             // divMenu.classList.remove("hidden");
             const elementList = document.getElementsByClassName('menu-spread');

             for (var i=0; i<elementList.length; i++) {
                 console.log($(".menu-spread")[i]);
                 $(".menu-spread")[i].show(500);
                 // elementList.item(i).classList.add('hueframe');
             }
         };

         divMenu.onmouseout = function () {
             // divMenuDetail.classList.add("hidden");
             // divMenu.classList.remove("hidden");
             const elementList = document.getElementsByClassName('menu-spread');

             for (var i=0; i<elementList.length; i++) {
                 $(".menu-spread")[i].hide(500);
                 // elementList.item(i).classList.add('hueframe');
             }
         };*/
        //menu
        menu.loadMenu();
    },
    initGrid() {

    },
    loadMainPage() {
        //메인페이지로 설정된 메뉴info들고와서
        //loadPage하기
        // common.loadPage()
    }

}

commonInit.init();