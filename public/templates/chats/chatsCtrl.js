(function() {
	angular.module('chats.main',['chats.service'])
		.controller('chatsCtrl', chatsCtrl);


	chatsCtrl.$inject = ['$scope', '$rootScope','$http', '$location', '$anchorScroll','$timeout', 'chatAPI'];
	function chatsCtrl($scope, $rootScope, $http, $location, $anchorScroll, $timeout, chatAPI) {

			//usuario atual logado
		  $scope.usuarioLogado = "";
		  $scope.conversa = [];
		  $scope.paramsMsg = [];

		  //login
		  $scope.submitLogin = function(form){
		    	chatAPI.login(form).then(function(response) {
		    		var usuario = response.data[0];
		            if(!angular.isUndefined(usuario)) {
			              delete usuario.senha
			              $scope.usuarioLogado = usuario;
			              $scope.buscarMsg();
		            }else
		              		Materialize.toast('Login ou senha incorreto', 4000);
		        });
		  };

		  //cadastro
		  $scope.submitCadastro = function(form){
		 	
		 		chatAPI.newUSer(form).then(function(response) {
		 			var usuario = response.data;
		            if(!angular.isUndefined(usuario)){
			              delete usuario.senha;
			              $scope.usuarioLogado = usuario;
			              $scope.buscarMsg();
			              Materialize.toast('Usuario cadastrado com sucesso', 3000);
		            } 
		          }, function(error){
		            console.log(error);
		          });
		 })

		  //enviarMsgm
		  $scope.enviarMsg = function(form){
		    chatAPI.sendMessage(form).then(function(response) {
		    	  $scope.message.$setPristine();
		            $scope.buscarMsg();
		    })

		  //buscarMsg
		  $scope.buscarMsg = function(){
		  	chatAPI.searchMessage().then(function(response) {
		  		  	$scope.conversa = response.data;      
		            $location.hash('bottom');
		            $anchorScroll();  
		            $timeout(function(){$scope.buscarMsg()}, 3000);
		  	})

		  //deletar msg
		  $scope.deletarMsg = function(obj){
		  	chatAPI.deleteMessage(obj._id).then(function(response) {
		  		$scope.buscarMsg();
		        Materialize.toast('mensagem deletada com sucesso!', 4000);
		  	})
	};
})();