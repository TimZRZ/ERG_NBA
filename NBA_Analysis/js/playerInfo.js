var url = decodeURI(window.location.href);
var argsIndex = url .split("?name=");
var arg = argsIndex[1];
var name = arg.split("%20")[0];
var query_name = new AV.Query('Player');

//同步球员各项信息
query_name.equalTo('Name',name);
query_name.find().then(function(todo){
  var player_name = todo[0].get('Name');
  var player_height = todo[0].get('Ht');
  var player_weight = todo[0].get('Wt');
  var player_position = todo[0].get('Pos');
  var player_birth = todo[0].get('Birth_Date');
  var player_begin = todo[0].get('From');
  var player_university = todo[0].get('Colleges');
  document.getElementById("name").innerHTML= player_name;
  document.getElementById("player_height").innerHTML=player_height;
  document.getElementById("player_weight").innerHTML=player_weight;
  document.getElementById("player_position").innerHTML=player_position;
  document.getElementById("player_birth").innerHTML=player_birth;
  document.getElementById("player_begin").innerHTML=player_begin;
  document.getElementById("player_university").innerHTML=player_university;
});

//同步球员照片
var query_photo = new AV.Query('Player_Image');
query_photo.equalTo('Name',name.toLowerCase());
query_photo.find().then(function(todo){
  var player_photo = todo[0].get('Photo');
  document.getElementById('playerPhoto').src = player_photo;
});

//同步球员号码和球队信息
var query_teamInfo = new AV.Query('Player_Team');
query_teamInfo.equalTo('Player',name);
query_teamInfo.find().then(function(todo){
  var player_number = todo[0].get('No_');
  var player_team = todo[0].get('Team');
  document.getElementById('player_number').innerHTML = '# ' + player_number;
  document.getElementById('player_team').innerHTML = player_team;
});

//同步球员场均数据
var query_performace = new AV.Query('Performance');
query_performace.equalTo('Name', name);
query_performace.find().then(function(todo){
  var pts = todo[0].get('avg_points');
  if (pts != -1){
    document.getElementById('pts').innerHTML = pts.toFixed(1);
  }
  var reb = todo[0].get('avg_rebound');
  if (reb != -1){
    document.getElementById('reb').innerHTML = reb.toFixed(1);
  }
  var ast = todo[0].get('avg_assist');
  if (ast != -1){
    document.getElementById('ast').innerHTML = ast.toFixed(1);
  }
  var threepts = todo[0].get('avg_3_points');
  if (threepts != -1){
    document.getElementById('3pts').innerHTML = threepts.toFixed(1);
  }
});

