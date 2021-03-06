var express = require('express');
var gcm = require('node-gcm'); //푸시알림//
var fs = require('fs');
var bodyParser = require('body-parser'); //POST방식//

var app = express();
//라우터별로 분리하기 위해 express의 라우터 기능 사용//
var router = express.Router();

//받을 변수//
var message_str;

//현재 서버의 api key//
var server_api_key = "AIzaSyDhf7UvCdzTqu-k_xDIkoJJt3fZ_Hlh3KE";
//sender id : 247653564330//
var sender = new gcm.Sender(server_api_key);
var registrationIds = [];

//FCM메세지 설정//
var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        title: 'nodejs fcm test',
        message: message_str,
        //custom_key1: 'custom data1',
        //custom_key2: 'custom data2'
    }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

router.post('/push', function(request, response){
    message_str = request.body.message; //전송할 메세지를 받는다.//

    if(message_str == 'push')
    {
        data_trans(response);
        pushAlarm(message_str); //푸시 전송//
    }
    
    else{
        response.send('input data : push -> push send');
    }
});
//////////////////////
function pushAlarm(message_str)
{
    //푸시알람을 지정된 토큰값으로 전송//
    message_str = message_str + '(from nodejs)';

    //푸시를 받을 토큰값들을 설정(데이터베이스 작업 연동 가능부분)//
    //push를 전송할 각 디바이스의 token을 등록//
    var token = "fHM1hw92wOo:APA91bG4Iiy44jVFyxf2abKfF_B9SusckwSvpdpNRVeBw4fwTQ2CLkWXZY5dxT5tQafLLf8wIN5gw5bCrL2zDvGV2Dk5CNVXZHzb83GcJYoKwWoaG1FQN0P2I84yPF7x3F7M37dNl-0M";
    //var token_2 = "c-SlsoDbS08:APA91bH1yuQHf5jSqHvgPsmbopOvMp_l34SM6KOH_MAnQxOe63YFT5ven04ACq8VzXa8d2fCdr02Dfd-HSlcgYpyk5CVVFfkVuz2k5PPxdPtULSyOCQdJj6X5QkejNjgjcVnqDJm4vXu";

    registrationIds.push(token);
    //registrationIds.push(token_2);

    //registrationIds배열 있는 id로 push를 sender//
    sender.send(message, registrationIds, 4, function (err, result) {
        console.log(result);
    });

    console.log('push send success... [message : '+message_str+ ']');

    registrationIds = []; //배열 초기화//
}
///////////////////////
function data_trans(response)
{
    //전송변수//
    var array = new Array(); //배열선언//

    array.push('seo chang wook');
    array.push('seo dong wook');
    array.push("good!!");

    //자바스크립트 객체를 JSON으로 변환(JSON형식을 만든다.)//
    var accountstrObj = 
    {
        "name":"John",
        "members":array,
        "number":123456,
        "location":"seoul",
        "message":message_str
    }   

    var accountstrStr = JSON.stringify(accountstrObj); //string으로 반환//

    console.log(accountstrStr); //JSON반환//

    response.send(accountstrStr);
}

module.exports = router; //모듈 적용//