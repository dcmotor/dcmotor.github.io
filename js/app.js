(function(){

	var settings = {
		channel: 'pi-house',
		publish_key: 'demo',
		subscribe_key: 'demo'
	};

	var pubnub = PUBNUB(settings);

	var motoren = document.getElementById('motoren');
	var motorspd = document.getElementById('motorspd');


	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.temperature) {
				document.querySelector('[data-temperature]').dataset.temperature = m.temperature;
			}
			if(m.humidity) {
				document.querySelector('[data-humidity]').dataset.humidity = m.humidity;
			}
		}
	})

	function publishUpdate(data) {
		pubnub.publish({
			channel: settings.channel, 
			message: data
		});
	}

	// UI EVENTS

	motoren.addEventListener('change', function(e){
		publishUpdate({item: 'motoren', open: this.checked});
	}, false);

	motorspd.addEventListener('change', function(e){
		publishUpdate({item: 'light-living', brightness: +this.value});
	}, false);

})();
