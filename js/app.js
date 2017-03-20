(function(){

	var settings = {
		channel: 'pi-house',
		publish_key: 'demo',
		subscribe_key: 'demo'
	};

	var pubnub = PUBNUB(settings);

	var motoren = document.getElementById('motoren');
	var motorspd = document.getElementById('motorspd');

	function publishUpdate(data) {
		pubnub.publish({
			channel: settings.channel, 
			message: data
		});
	}

	motoren.addEventListener('change', function(e){
		publishUpdate({item: 'motoren', open: this.checked});
	}, false);

	motorspd.addEventListener('change', function(e){
		publishUpdate({item: 'light-living', brightness: +this.value});
	}, false);

})();
