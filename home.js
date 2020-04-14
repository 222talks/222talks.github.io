"use strict"

var episodesToLoad = 4;
var feedsToParse = 2;

var xmlRequest1 = new XMLHttpRequest();
xmlRequest1.open("GET", "https://222talks.github.io/rss/latenighttalks.xml");
xmlRequest1.timeout = 4000;
xmlRequest1.onload = function() {parseXML(xmlRequest1, "Late Night Talks")};
xmlRequest1.ontimeout = function() {netError()};
xmlRequest1.send();

var xmlRequest2 = new XMLHttpRequest();
xmlRequest2.open("GET", "https://222talks.github.io/rss/theJoeShow.xml");
xmlRequest2.timeout = 4000;
xmlRequest2.onload = function() {parseXML(xmlRequest2, "The Joe Show")};
xmlRequest2.ontimeout = function() {netError()};
xmlRequest2.send();
