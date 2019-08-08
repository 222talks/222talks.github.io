"use strict"

function parseXML () {
  var allCasts = []
  var castList = xmlRequest.responseXML.getElementsByTagName("item");
  for (var i = 0; i < castList.length; i++) {
    var currentAttribs = castList[i].children;
    var currentTitle = currentAttribs[0].innerHTML;
    var currentDescription = currentAttribs[2].innerHTML;
    var currentURL = currentAttribs[4].attributes[0].nodeValue;
    var currentDate = currentAttribs[5].innerHTML;
    allCasts.push([currentTitle, currentDescription, currentURL, currentDate]);
  }
  allCasts.sort(function(a, b) {
    var c = new Date(a[4]);
    var d = new Date(b[4]);
    return c - d;
  });
  console.log(allCasts);
}

var xmlRequest = new XMLHttpRequest();
xmlRequest.addEventListener("load", parseXML);
xmlRequest.open("GET", "https://222talks.github.io/rss/latenighttalks.xml");
xmlRequest.send();
