'use strict';

angular
	.module('chats.service',[chats.config])

	.service('chatAPI', chatAPI);


	chatAPI.$inject = ['$http', 'config'];
	function chatAPI($http, config) {
		var  _login = function( credentials) {
			return $http.get(config.apiUSERS, credentials);
		};

		var _newUser = function(newUser) {
			return $http.post(config.apiUSERS, newUser);
		};

		var _sendMessage = function(message) {
			return $http({
				method: 'POST',
				url: config.ApiMSG,
				data: {
					msg : message.mensagem,
					remetente : $scope.usuarioLogado
				}
			})
		}

		var _searchMessage = function () {
			return $http.get(config.apiMSG, params : {  s : {"data" : "desc"}, limit : 10 }} );
		}

		var _deleteMessage = function (obj) {
			return $http.delete(config.apiMSG +"/"+ obj);
		}

	 return {
		login : _login,
		newUser : _newUser,
		sendMessage : _sendMessage,
		searchMessage : _searchMessage,
		deleteMessage : _deleteMessage
	 };
	}