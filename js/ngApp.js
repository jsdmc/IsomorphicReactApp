var angular = require("angular");

require("angular-resource");

var app = angular.module("shakaBrahApp", ['ngResource']);

app.factory("ItemsService", require('./ngApp/services/ItemsService'));

app.directive("shakaView", require('./ngApp/directives/ShakaView'));

app.controller("shakaBrahAppCtrl", require('./ngApp/controllers/ShakaBrahCtrl'));