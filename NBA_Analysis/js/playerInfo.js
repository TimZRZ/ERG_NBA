var url = decodeURI(window.location.href);
var argsIndex = url .split("?name=");
var arg = argsIndex[1];
var name = arg.split("%20")[0];

var query_name = new AV.Query('Player');
query_name.equalTo('Name',name);
query_name.find().then(function(todo){
  var player_name = todo[0].get('Name');
  document.getElementById("name").innerHTML= player_name;
});

var query_photo = new AV.Query('Player_Image');
query_photo.equalTo('Name',name.toLowerCase());
query_photo.find().then(function(todo){
  var player_photo = todo[0].get('Photo');
  document.getElementById('playerPhoto').src = player_photo;
});





/*window.onload(getPlayerPhoto);*/