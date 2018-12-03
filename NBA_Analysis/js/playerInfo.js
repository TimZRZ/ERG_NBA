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