var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
// sanitize-html = 출력정보에서 보안을 하는 모듈
// 모듈 : nodejs가 가지고 있는 수많은 기능을 비슷한 것끼리 그룹핑해놓은 것
// refactoring : 동작 방법은 똑같이 유지하면서 코딩을 효율적으로 하는


var app = http.createServer(function(request,response){
    var _url = request.url;
    // _url = request.url = /?id=HTML
    var queryData = url.parse(_url, true).query;
    // queryData = { id: 'HTML'}
    // queryData.id = HTML
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
          // 'undefined'는 정의되지 않는 데이터를 의미할 때 사용하는 단어
          fs.readdir('./data', function(error,filelist){
            // readdir를 통해 파일 리스트를 읽어 옴
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(filelist);
            var html = template.html(title, list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);
          });
      } else {
        fs.readdir('./data', function(error,filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          // readFile은 불러온 파일의 내용을 읽어오기 위한
          // data/${queryData.id} = C:\Users\inhoi\OneDrive\Web\nodejs\data/HTML
          // description = 파일의 내용 불러오기 //
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
          var list = template.list(filelist);
          var html = template.html(title, list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          `<a href="/create">create</a>
           <a href="/update?id=${sanitizedTitle}">update</a>
           <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
           </form>`);
          response.writeHead(200);
          response.end(html);
        });
      });
      }
    } else if(pathname === '/create'){
          fs.readdir('./data', function(error,filelist){
            var title = 'WEB - create';
            var description = 'Hello, Node.js';
            var list = template.list(filelist);
            var html = template.html(title, list,
              // 글을 생성하기 위한 코드
            ` <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit" name="submit">
              </p>
            </form>`, "");
            response.writeHead(200);
            response.end(html);
        });
    } else if (pathname==='/create_process'){
      // post data extract 코딩방법
      var body = '';
      request.on('data', function(data){
      // request = http.createServer의 콜백 함수의 request
        body = body + data;
      });
      request.on('end', function(){
        // request.on('data'를 통해서 정보 다 들어온 후
        // 'end' 뒤의 콜백을 통해서 정보 수신을 끝냄
        var post = qs.parse(body);
        // post = qs.parse(body) = { title : -- , description: ---}
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8',
        // fs.writeFile = 파일을 생성
        function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          // response.writeHead(302) = 사용자를 다른 페이지로 보냄(Re Direction)
          response.end();
          })
      });
    } else if (pathname === '/update'){
      fs.readdir('./data', function(error,filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          // readFile은 불러온 파일의 내용을 읽어오기 위한
          // data/${queryData.id} = C:\Users\inhoi\OneDrive\Web\nodejs\data/HTML
          // description = 파일의 내용 불러오기 //
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.html(title, list,
            ` <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p>
                <input type="text" name="title" placeholder="title" value="${title}">
              </p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit" name="submit">
              </p>
            </form>`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          response.writeHead(200);
          response.end(html);
        });
     });
   } else if (pathname === '/update_process'){
     var body = '';
     request.on('data', function(data){
       body = body + data;
     });
     request.on('end', function(){
       var post = qs.parse(body);
       var id = post.id;
       var title = post.title;
       var description = post.description;
       fs.rename(`data/${id}`, `data/${title}`, function(error){
         // fs.rename = 파일의 이름을 바꾸는 함수
         fs.writeFile(`data/${title}`, description, 'utf8',
         function(err){
           response.writeHead(302, {Location: `/?id=${title}`});
           response.end();
           })
       })
     });
   } else if (pathname === '/delete_process'){
     var body = '';
     request.on('data', function(data){
       body = body + data;
     });
     request.on('end', function(){
       var post = qs.parse(body);
       var id = post.id;
       var filteredId = path.parse(id).base;
       fs.unlink(`data/${filteredId}`, function(error){
         response.writeHead(302, {Location: `/`});
         response.end();
       })
     });
   } else {
      response.writeHead(404);
      // response.writeHead(404); = 파일을 찾을 수 없는 경우 웹서버가 응답하는 통신 약속
      response.end('Not found');
    }

});
app.listen(3000);
