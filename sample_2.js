//Simple Web server//
var http = require('http'); //http의 자원을 얻어온다.//
var os_info = require('os'); //os의 자원을 얻어온다.//

var os_platform_info = os_info.platform();

var hostname = '127.0.0.1';
var port = 1337;

//서버를 생성//
http.createServer((req, res) =>
{
    res.writeHead(200, {'Content-Type' : 'text/plain'}); //헤더작성//
    //res.end('Hello World nodejs\n');
    res.end('os platform : [' + os_platform_info + ']');
}).listen(port, hostname, () => //listen으로 개방상태, 즉 클라이언트가 접속하는것을 가능.//
{
    //node에서는 `, ' 는 다르다.//
    console.log(`Server running at http://${hostname}:${port}/`);
});