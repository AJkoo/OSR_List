module.exports = {
    html:function(title, body, list){
     return `
     <!doctype html>
     <html>
     <head>
       <title>OSR Service List - ${title}</title>
       <meta charset="utf-8">
     </head>
     <body>
       <h1><a href="/">Service List</a></h1>
       ${body}
             <style type="text/css">
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
         ${list}
         </tbody>
       </table>
     </body>
     </html>
     `
   },list:function (table, Service_Count,C_code_list, S_code_list, vessel_name_list, Service_ID_list
                      ,dep_code_list, arr_code_list, dep_list, arr_time_list, service_menu_list){
     var table = ``;
     var i = 0;
     
     while (i < Service_Count.length) {
       table = table + `
         <tr>
           <td class="tg-tqsg">${C_code_list[i]}</td>
           <td class="tg-tqsg">${S_code_list[i]}</td>
           <td class="tg-tqsg">${vessel_name_list[i]}</td>
           <td class="tg-tqsg"><a href="http://ouhtccomm-web.wni.co.jp/LegMonitoring/cgi/CommunicationHistory.cgi?serviceid=${Service_ID_list[i]}" target="_blank">${Service_ID_list[i]}</a></td>
           <td class="tg-tqsg">${dep_code_list[i]}</td>
           <td class="tg-tqsg">${arr_code_list[i]}</td>
           <td class="tg-tqsg">${dep_list[i]}</td>
           <td class="tg-tqsg">${arr_time_list[i]}</td>
           <td class="tg-tqsg">${service_menu_list[i]}</td>
           <td class="tg-hmp3"></td>
         </tr>
         `;
       i = i + 1;
     };
     return table;
     }
   };