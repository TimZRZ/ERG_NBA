var paramsJson = {
    attr: 'avg_points'
};
AV.Cloud.run('top_five', paramsJson).then(function(data){
    document.getElementById("1pt").innerHTML = '1. '+ data[0]['Name'];
    document.getElementById("2pt").innerHTML = '2. '+ data[1]['Name'];
    document.getElementById("3pt").innerHTML = '3. '+ data[2]['Name'];
    document.getElementById("4pt").innerHTML = '4. '+ data[3]['Name'];
    document.getElementById("5pt").innerHTML = '5. '+ data[4]['Name'];

    var url1 = "playerInfo.html?name="+data[0]['Name'];;
    url1=encodeURI(url1);
    document.getElementById("1pt").href = url1;
    var url2 = "playerInfo.html?name="+data[1]['Name'];;
    url2=encodeURI(url2);
    document.getElementById("2pt").href = url2;
    var url3 = "playerInfo.html?name="+data[2]['Name'];;
    url3=encodeURI(url3);
    document.getElementById("3pt").href = url3;
    var url4 = "playerInfo.html?name="+data[3]['Name'];;
    url4=encodeURI(url4);
    document.getElementById("4pt").href = url4;
    var url5 = "playerInfo.html?name="+data[4]['Name'];;
    url5=encodeURI(url5);
    document.getElementById("5pt").href = url5;
})

var paramsJson = {
    attr: 'avg_rebound'
};
AV.Cloud.run('top_five', paramsJson).then(function(data){
    document.getElementById("1rb").innerHTML = '1. '+ data[0]['Name'];
    document.getElementById("2rb").innerHTML = '2. '+ data[1]['Name'];
    document.getElementById("3rb").innerHTML = '3. '+ data[2]['Name'];
    document.getElementById("4rb").innerHTML = '4. '+ data[3]['Name'];
    document.getElementById("5rb").innerHTML = '5. '+ data[4]['Name'];

    var url1 = "playerInfo.html?name="+data[0]['Name'];;
    url1=encodeURI(url1);
    document.getElementById("1rb").href = url1;
    var url2 = "playerInfo.html?name="+data[1]['Name'];;
    url2=encodeURI(url2);
    document.getElementById("2rb").href = url2;
    var url3 = "playerInfo.html?name="+data[2]['Name'];;
    url3=encodeURI(url3);
    document.getElementById("3rb").href = url3;
    var url4 = "playerInfo.html?name="+data[3]['Name'];;
    url4=encodeURI(url4);
    document.getElementById("4rb").href = url4;
    var url5 = "playerInfo.html?name="+data[4]['Name'];;
    url5=encodeURI(url5);
    document.getElementById("5rb").href = url5;
})

var paramsJson = {
    attr: 'avg_assist'
};
AV.Cloud.run('top_five', paramsJson).then(function(data){
    document.getElementById("1as").innerHTML = '1. '+ data[0]['Name'];
    document.getElementById("2as").innerHTML = '2. '+ data[1]['Name'];
    document.getElementById("3as").innerHTML = '3. '+ data[2]['Name'];
    document.getElementById("4as").innerHTML = '4. '+ data[3]['Name'];
    document.getElementById("5as").innerHTML = '5. '+ data[4]['Name'];

    var url1 = "playerInfo.html?name="+data[0]['Name'];;
    url1=encodeURI(url1);
    document.getElementById("1as").href = url1;
    var url2 = "playerInfo.html?name="+data[1]['Name'];;
    url2=encodeURI(url2);
    document.getElementById("2as").href = url2;
    var url3 = "playerInfo.html?name="+data[2]['Name'];;
    url3=encodeURI(url3);
    document.getElementById("3as").href = url3;
    var url4 = "playerInfo.html?name="+data[3]['Name'];;
    url4=encodeURI(url4);
    document.getElementById("4as").href = url4;
    var url5 = "playerInfo.html?name="+data[4]['Name'];;
    url5=encodeURI(url5);
    document.getElementById("5as").href = url5;
})

