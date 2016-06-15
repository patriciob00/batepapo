(function() {
  'use strict';

  angular
    .module('bate-papo', ['ui.router', 'chats.config', 'chats.main'])

    .config(AppConfig)

    .controller('AppCtrl', AppCtrl);

    AppConfig.$inject = ['$stateProvider', '$urlRouteProvider', '$httpProvider', '$compileProvider'];
    function AppConfig($stateProvider, $urlRouteProvider, $httpProvider, $compileProvider) {
      $compileProvider.debugInfoEnabled(false);

      $urlRoouteProvider.otherwise('app/chat');

      $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: "templates/app.html",
            controller: "AppCtrl",
          })
          .state('app.chats', {
            url: '/chats',
            templateUrl: 'templates/chats/chats.html',
            controller: "chatsCtrl"
          });
    }

    AppCtrl.$inject = ['$scope', '$http', '$window', '$rootScope'];
    function AppCtrl($scope, $http, $window, $rootScope) {
      
          // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      if(isIE){ angular.element($window.document.body).addClass('ie');}
      // if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};

    }
})();
