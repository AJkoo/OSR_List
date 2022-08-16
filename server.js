var http = require('http');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var convert = require('xml-js');
var URLrequest = require('request');
var template = require('./lib/template.js')


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === `/OSR_List`){
          var title = 'Welcome';
          var list = ``;
          var HTML = template.html(title, 
            `
            <form action="/OSR_Service_List">
            <p>
              Client Code
              <input type="text" name="Client" placeholder="ex)MOL">
            </p>
            <p>
            Start Date
            <input type="text" name="StartDate" placeholder="ex)2021-01-01">
            </p>
            <p>
            End Date
            <input type="text" name="EndDate" placeholder="ex)2021-03-01">
            </p>
            <p>
            <input type="submit">
            </p>
            </form>
            `
            , list);
          response.writeHead(200);
          response.end(HTML);
    } else if (pathname === '/OSR_Service_List') {
          var _url = request.url;
          var queryData = url.parse(_url, true).query;
          var client_code = queryData.Client;
          var start = queryData.StartDate;
          var end = queryData.EndDate;

            var requestUrl = `http://vpce-004a826e74426f7d5-549y7sf9.vpce-svc-026bf61d7bacf991a.ap-northeast-1.vpce.amazonaws.com/vpdb/cgi/getosrrouteing_compatible.cgi?status=A&client_code=${client_code}&start=${start}T00:00:00&end=${end}T00:00:00`;

            URLrequest.get(requestUrl, (err,res,content) => {
              if(err){
                  console.log(`err => ${err}`)
              }  else {
                  if(res.statusCode == 200){
                    var result = content
                    var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
                    var leg = JSON.parse(xmlToJson);
                    var Service_Count = leg.ServiceIDList.Service;
                    var body = ``;
                    var title = 'Welcome';

                    // 고객 섹션 배열로 만들기
                    var i = 0;
                    var C_code_list = [];
                    
                    while (i < Service_Count.length){
                        C_code_list.push(leg.ServiceIDList.Service[i].clientcode._text);
                        i = i + 1;
                    };
                    // 고객 섹션 배열로 만들기

                    // 섹션 코드 배열로 만들기
                    var i = 0;
                    var S_code_list = [];
                    
                    while (i < Service_Count.length){
                        S_code_list.push(leg.ServiceIDList.Service[i].sectioncode._text);
                        i = i + 1;
                    };

                    // 섹션 코드 배열로 만들기   
                    
                    // 선명 배열로 만들기
                    var i = 0;
                    var vessel_name_list = [];
                    
                    while (i < Service_Count.length){
                        vessel_name_list.push(leg.ServiceIDList.Service[i].vessel_name._text);
                        i = i + 1;
                    };
                    // 선명 배열로 만들기

                    // 서비스 배열로 만들기
                    var i = 0;
                    var Service_ID_list = [];
                    
                    while (i < Service_Count.length){
                        Service_ID_list.push(leg.ServiceIDList.Service[i].ServiceID._text);
                      i = i + 1;
                    };
                    // 서비스 리스트 배열로 만들기
                    
                    // 출항지 배열로 만들기
                    var i = 0;
                    var dep_code_list = [];
                    
                    while (i < Service_Count.length){
                        dep_code_list.push(leg.ServiceIDList.Service[i].dep_code._text);
                        i = i + 1;
                    };
                    // 출항지 배열로 만들기
                    
                    // 도착지 배열로 만들기
                    var i = 0;
                    var arr_code_list = [];
                    
                    while (i < Service_Count.length){
                        arr_code_list.push(leg.ServiceIDList.Service[i].arr_code._text);
                        i = i + 1;
                    };
                    // 도착지 배열로 만들기   

                    // 출항시간 배열로 만들기
                    var i = 0;
                    var dep_list = [];
                    
                    while (i < Service_Count.length){
                        dep_list.push(leg.ServiceIDList.Service[i].dep_time._text);
                        i = i + 1;
                    };
                    // 출항시간 배열로 만들기

                    // 도착시간 배열로 만들기
                    var i = 0;
                    var arr_time_list = [];
                    
                    while (i < Service_Count.length){
                        arr_time_list.push(leg.ServiceIDList.Service[i].arr_time._text);
                        i = i + 1;
                    };
                    // 도착시간 배열로 만들기

                    // 서비스메뉴 배열로 만들기
                    var i = 0;
                    var service_menu_list = [];
                    
                    while (i < Service_Count.length){
                        service_menu_list.push(leg.ServiceIDList.Service[i].service_menu._text);
                        i = i + 1;
                    };
                    // 서비스메뉴 배열로 만들기                    

                    var table = template.list(table, Service_Count, C_code_list, S_code_list, 
                                                vessel_name_list, Service_ID_list, dep_code_list,
                                                arr_code_list, dep_list, arr_time_list, service_menu_list);
                    var HTML = template.html(title, body, table);

                    response.writeHead(200);
                    response.end(HTML);
            }}});
    } else {
      response.writeHead(404);
      // response.writeHead(404); = 파일을 찾을 수 없는 경우 웹서버가 응답하는 통신 약속
      response.end('Not found');
    }
});
app.listen(3000);
