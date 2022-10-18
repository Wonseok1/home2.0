let sock = new SockJS("/itz-ws");
let ws = Stomp.over(sock);
let reconnect = 0;
let tempEventMsg ;
const eventSocket = {
    init() {
        const _this = this;
        _this.connect();
    },
    connect() {
        ws.connect({}, function (frame) {
            //전체 이벤트
            ws.subscribe("/sub/ping", function (message) {
                const recv = JSON.parse(message.body);
                console.log(recv);
            });
            ws.subscribe("/sub/event/page", function (message) {
                const recv = JSON.parse(message.body);
                eventSocket.getPageEvent(recv);
                tempEventMsg = recv;
                console.log(recv)
            });

        }, function (error) {
            if (reconnect++ <= 5) {
                setTimeout(function () {
                    console.log("connection reconnect");
                    sock = new SockJS("/ws-stomp");
                    ws = Stomp.over(sock);
                    eventSocket.connect();
                }, 5000);
            }
        });
    },
    test() {
        console.log("Test");
    },
    getPageEvent(recvEvent) {
        console.log(recvEvent.eventObjectNm);
        console.log(eval(recvEvent.eventObjectNm));
        console.log(eval( recvEvent.eventeventRefreshFunctionNm));
        if (typeof (eval(recvEvent.eventObjectNm)) != undefined) {
            eval(recvEvent.eventObjectNm + '.' + recvEvent.eventeventRefreshFunctionNm);
        }
    },
    pubPageEvent(uri, page, type, sender) {
        eventSocket.sendEvent(
            "/pub/event/page",
            {
                uri: "/test",
            }
        )
    },
    sendEvent(event, url) {
        ws.send(event, {},
            JSON.stringify(
                url)
            /*{
                type : 'OPEN_CHAT',
                senderId : myId,
                senderNm : localUserInfo.userNm,
                receiverId : userId,
                receiverNm : userNm
            }*/
        );
    }

}