function Weather(el) {
	'use strict';
	if (!el) return;
	this.weatherEl = el;
	this.weatherUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%3D918233%20and%20u%3D%22c%22&format=json&l=ru';
	this.weatherInit();
}

Weather.prototype = Object.create(App.prototype);

Weather.prototype.weatherInit = function(){
	'use strict';
	this.XMLLoad('GET', this.weatherUrl, this.weatherJSONPars, this);
};

Weather.prototype.weatherJSONPars = function(response, self) {
	'use strict';
	var jPars = JSON.parse(response);
	self.searchInArray(jPars, "item", self.weatherItem, self);
};

Weather.prototype.weatherItem = function (response, self) {
	var condition = response['condition'],
		forecast = response['forecast'];
	self.weatherCreateElement(condition, forecast, self);
};

Weather.prototype.weatherCreateElement = function (condition, forecast, self) {
	'use strict';
	var strin = '<div class="drop-weather-button">' +
		'<div class="outer-today-ico">' +
			'<span class="icons-for-c-min icon-weather-min-' + condition.code + '"></span>' +
			'<i class="today-weather">' + condition.temp + ' С°</i>' +
		'</div>' +
		'<div class="drop-wether">' +
			'<p class="for-genwether">' +
				'<span class="title-weather">Погода</span>' +
				'<span class="city-weather">Украина, Чернигов</span>' +
			'</p>' +
			'<div class="section-today">' +
				'<div class="for-weather-icon">' +
					'<h5 class="section-heading">Сьогодні</h5>' +
					'<span class="icons-for-c icon-weather-' + forecast[0].code + '"></span>' +
				'</div>' +
				'<div class="weather-detail">' +
					'<h4 class="weather-heading">' +
						'<span class="temp-now">' + condition.temp + ' С°</span>' +
						'<span class="phrase">Температура зараз</span>' +
					'</h4>' +
					'<span class="temperature high-temperature">' + forecast[0].high + ' С°</span>' +
					'&nbsp; - &nbsp;' +
					'<span class="temperature low-temperature">' + forecast[0].low + ' С°</span>' +
					'<p class="summary">' + self.weatherDescription[parseFloat(forecast[0].code)] + '</p>' +
				'</div>' +
			'</div>'+
			'<div class="section-this-week">' +
				'<h5 class="section-heading">Тиждень</h5>' +
				'<ul class="item-list-temperature">' +
					self.weatherCreateElementForecast(forecast, self) +
				'</ul>' +
			'</div>' +
		'</div>' +
	'</div>';
	self.weatherEl.insertAdjacentHTML('beforeend', strin);
};

Weather.prototype.weatherCreateElementForecast = function (forecast, self) {
	'use strict';
	var strin = '';
	for (var i = 0; i < 4; i++) {
		strin += '<li class="item-time-temperature">' +
			'<span class="icons-for-c icon-weather-' + forecast[i].code + '"></span>' +
			'<span class="day">' + self.weatherDays[forecast[i].day] + '</span>' +
			'<span class="temperature-days high-temperature">' + forecast[i].high + ' С°</span>' +
			'&nbsp;-&nbsp;' +
			'<span class="temperature-days low-temperature">' + forecast[i].low + ' С°</span>' +
		'</li>';
	}
	return strin;
};