var paramsJson = {
    attr: 'avg_block'
};
AV.Cloud.run('top_five', paramsJson).then(function(data){
    document.getElementById("1bk").innerHTML = '1. '+ data[0]['Name'];
    document.getElementById("2bk").innerHTML = '2. '+ data[1]['Name'];
    document.getElementById("3bk").innerHTML = '3. '+ data[2]['Name'];
    document.getElementById("4bk").innerHTML = '4. '+ data[3]['Name'];
    document.getElementById("5bk").innerHTML = '5. '+ data[4]['Name'];

    var url1 = "playerInfo.html?name="+data[0]['Name'];;
    url1=encodeURI(url1);
    document.getElementById("1bk").href = url1;
    var url2 = "playerInfo.html?name="+data[1]['Name'];;
    url2=encodeURI(url2);
    document.getElementById("2bk").href = url2;
    var url3 = "playerInfo.html?name="+data[2]['Name'];;
    url3=encodeURI(url3);
    document.getElementById("3bk").href = url3;
    var url4 = "playerInfo.html?name="+data[3]['Name'];;
    url4=encodeURI(url4);
    document.getElementById("4bk").href = url4;
    var url5 = "playerInfo.html?name="+data[4]['Name'];;
    url5=encodeURI(url5);
    document.getElementById("5bk").href = url5;
})

var paramsJson = {
    attr: 'avg_steal'
};
AV.Cloud.run('top_five', paramsJson).then(function(data){
    document.getElementById("1st").innerHTML = '1. '+ data[0]['Name'];
    document.getElementById("2st").innerHTML = '2. '+ data[1]['Name'];
    document.getElementById("3st").innerHTML = '3. '+ data[2]['Name'];
    document.getElementById("4st").innerHTML = '4. '+ data[3]['Name'];
    document.getElementById("5st").innerHTML = '5. '+ data[4]['Name'];

    var url1 = "playerInfo.html?name="+data[0]['Name'];;
    url1=encodeURI(url1);
    document.getElementById("1st").href = url1;
    var url2 = "playerInfo.html?name="+data[1]['Name'];;
    url2=encodeURI(url2);
    document.getElementById("2st").href = url2;
    var url3 = "playerInfo.html?name="+data[2]['Name'];;
    url3=encodeURI(url3);
    document.getElementById("3st").href = url3;
    var url4 = "playerInfo.html?name="+data[3]['Name'];;
    url4=encodeURI(url4);
    document.getElementById("4st").href = url4;
    var url5 = "playerInfo.html?name="+data[4]['Name'];;
    url5=encodeURI(url5);
    document.getElementById("5st").href = url5;
})

var paramsJson = {
    attr: 'avg_3_points'
};
AV.Cloud.run('top_five', paramsJson).then(function(data){
    document.getElementById("13p").innerHTML = '1. '+ data[0]['Name'];
    document.getElementById("23p").innerHTML = '2. '+ data[1]['Name'];
    document.getElementById("33p").innerHTML = '3. '+ data[2]['Name'];
    document.getElementById("43p").innerHTML = '4. '+ data[3]['Name'];
    document.getElementById("53p").innerHTML = '5. '+ data[4]['Name'];

    var url1 = "playerInfo.html?name="+data[0]['Name'];;
    url1=encodeURI(url1);
    document.getElementById("13p").href = url1;
    var url2 = "playerInfo.html?name="+data[1]['Name'];;
    url2=encodeURI(url2);
    document.getElementById("23p").href = url2;
    var url3 = "playerInfo.html?name="+data[2]['Name'];;
    url3=encodeURI(url3);
    document.getElementById("33p").href = url3;
    var url4 = "playerInfo.html?name="+data[3]['Name'];;
    url4=encodeURI(url4);
    document.getElementById("43p").href = url4;
    var url5 = "playerInfo.html?name="+data[4]['Name'];;
    url5=encodeURI(url5);
    document.getElementById("53p").href = url5;
})