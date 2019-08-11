"use strict"

var allCasts = [];

function formHTML() {
  var newHTML = "";
  var castNumber = allCasts.length;
  for (var i = 0; i < 5 && i < castNumber; i++) {
    var currentIterHTML = '\n        <div class="episode">\n          <div class="epTitle">'+allCasts[0][0]+'</div>\n          <div class="epDescription">\n            '+allCasts[0][1]+'\n          </div>\n          <audio controls preload="metadata" src="'+allCasts[0][2]+'"></audio><p>'+allCasts[0][2]+'</p>\n          <div class="epCast">'+allCasts[0][3]+'</div><div class="epDate">'+allCasts[0][4]+'</div>\n        </div>\n';
    allCasts.shift();
    newHTML += currentIterHTML;
  }
  document.getElementById("jsfill").innerHTML = newHTML;
  if (document.getElementById("load").getBoundingClientRect().top > document.documentElement.clientHeight) {
    document.getElementById("load").style.display = "none";
  }
}

function parseXML () {
  var castList = xmlRequest.responseXML.getElementsByTagName("item");
  if (typeof castList[0].children === "object") {
    for (var i = 0; i < castList.length; i++) {
      var currentAttribs = castList[i].children;
      var currentTitle = currentAttribs[0].innerHTML;
      var currentDescription = currentAttribs[2].innerHTML;
      var currentURL = currentAttribs[4].attributes[0].nodeValue;
      var currentDate = currentAttribs[5].innerHTML;
      allCasts.push([currentTitle, currentDescription, currentURL, "Late Night Talks", currentDate]);
    }
  } else {
    for (var i = 0; i < castList.length; i++) {
      var currentAttribs = castList[i].childNodes;
      var currentTitle = currentAttribs[1].textContent;
      var currentDescription = currentAttribs[5].textContent;
      var currentURL = currentAttribs[9].attributes[0].nodeValue;
      if (currentURL === "audio/mpeg") {
        currentURL = currentAttribs[9].attributes[2].nodeValue;
      }
      var currentDate = currentAttribs[11].textContent;
      allCasts.push([currentTitle, currentDescription, currentURL, "Late Night Talks", currentDate]);
    }
  }
  allCasts.sort(function(a, b) {
    var c = new Date(a[4]);
    var d = new Date(b[4]);
    return d - c;
  });
  formHTML();
}

var xmlRequest = new XMLHttpRequest();
xmlRequest.addEventListener("load", parseXML);
xmlRequest.open("GET", "https://222talks.github.io/rss/latenighttalks.xml");
xmlRequest.send();
