"use strict"

var startLoad = Date.now();
var allCasts = [];

function cleanup() {
  document.getElementById("load").style.display = "none";
  document.getElementById("jsfill").className = "";
  document.getElementById("load").className = "";
}

function netError () {
  document.getElementById("jsfill").innerHTML = '<div class="description">Error loading recent episodes.  Please try again soon, and if this error persists, let us know.</div>';
  if (document.getElementById("load").getBoundingClientRect().top > document.documentElement.clientHeight || Date.now() - startLoad < 150) {
    document.getElementById("load").style.display = "none";
  } else {
    document.getElementById("load").className = "loaded";
    document.getElementById("jsfill").className += " jsloaded";
    setTimeout(cleanup, 1000);
  }
}

function iterateHTML(allCasts) {
  return '\n        <div class="episode">\n          <div class="epTitle">'+allCasts[0]+'</div>\n          <div class="epDescription">\n            '+allCasts[1]+'\n          </div>\n          <audio controls preload="metadata">\n            <source src="'+allCasts[2]+'.ogg" type="audio/ogg">\n            <source src="'+allCasts[2]+'.mp3" type="audio/mpeg">\n          </audio>\n          <div class="epCast">'+allCasts[3]+'</div><div class="epDate">'+allCasts[4]+'</div>\n        </div>\n';
}

function formHTML() {
  var newHTML = "";
  var castNumber = allCasts.length;
  for (var i = 0; i < episodesToLoad && i < castNumber; i++) {
    var currentIterHTML = iterateHTML(allCasts[0]);
    allCasts.shift();
    newHTML += currentIterHTML;
  }
  document.getElementById("jsfill").innerHTML = newHTML;
  if (document.getElementById("load").getBoundingClientRect().top > document.documentElement.clientHeight || Date.now() - startLoad < 150) {
    document.getElementById("load").style.display = "none";
  } else {
    document.getElementById("load").className = "loaded";
    document.getElementById("jsfill").className += " jsloaded";
    setTimeout(cleanup, 1000);
  }
}

function parseXML (xmlRequest, castName) {
  try {
    var castList = xmlRequest.responseXML.getElementsByTagName("item");
  } catch (e) {
    console.log(e);
    netError();
    return;
  }
  if (typeof castList === "undefined") {
    netError();
    console.log("castList was undefined");
    return;
  }
  
  if (typeof castList[0].children === "object") {
    for (var i = 0; i < castList.length; i++) {
      var currentAttribs = castList[i].children;
      var currentTitle = currentAttribs[0].innerHTML;
      var currentDescription = currentAttribs[2].innerHTML;
      var currentURL = currentAttribs[4].attributes[0].nodeValue;
      if (currentURL === "audio/mpeg") {
        currentURL = currentAttribs[4].attributes[2].nodeValue;
      }
      var currentDate = currentAttribs[5].innerHTML;
      allCasts.push([currentTitle, currentDescription, currentURL.slice(0, -4), castName, currentDate]);
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
      allCasts.push([currentTitle, currentDescription, currentURL.slice(0, -4), castName, currentDate]);
    }
  }
  allCasts.sort(function(a, b) {
    var c = new Date(a[4]);
    var d = new Date(b[4]);
    return d - c;
  });
  feedsToParse--;
  if (feedsToParse === 0) {
    formHTML();
  }
}
