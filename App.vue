<template>
     <html>
      <head>
       <title>OSR Service List</title>
       <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">Service List</a></h1>
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
        <table class="tg">
        <thead>
            <tr>
              <th class="tg-lcf4">ClientCode</th>
              <th class="tg-lcf4">SectionCode</th>
              <th class="tg-lcf4">VesselName</th>
              <th class="tg-lcf4">ServiceID</th>
              <th class="tg-lcf4">DEP PORT</th>
              <th class="tg-lcf4">ARR PORT</th>
              <th class="tg-lcf4">ATD</th>
              <th class="tg-lcf4">ATA</th>
              <th class="tg-lcf4">ServiceMenu</th>
              <th class="tg-0lax">Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a, i) in Service_Count" :key="a">
                <td class="tg-tqsg">{{Service_Count[i].clientcode._text}}</td>
                <td class="tg-tqsg">{{Service_Count[i].sectioncode._text}}</td>
                <td class="tg-tqsg">{{Service_Count[i].vessel_name._text}}</td>
                <td class="tg-tqsg"><a href="">{{Service_Count[i].ServiceID._text}}</a></td>
                <td class="tg-tqsg">{{Service_Count[i].dep_code._text}}</td>
                <td class="tg-tqsg">{{Service_Count[i].arr_code._text}}</td>
                <td class="tg-tqsg">{{Service_Count[i].dep_time._text}}</td>
                <td class="tg-tqsg">{{Service_Count[i].arr_time._text}}</td>
                <td class="tg-tqsg">{{Service_Count[i].service_menu._text}}</td>
                <td class="tg-hmp3"></td>
            </tr>
          </tbody>
        </table>
      </body>
     </html>
</template>



<script>
import axios from 'axios';
import url from 'url';
import convert from 'xml-js';
import VueRouter from 'vue-router';

var queryData;
var client_code;
var start;
var end;
var xmlToJson;
var leg;
var Service_Count;
var i;
var C_code_list;
var requestUrl
VueRouter

queryData = url.parse('/OSR_Service_List', true).query;
client_code = queryData.Client;
start = queryData.StartDate;
end = queryData.EndDate;

queryData
client_code
start
end
convert
xmlToJson
leg
axios
Service_Count
i
C_code_list
requestUrl
VueRouter

export default {
  name: 'App',
  data(){
    return{
      Service_Count: []
    }
  },
    created(){
    var vm = this;
    var queryData = url.parse('/OSR_Service_List', true).query;

    console.log(client_code);
    
    requestUrl = `http://vpce-004a826e74426f7d5-549y7sf9.vpce-svc-026bf61d7bacf991a.ap-northeast-1.vpce.amazonaws.com/vpdb/cgi/getosrrouteing_compatible.cgi?status=A&client_code=${client_code}&start=${start}T00:00:00&end=${end}T00:00:00`;
    console.log(requestUrl);

    axios.get('http://vpce-004a826e74426f7d5-549y7sf9.vpce-svc-026bf61d7bacf991a.ap-northeast-1.vpce.amazonaws.com/vpdb/cgi/getosrrouteing_compatible.cgi?status=A&client_code=HLSP&start=2021-01-01T00:00:00&end=2021-03-31T00:00:00')
    .then(function(response){
      vm.users = response.data;
      xmlToJson = convert.xml2json(vm.users, {compact: true, spaces: 4});
      leg = JSON.parse(xmlToJson);
      vm.Service_Count = leg.ServiceIDList.Service;
    
    })
  },
  methods : {

  },
  components: {
  }
}
</script>

<style>
  .tg  {border-collapse:collapse;border-color:#9ABAD9;border-spacing:0;}
  .tg td{background-color:#EBF5FF;border-color:#9ABAD9;border-style:solid;border-width:0px;color:#444;
    font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg th{background-color:#409cff;border-color:#9ABAD9;border-style:solid;border-width:0px;color:#fff;
    font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg .tg-tqsg{background-color:#D2E4FC;border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;text-align:center;
    vertical-align:top}
  .tg .tg-hmp3{background-color:#D2E4FC;text-align:left;vertical-align:top}
  .tg .tg-ugax{border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;font-weight:bold;text-align:center;
    text-decoration:underline;vertical-align:top}
  .tg .tg-lcf4{border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;text-align:center;vertical-align:top}
  .tg .tg-0lax{text-align:left;vertical-align:top}
</style>