var shotlist = [];
  var paramsJson = {
      player_name: name,
      distance: -1,
      time: -1,
  };
  AV.Cloud.run('player_xy', paramsJson).then(function(data) {
      console.log(data);
      for (i in data) {
          var element = [parseFloat(data[i]['original_x']), parseFloat(data[i]['original_y']), 
                          data[i]['type'], data[i]['remaining_time']];
          shotlist.push(element);
      }
      var shotpointsChat = echarts.init(document.getElementById('main'));

      var option_shotpoints = {
          xAxis: {
              scale: true
          },
          yAxis: {
              scale: true
          },
          tooltip: {
              formatter: function (params) {
                  return "<li>" + 'Type: ' + params.value[2] + 
                          "<li>" + 'Remaining time: ' + params.value[3];
              }
          },
          series: [{
              type: 'scatter',
              data: shotlist,
          }]
      };
      // 使用刚指定的配置项和数据显示图表。
      shotpointsChat.setOption(option_shotpoints);


      // 投篮方式表
      var typeChart = echarts.init(document.getElementById('type'));
      var chosen_type = [false, false, false, false, false, false];
      var color_type = ["#4ABACE","#4ABACE","#4ABACE","#4ABACE","#4ABACE","#4ABACE"];
      var x_type_data = ["Jump Shot","Running Jump Shot","Floating Jump Shot","Layup","Running Layup","unknown"];
      var type_list = [[], [], [], [], [], []];
      var type_list2 = [[], [], [], [], [], []];
      for (i in shotlist) {
          if (shotlist[i][2] == "Jump Shot")
              type_list[0].push(shotlist[i]);
          if (shotlist[i][2] == "Running Jump Shot")
              type_list[1].push(shotlist[i]);
          if (shotlist[i][2] == "Floating Jump Shot")
              type_list[2].push(shotlist[i]);
          if (shotlist[i][2] == "Layup")
              type_list[3].push(shotlist[i]);
          if (shotlist[i][2] == "Running Layup")
              type_list[4].push(shotlist[i]);
          if (shotlist[i][2] == "unknown")
              type_list[5].push(shotlist[i]);
      }
      var option_type = {
          title: {
              text: 'Shot Type'
          },
          tooltip: {},
          // legend: {
          //     data:['销量']
          // },
          grid: {  
              left: '10%',  
              bottom:'35%'  
          }, 
          xAxis: {
              axisLabel: {  
                  interval:0,  
                  rotate:40  
              }, 
              data: x_type_data,
          },
          yAxis: {
          },
          series: [{
                      name: 'types',
                      type: 'bar',
                      stack: '1',
                      data: [type_list[0].length, type_list[1].length, type_list[2].length,
                          type_list[3].length, type_list[4].length, type_list[5].length],
                      itemStyle: {
                          color: function (params){
                              var colorList = color_type;
                              return colorList[params.dataIndex];
                          }
                      }
                  },
                  {
                      name: 'types2',
                      type: 'bar',
                      stack: '1',
                      //itemStyle: itemStyle,
                      data: [-type_list2[0].length, -type_list2[1].length, -type_list2[2].length,
                      -type_list2[3].length, -type_list2[4].length, -type_list2[5].length],
                  },
          ]
      };
      typeChart.on('click', function(param) {
          console.log(param.dataIndex);
          chosen_type[param.dataIndex] = !chosen_type[param.dataIndex];
          if (chosen_type[param.dataIndex])
              color_type[param.dataIndex] = "#FE8463";
          else
              color_type[param.dataIndex] = "#4ABACE";
          var allFalse = true;
          var result_list = []
          for (i in chosen_type) {
              if (chosen_type[i] == true) {
                      for (j in type_list[i]) {
                          result_list.push(type_list[i][j]);
                      }
                  allFalse = false;
              }
          }
          console.log(chosen_type);
          console.log(allFalse);
          if (allFalse) {
              result_list = shotlist;
          }
          option_shotpoints.series[0].data = result_list;
          typeChart.setOption(option_type);
          shotpointsChat.setOption(option_shotpoints);
      });
      typeChart.setOption(option_type);

      
      // 投篮时间表
      var timeChart = echarts.init(document.getElementById('time'));
      var time_AxisData = [];
      var time_data = [];
      for (i = 0; i < 13; i++) {
          time_AxisData.push(i.toString() + ':00');
          time_AxisData.push(i.toString() + ':30');
          time_data.push([]);
          time_data.push([]);
      }
      for (i in shotlist) {
          var num = 0;
          if (parseInt(shotlist[i][3].split(':')[2]) >= 30)
              num = 1;
          var e_index = 2*parseInt(shotlist[i][3].split(':')[1]) + num;
          time_data[e_index].push(shotlist[i]);
      }
      time_num_data = [];
      for (i in time_data) {
          time_num_data.push(time_data[i].length);
      }
      console.log(time_data);
      option_time = {
          title: {
              text: 'Remaining Time'
          },
          // toolbox: {
          //     // y: 'bottom',
          //     feature: {
          //         magicType: { type: ['stack', 'tiled']},
          //         dataView: {},
          //         saveAsImage: { pixelRatio: 2}
          //     }
          // },
          tooltip: {},
          brush: {
              //toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
              toolbox: ['lineX', 'clear'],
              xAxisIndex: 0
          },
          xAxis: {
              data: time_AxisData,
              silent: false,
              splitLine: {
                  show: false
              }
          },
          yAxis: {},
          series: [{
              name: 'bar',
              type: 'bar',
              data: time_num_data,
              animationDelay: function (idx) {
                  return idx * 10;
              }
          }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
              return idx * 5;
          }
      };

      timeChart.on('brushSelected', function(param) {
          var brushed = [];
          var brushComponent = param.batch[0];
          var rawIndices = brushComponent.selected[0].dataIndex;
          var result_list = []
          for (i in rawIndices) {
              for (j in time_data[rawIndices[i]]) {
                  result_list.push(time_data[rawIndices[i]][j]);
              }
          }
          if (rawIndices.length == 0) {
              result_list = shotlist;
          }
          option_shotpoints.series[0].data = result_list;
          shotpointsChat.setOption(option_shotpoints);

          var type_list2_num = [];
          for (i in type_list) {
              var sum_num = 0;
              for (j in type_list[i]) {
                  var num = 0;
                  if (parseInt(type_list[i][j][3].split(':')[2]) >= 30)
                      num = 1;
                  var e_index = 2*parseInt(type_list[i][j][3].split(':')[1]) + num;
                  if (e_index in rawIndices)
                      sum_num ++;
              }
              type_list2_num.push(-sum_num);
          }
          option_type.series[1].data = type_list2_num;
          typeChart.setOption(option_type);
      });
      timeChart.setOption(option_time);

  }, function(err) {
      console.log(err.message);
  });