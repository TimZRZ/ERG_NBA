var url = decodeURI(window.location.href);
var argsIndex = url.split("?name=");
var arg = argsIndex[1];
var name = arg.split("%20")[0];
var name = name.split(",")[0];
var query_name = new AV.Query('Team');
query_name.equalTo('Franchise',name);
query_name.find().then(function(todo){
  var team_name = todo[0].get('Franchise');
  var team_conference = todo[0].get('Conference');
  var team_abbr = todo[0].get('Abbreviation');
  var team_from = todo[0].get('From');
  var team_to = todo[0].get('To');
  var team_game = todo[0].get('G');
  var team_win_rate = todo[0].get('W_L');
  var team_playoff = todo[0].get('Plyfs');
  var team_champion = todo[0].get('Champ');
  //同步球队照片
  var query_photo = new AV.Query('Team_Image');
  query_photo.equalTo('Tm', team_abbr);
  query_photo.find().then(function(todo){
    var team_logo = todo[0].get('url');
    document.getElementById('team_logo').src = team_logo;
  });

  
  //同步球队前四项
  document.getElementById("team_name").innerHTML= team_name;
  document.getElementById("team_conference").innerHTML=team_conference;
  document.getElementById("team_abbr").innerHTML=team_abbr;
  document.getElementById("team_from").innerHTML=team_from;
  document.getElementById("team_to").innerHTML=team_to;
  document.getElementById("team_game").innerHTML=team_game;
  document.getElementById("team_win_rate").innerHTML=team_win_rate;
  document.getElementById("team_playoff").innerHTML=team_playoff;
  document.getElementById("team_champion").innerHTML=team_champion;

  });

