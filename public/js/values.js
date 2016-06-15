( function() {
	agular.module('chats.config', [])
		.value('config', {
			apiUSERS : '/api/usuarios',
			apiMSG : '/api/mensagem'
		});
})();