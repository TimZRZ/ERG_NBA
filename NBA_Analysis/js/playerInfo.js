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
  if (player_university.length < 27) {
    document.getElementById("player_university").innerHTML=player_university;
  } else {
    document.getElementById("player_university").innerHTML="undefined";
  }
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

  var query_teamName = new AV.Query('Team');
  query_teamName.equalTo('Abbreviation', player_team);
  query_teamName.find().then(function(todo){
    var url = "teamInfo.html?name="+todo[0].get('Franchise');
    url=encodeURI(url);   
    document.getElementById('player_team').href= url;
  })
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

//图标
var shotlist_made = [];
var shotlist_missed = [];
var paramsJson = {
    player_name: name,
    distance: -1,
    time: -1,
};
AV.Cloud.run('player_xy', paramsJson).then(function(data) {
    console.log(data);
    for (i in data) {
        if (data[i]['result'] == 'made') {
            var element = [parseFloat(data[i]['original_x']), parseFloat(data[i]['original_y']), 
                        data[i]['type'], data[i]['remaining_time']];
            shotlist_made.push(element);
        }
        
        if (data[i]['result'] == 'missed') {
            var element = [parseFloat(data[i]['original_x']), parseFloat(data[i]['original_y']), 
                        data[i]['type'], data[i]['remaining_time']];
            shotlist_missed.push(element);
        }
    }
    
    var shotpointsChat = echarts.init(document.getElementById('main'));
    var option_shotpoints = {
        xAxis: {
            scale: true,
            max: 300,
            min: -300,
        },
        yAxis: {
            scale: true,
            max: 400,
            min: -50,
        },
        tooltip: {
            formatter: function (params) {
                return "<li>" + 'Type: ' + params.value[2] + 
                       "<li>" + 'Remaining time: ' + params.value[3];
            }
        },
        series: [{
            type: 'scatter',
            data: shotlist_made,
            color: "green",
        },{
            type: 'scatter',
            data: shotlist_missed,
            color: "red",
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    shotpointsChat.setOption(option_shotpoints);


    // 投篮方式表
    var typeChart = echarts.init(document.getElementById('type'));
    var chosen_type = [false, false, false, false, false, false];
    var color_type_made = ["green","green","green","green","green","green"];
    var color_type_missed = ["red","red","red","red","red","red"];
    var x_type_data = ["Jump Shot","Step Back Jump Shot","Pullup Jump Shot","Layup","Running Layup","unknown"];
    var type_list = [[], [], [], [], [], []];
    var type_list_made = [[], [], [], [], [], []];
    var type_list_missed = [[], [], [], [], [], []];
    var type_list2 = [[], [], [], [], [], []];
    for (i in shotlist_made) {
        if (shotlist_made[i][2] == "Jump Shot"){
            type_list_made[0].push(shotlist_made[i]);
        } else if (shotlist_made[i][2] == "Step Back Jump Shot"){
            type_list_made[1].push(shotlist_made[i]);
        } else if (shotlist_made[i][2] == "Pullup Jump Shot"){
            type_list_made[2].push(shotlist_made[i]);
        } else if (shotlist_made[i][2] == "Layup"){
            type_list_made[3].push(shotlist_made[i]);
        } else if (shotlist_made[i][2] == "Running Layup"){
            type_list_made[4].push(shotlist_made[i]);
        } else {
            type_list_made[5].push(shotlist_made[i]);
        }
    }
    for (i in shotlist_missed) {
        if (shotlist_missed[i][2] == "Jump Shot"){
            type_list_missed[0].push(shotlist_missed[i]);
        } else if (shotlist_missed[i][2] == "Step Back Jump Shot"){
            type_list_missed[1].push(shotlist_missed[i]);
        } else if (shotlist_missed[i][2] == "Pullup Jump Shot"){
            type_list_missed[2].push(shotlist_missed[i]);
        } else if (shotlist_missed[i][2] == "Layup"){
            type_list_missed[3].push(shotlist_missed[i]);
        } else if (shotlist_missed[i][2] == "Running Layup"){
            type_list_missed[4].push(shotlist_missed[i]);
        } else {
            type_list_missed[5].push(shotlist_missed[i]);
        }
    }
    var option_type = {
        title: {
            text: 'Shot Type'
        },
        tooltip: {},
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
                    data: [type_list_made[0].length, type_list_made[1].length, type_list_made[2].length,
                        type_list_made[3].length, type_list_made[4].length, type_list_made[5].length],
                    itemStyle: {
                        color: function (params){
                            var colorList = color_type_made;
                            return colorList[params.dataIndex];
                        }
                    }
                },
                {
                    name: 'types2',
                    type: 'bar',
                    stack: '1',
                    //itemStyle: itemStyle,
                    data: [type_list_missed[0].length, type_list_missed[1].length, type_list_missed[2].length,
                    type_list_missed[3].length, type_list_missed[4].length, type_list_missed[5].length],
                    itemStyle: {
                        color: function (params){
                            var colorList = color_type_missed;
                            return colorList[params.dataIndex];
                        }
                    }
                },
        ]
    };
    typeChart.on('click', function(param) {
        console.log(param.dataIndex);
        chosen_type[param.dataIndex] = !chosen_type[param.dataIndex];
        if (chosen_type[param.dataIndex]){
            color_type_made[param.dataIndex] = "#FE8463";
            color_type_missed[param.dataIndex] = "#FE8463";
        } else {
            color_type_made[param.dataIndex] = "green";
            color_type_missed[param.dataIndex] = "red";

        }
        var allFalse = true;
        var result_list_made = [];
        var result_list_missed = [];
        for (i in chosen_type) {
            if (chosen_type[i] == true) {
                    for (j in type_list_made[i]) {
                        result_list_made.push(type_list_made[i][j]);
                    }
                    for (j in type_list_missed[i]) {
                        result_list_missed.push(type_list_missed[i][j]);
                    }
                allFalse = false;
            }
        }
        console.log(chosen_type);
        console.log(allFalse);
        if (allFalse) {
            result_list_made = shotlist_made;
            result_list_missed = shotlist_missed;
        }
        option_shotpoints.series[0].data = result_list_made;
        option_shotpoints.series[1].data = result_list_missed;
        typeChart.setOption(option_type);
        shotpointsChat.setOption(option_shotpoints);
    });
    typeChart.setOption(option_type);

    
    // 投篮时间表
    var timeChart = echarts.init(document.getElementById('time'));
    var time_AxisData = [];
    var time_data = [];
    var time_data_made = [];
    var time_data_missed = [];
    for (i = 0; i < 13; i++) {
        time_AxisData.push(i.toString() + ':00');
        time_AxisData.push(i.toString() + ':30');
        time_data.push([]);
        time_data.push([]);
        time_data_made.push([]);
        time_data_made.push([]);
        time_data_missed.push([]);
        time_data_missed.push([]);
    }
    for (i in shotlist_made) {
        var num = 0;
        if (parseInt(shotlist_made[i][3].split(':')[2]) >= 30)
            num = 1;
        var e_index = 2*parseInt(shotlist_made[i][3].split(':')[1]) + num;
        time_data[e_index].push(shotlist_made[i]);
        time_data_made[e_index].push(shotlist_made[i]);
    }
    for (i in shotlist_missed) {
        var num = 0;
        if (parseInt(shotlist_missed[i][3].split(':')[2]) >= 30)
            num = 1;
        var e_index = 2*parseInt(shotlist_missed[i][3].split(':')[1]) + num;
        time_data[e_index].push(shotlist_missed[i]);
        time_data_missed[e_index].push(shotlist_missed[i]);
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
        tooltip: {},
        brush: {
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
        var result_list_made = [];
        var result_list_missed = [];
        for (i in rawIndices) {
            for (j in time_data[rawIndices[i]]) {
                result_list_made.push(time_data_made[rawIndices[i]][j]);
                result_list_missed.push(time_data_missed[rawIndices[i]][j]);
            }
        }
        console.log(rawIndices.length == 0)
        if (rawIndices.length == 0) {
            result_list_made = shotlist_made;
            result_list_missed = shotlist_missed;
            option_type.series[0].data = [type_list_made[0].length, type_list_made[1].length, type_list_made[2].length,
                                          type_list_made[3].length, type_list_made[4].length, type_list_made[5].length];
            option_type.series[1].data = [type_list_missed[0].length, type_list_missed[1].length, type_list_missed[2].length,
                                          type_list_missed[3].length, type_list_missed[4].length, type_list_missed[5].length];
        }
        option_shotpoints.series[0].data = result_list_made;
        option_shotpoints.series[1].data = result_list_missed;
        shotpointsChat.setOption(option_shotpoints);
        typeChart.setOption(option_type);

        if (rawIndices.length != 0) {
            console.log(rawIndices);
            var type_list2_num_made = [];
            for (i in type_list_made) {
                var sum_num = 0;
                for (j in type_list_made[i]) {
                    var num = 0;
                    if (parseInt(type_list_made[i][j][3].split(':')[2]) >= 30)
                        num = 1;
                    var e_index = 2*parseInt(type_list_made[i][j][3].split(':')[1]) + num;
                    for (k in rawIndices) {
                        if (e_index == rawIndices[k]) sum_num ++;
                    }
                }
                console.log(i + "|" +sum_num )
                type_list2_num_made.push(sum_num);
            }
            option_type.series[0].data = type_list2_num_made;
            
            var type_list2_num_missed = [];
            for (i in type_list_missed) {
                var sum_num = 0;
                for (j in type_list_missed[i]) {
                    var num = 0;
                    if (parseInt(type_list_missed[i][j][3].split(':')[2]) >= 30)
                        num = 1;
                    var e_index = 2*parseInt(type_list_missed[i][j][3].split(':')[1]) + num;
                    for (k in rawIndices) {
                        if (e_index == rawIndices[k]) sum_num ++;
                    }
                }
                type_list2_num_missed.push(sum_num);
            }
            option_type.series[1].data = type_list2_num_missed;
            typeChart.setOption(option_type);
        }
    });
    timeChart.setOption(option_time);

}, function(err) {
    console.log(err.message);
});