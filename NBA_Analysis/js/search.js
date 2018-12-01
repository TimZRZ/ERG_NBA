function goToPlayer(){
    var inputVal = document.getElementById("searchName").value;
    var url = "playerInfo.html?name="+inputVal;
    url = encodeURI(url);
    window.open(url);
}

