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
// var batepapo = angular.module('appBatepapo', []);

// batepapo.controller('batepapoController', ['$scope', '$http', '$location', '$anchorScroll','$timeout', function($scope, $http, $location, $anchorScroll, $timeout) {
  
//   //usuario atual logado
//   $scope.usuarioLogado = null;
//   $scope.conversa = [];
//   $scope.paramsMsg = [];


//   //login
//   $scope.submitLogin = function(){
//     var login = this.login;
//     var url = '/api/usuarios';

//     $http.get(url, {params: login})

//           .then(function(response){
//             var usuario = response.data[0];
//             if(!angular.isUndefined(usuario)) {
//               delete usuario.senha
//               $scope.usuarioLogado = usuario;
//               $scope.buscarMsg();
//             }
//             else
//               Materialize.toast('Login ou senha incorreto', 4000);
//           });
//   }

//   //cadastro
//   $scope.submitCadastro = function(){
//     var cadastro = this.cadastro;
//     var url = '/api/usuarios';

//     $http.post(url,cadastro)

//           .then(function(response){
//             var usuario = response.data;
//             if(!angular.isUndefined(usuario)){
//               delete usuario.senha;
//               $scope.usuarioLogado = usuario;
//               $scope.buscarMsg();
//             }
//             else
//               Materialize.toast('Login ou senha incorreto', 4000);

//           }, function(error){
//             console.log(error);
//           });

//   }

//   //enviarMsgm
//   $scope.enviarMsg = function(){
//     var msg = this.msg;
//     var url = '/api/mensagem';

//     $http.post(url, {msg : msg.mensagem, remetente : $scope.usuarioLogado})
//     .then(function(response){
//             $scope.msg.mensagem = '';
//             $scope.buscarMsg();
//           });
//   }

//   //buscarMsg
//   $scope.buscarMsg = function(){

//         var url = '/api/mensagem';
//         $http.get(url, {params : {
//           s : {"data" : "desc"},
//           limit : 10
//         }})

//           .then(function(response){
//             $scope.conversa = response.data;
            
//             $location.hash('bottom');
//             $anchorScroll();  
//             $timeout(function(){$scope.buscarMsg()}, 3000);          
//           });

          
//   }

//   //deletar msg
//   $scope.deletarMsg = function(mensagem){

//     var url = '/api/mensagem/' + mensagem._id;

//     if(confirm('Deseja deletar esta mensagem?')){
//             $http.delete(url)
//             .then(function(response){
//                 $scope.buscarMsg();
//                 Materialize.toast('mensagem deletada com sucesso!', 4000);
//             });
//     }
//   }



//   }]);