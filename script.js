function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDeviceStream(option) {
    if ('getUserMedia' in navigator.mediaDevices) {
        return navigator.mediaDevices.getUserMedia(option);
    } else {
        return new Promise(function (resolve, reject) {
            navigator.getUserMedia(option, resolve, reject);
        });
    }
}

function addchat(name, color, chat) {
    document.querySelector("chat-list").innerHTML += `<chat-item><chat-name class="${color}">${name}</char-name><chat-text>${chat}</chat-text></chat-item>`;
    document.querySelector("chat-list").scrollTop = document.querySelector("chat-list").scrollHeight;

    document.querySelector("video-chat").innerHTML += `<chat-item class="${color}"><chat-name>${name}</char-name><chat-text>${chat}</chat-text></chat-item>`;
    document.querySelector("video-chat").scrollTop = document.querySelector("chat-list").scrollHeight;

    item1 = document.querySelectorAll("chat-item");

    if (item1.length > 250) {
        idx = 0;
        document.querySelector("chat-list").innerHTML = "";
        document.querySelector("video-chat").innerHTML = "";

        pack = setInterval(() => {
            name = names[rand(0, 25)];
            color = colors[rand(0, 3)];
            chat = chats1[rand(0, 9)] + chats2[rand(0, 9)];
            document.querySelector("chat-list").innerHTML += `<chat-item><chat-name class="${color}">${name}</char-name><chat-text>${chat}</chat-text></chat-item>`;
            document.querySelector("chat-list").scrollTop = document.querySelector("chat-list").scrollHeight;

            document.querySelector("video-chat").innerHTML += `<chat-item class="${color}"><chat-name>${name}</char-name><chat-text>${chat}</chat-text></chat-item>`;
            document.querySelector("video-chat").scrollTop = document.querySelector("chat-list").scrollHeight;

            idx++;

            if (idx > 50) {
                idx = 0;
                clearInterval(pack);
            }
        }, 50);
    }

}

function open() {
    navigator.mediaDevices.getUserMedia({video:true}).then(stream => {
        streamVideo = stream
        var cameraView = document.querySelector('video');
        cameraView.srcObject = stream;
        cameraView.play()
    })
}

const names = ["물고기", "달걀후라이", "계란후라이",
    "소고기", "짜지직", "알잘딱",
    "부활한 군주", "도도한 탐험가", "대충하자",
    "대충안하자", "맛있는 포테이토", "부활한 탐험가",
    "버스타는 만렙", "스타메가", "싸구려커피", "미스터",
    "미스트 비스트", "모탈", "준표형", "침대", "개발자", "아스마",
    "코딩마스터", "지피티", "우왕", "삼겹살"];
const colors = ["color1", "color2", "color3", "color4"];
const chats1 = ["아니 ", "근데 ", "진짜로 ", "버튜버 ", "버튜바 ", "오 ", "?", "!", "하 ", "어렛 "];
const chats2 = ["레전드다", "신기하네", "AI인가??", "히히", "왜?", "ㅋㅋㅋ", "!", "대박", "분탕 ㄴㄴ", "도배 ㄴㄴ"];

window.onload = () => {
    setInterval(() => {
        if (rand(0, 1) == 0) {
            randname = rand(0, 25);
            randcolor = rand(0, 3);
            addchat(names[randname], colors[randcolor], `${chats1[rand(0, 9)]}${chats2[rand(0, 9)]}`);
        }
    }, 100);
    open();
}