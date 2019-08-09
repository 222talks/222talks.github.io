"use strict"

var allCasts = [];

function formHTML() {
  var newHTML = "";
  for (var i = 0; i < 5 && i < allCasts.length; i++) {
    var currentIterHTML = "";
    newHTML += currentIterHTML;
  }
  document.getElementById("jsfill").innerHTML = newHTML;
}

function parseXML () {
  var castList = xmlRequest.responseXML.getElementsByTagName("item");
  for (var i = 0; i < castList.length; i++) {
    var currentAttribs = castList[i].children;
    var currentTitle = currentAttribs[0].innerHTML;
    var currentDescription = currentAttribs[2].innerHTML;
    var currentURL = currentAttribs[4].attributes[0].nodeValue;
    var currentDate = currentAttribs[5].innerHTML;
    allCasts.push([currentTitle, currentDescription, currentURL, "Late Night Talks", currentDate]);
  }
  allCasts.sort(function(a, b) {
    var c = new Date(a[4]);
    var d = new Date(b[4]);
    return c - d;
  });
  formHTML();
}

var xmlRequest = new XMLHttpRequest();
xmlRequest.addEventListener("load", parseXML);
xmlRequest.open("GET", "https://222talks.github.io/rss/latenighttalks.xml");
xmlRequest.send();
