
var batepapo = angular.module('appBatepapo', []);

batepapo.controller('batepapoController', ['$scope', '$http', function($scope, $http) {
  
  //usuario atual logado
  $scope.usuarioLogado = null;

  //login
  $scope.submitLogin = function(){
    var login = this.login;
    var url = '/api/usuarios';

    $http.get(url, {params: login})

          .then(function(response){
            if(!angular.isUndefined(response.data[0]))
              $scope.usuarioLogado = response.data;
            else
              Materialize.toast('Login ou senha incorreto', 4000);
          });
  }

  //cadastro
  $scope.submitCadastro = function(){
    var cadastro = this.cadastro;
    var url = '/api/usuarios';

    $http.post(url,cadastro)

          .then(function(response){
            if(!angular.isUndefined(response.data[0]))
              $scope.usuarioLogado = response.data;
            else
              Materialize.toast('Login ou senha incorreto', 4000);

          }, function(error){
            console.log(error);
          });

  }

  }]);