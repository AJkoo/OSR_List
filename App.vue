<template>
     <html>
      <head>
       <title>OSR Service List</title>
       <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">Service List</a></h1>
          <p>
          Client Code
          <input placeholder="ex)MOL" v-model="Client_Code">
          </p>
          <p>
          Start Date
          <input placeholder="ex)2021-01-01" v-model="Start_Date">
          </p>
          <p>
          End Date
          <input placeholder="ex)2021-03-01" v-model="End_Date">
          </p>
          <button @click="user_input">Download</button>
          <p>
          </p>
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
                  <!-- <tr v-for="(a, i) in Service_Count" :key="a">
                      <td class="tg-tqsg">{{data_clientcode[i]}}</td>
                      <td class="tg-tqsg">{{data_sectioncode[i]}}</td>
                      <td class="tg-tqsg">{{data_vessel_name[i]}}</td>
                      <td class="tg-tqsg"><a href="">{{data_ServiceID[i]}}</a></td>
                      <td class="tg-tqsg">{{Service_Count[i].dep_code._text}}</td>
                      <td class="tg-tqsg">{{Service_Count[i].arr_code._text}}</td>
                      <td class="tg-tqsg">{{Service_Count[i].dep_time._text}}</td>
                      <td class="tg-tqsg">{{Service_Count[i].arr_time._text}}</td>
                      <td class="tg-tqsg">{{Service_Count[i].service_menu._text}}</td>
                      <td class="tg-hmp3"></td>
                  </tr> -->
                  <tr v-for="(a, i) in Service_Count" :key="a">
                      <td class="tg-tqsg">{{Service_Count[i].clientcode._text}}</td>
                      <td class="tg-tqsg">{{Service_Count[i].sectioncode._text}}</td>
                      <td class="tg-tqsg">{{Service_Count[i].vessel_name._text}}</td>
                      <td class="tg-tqsg"><a target="_blank" v-bind:href="'http://ouhtccomm-web.wni.co.jp/LegMonitoring/cgi/CommunicationHistory.cgi?serviceid='+ Service_Count[i].ServiceID._text">{{Service_Count[i].ServiceID._text}}</a></td>
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
import convert from 'xml-js';
var xmlToJson;
var leg;
var Service_Count;
var Service_data
var Service_Count_ID
convert
xmlToJson
leg
Service_Count
Service_data
Service_Count_ID
export default {
  name: 'App',
  data(){
    return{
      Service_Count: [],
      data_clientcode:[],
      data_sectioncode:[],
      data_vessel_name:[],
      data_ServiceID:[],
      data_dep_code:[],
      data_arr_code:[],
      data_service_menu:[],
      Client_Code:'',
      Start_Date:'',
      End_Date:'',
    }
  },
  methods : {
    user_input() {
      axios.get(`http://vpce-004a826e74426f7d5-549y7sf9.vpce-svc-026bf61d7bacf991a.ap-northeast-1.vpce.amazonaws.com/vpdb/cgi/getosrrouteing_compatible.cgi?status=A&client_code=${this.Client_Code}&start=${this.Start_Date}&end=${this.End_Date}`)
        .then(response => {
          Service_data = response.data;
          xmlToJson = convert.xml2json(Service_data, {compact: true, spaces: 4});
          leg = JSON.parse(xmlToJson);
          console.log(leg.ServiceIDList.Service[1]);
          this.Service_Count = leg.ServiceIDList.Service;
          this.Service_Count.filter( ID => {
            this.data_clientcode.push(ID.clientcode._text);
          });
          this.Service_Count.filter( ID => {
            this.data_sectioncode.push(ID.sectioncode._text);
          });
          this.Service_Count.filter( ID => {
            this.data_vessel_name.push(ID.vessel_name._text);
          });
          this.Service_Count.filter( ID => {
            this.data_ServiceID.push(ID.ServiceID._text);
          });
  })}
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
