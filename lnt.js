"use strict"

var episodesToLoad = 3;
var feedsToParse = 1;

var xmlRequest1 = new XMLHttpRequest();
xmlRequest1.open("GET", "https://222talks.github.io/rss/latenighttalks.xml");
xmlRequest1.timeout = 4000;
xmlRequest1.onload = function() {parseXML(xmlRequest1, "Late Night Talks")};
xmlRequest1.ontimeout = function() {netError()};
xmlRequest1.send();
