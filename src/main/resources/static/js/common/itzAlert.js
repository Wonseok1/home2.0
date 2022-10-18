const itzAlert = {
    /**
     * msgBoxJson: 알림에 들어갈 데이터 형식 itzAlert.makeMsgJson 함수사용
     * callback: 알림 이후에 확인 버튼을 눌렀을때 실행할 콜백함수
     * */
    notice(msgBoxJson, callback) {
        divNotice.classList.remove("hidden");
        notice_title.innerHTML = msgBoxJson?.title ?? "알림"
        notice_message.innerHTML = msgBoxJson?.message ?? "완료되었습니다."
        notice_btn.innerHTML = msgBoxJson?.confirm ?? "확인"
        notice_btn.addEventListener('click', function () {
            if (callback) {
                callback();
            }
            divNotice.classList.add('hidden');
            notice_btn.removeEventListener('click',onclick);
        });
    },
    /**
     * msgBoxJson: 알림에 들어갈 데이터 형식 itzAlert.makeMsgJson 함수사용
     * callback: 알림 이후에 확인 버튼을 눌렀을때 실행할 콜백함수
     * */
    confirm(msgBoxJson, callback) {
        divConfirm.classList.remove("hidden");
        confirm_title.innerHTML = msgBoxJson?.title ?? "알림"
        confirm_message.innerHTML = msgBoxJson?.message ?? "완료되었습니다."
        confirm_btn_confirm.innerHTML = msgBoxJson?.confirm ?? "확인"
        confirm_btn_cancel.innerHTML = msgBoxJson?.cancel ?? "취소"

        confirm_btn_confirm.addEventListener('click', function () {
            if (callback) {
                callback();
            }
            divConfirm.classList.add('hidden');
            confirm_btn_cancel.removeEventListener('click',onclick);
        });
        confirm_btn_cancel.addEventListener('click', function () {
            confirm_btn_cancel.removeEventListener('click',onclick);
        });

    },
    /**
     * msgBoxJson: 알림에 들어갈 데이터 형식 itzAlert.makeMsgJson 함수사용
     * callback: 알림 이후에 확인 버튼을 눌렀을때 실행할 콜백함수
     * */
    alert(msgBoxJson, callback) {
        divAlert.classList.remove("hidden")
        alert_title.innerHTML = msgBoxJson?.title ?? "알림"
        alert_message.innerHTML = msgBoxJson?.message ?? "완료되었습니다."
        alert_btn_confirm.innerHTML = msgBoxJson?.confirm ?? "확인"
        alert_btn_cancel.innerHTML = msgBoxJson?.cancel ?? "취소"
        alert_btn_confirm.addEventListener('click', function () {
            alert_btn_confirm.addEventListener('click', function () {
                if (callback) {
                    callback();
                }
                divAlert.classList.add('hidden');
                alert_btn_confirm.removeEventListener('click',onclick);
            });
        });
        alert_btn_cancel.addEventListener('click', function () {
            alert_btn_confirm.removeEventListener('click',onclick);
        });

    },
    /**
     * msgBoxJson: 알림에 들어갈 데이터 형식 itzAlert.makeMsgJson 함수사용
     * callback: 알림 이후에 확인 버튼을 눌렀을때 실행할 콜백함수
     * */
    error(msgBoxJson, callback) {
        divError.classList.remove("hidden");
        error_title.innerHTML = msgBoxJson?.title ?? "알림"
        error_message.innerHTML = msgBoxJson?.message ?? "완료되었습니다."
        error_btn.innerHTML = msgBoxJson?.confirm ?? "확인"
        error_btn.addEventListener('click', function () {
            error_btn.addEventListener('click', function () {
                if (callback) {
                    callback();
                }
                divAlert.classList.add('hidden');
                error_btn.removeEventListener('click',onclick);
            });
        });
        error_btn.addEventListener('click', function () {
            error_btn.removeEventListener('click',onclick);
        });

    },
    /**
     * title: 제목
     * message: 메세지
     * confirm: 확인버튼 text 문구
     * cancle: 취소버튼 text 문구
     * */
    makeMsgJson(title, message, confirm, cancle) {
        return {
            title : title,
            message : message,
            confirm : confirm,
            cancle : cancle,
        }
    },
    saveDefaultMsg() {
        return itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인");
    },
    deleteDefaultMsg() {
        return itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인");
    },
    searchDefaultMsg() {
        return itzAlert.makeMsgJson("저장 완료", "저장이 완료되었습니다.", "확인");
    }
}

const itzAlertRt = {
    /**
     * */
    notice(msgBoxJson, callback) {
    },
    /**
     * */
    confirm(msgBoxJson, callback) {
    },
    /**
     * */
    alert(msgBoxJson, callback) {

    },
    /**
     * */
    error(msgBoxJson, callback) {

    },
}