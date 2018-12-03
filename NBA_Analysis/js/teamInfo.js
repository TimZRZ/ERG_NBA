var url = decodeURI(window.location.href);
var argsIndex = url .split("?name=");
var arg = argsIndex[1];
var name = arg.split("%20")[0];
var query_name = new AV.Query('Team');
query_name.equalTo('Name',name);
query_name.find().then(function(todo){
  var team_name = todo[0].get('Name');
  var team_height = todo[0].get('Ht');
  var team_weight = todo[0].get('Wt');
  var team_position = todo[0].get('Pos');
//   还有四个参数未确定
//   var player_birth = todo[0].get('Birth_Date');
//   var player_begin = todo[0].get('From');
//   var player_university = todo[0].get('Colleges');
  
  //同步球队各项信息
  document.getElementById("name").innerHTML= player_name;
  document.getElementById("player_height").innerHTML=player_height;
  document.getElementById("player_weight").innerHTML=player_weight;
  document.getElementById("player_position").innerHTML=player_position;
  document.getElementById("player_birth").innerHTML=player_birth;
  document.getElementById("player_begin").innerHTML=player_begin;
  document.getElementById("player_university").innerHTML=player_university;
});
//同步球队照片
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

  document.getElementById('player_number').innerHTML = player_number;
  document.getElementById('player_team').innerHTML = player_team;
}), function(error){

};