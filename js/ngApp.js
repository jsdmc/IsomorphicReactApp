var angular = require("angular");

require("angular-resource");

var app = angular.module("shakaBrahApp", ['ngResource']);

app.factory("ItemsService", require('./ngApp/services/ItemsService'));

app.directive("shakaView", require('./ngApp/directives/ShakaView'));

app.directive("viewItem", require('./ngApp/directives/ViewItem'));

app.controller("shakaBrahAppCtrl", require('./ngApp/controllers/ShakaBrahCtrl'));