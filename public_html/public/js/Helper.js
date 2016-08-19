function Helper() {
}

/*DATE*/

Helper.prototype.getDate = function(date, lang) {
	'use strict';
	var now = this.getDate_Date(),
			news = this.getDate_Date(date),
			respons = '';
	if (now.datesValue == news.datesValue) {
		return respons += now.dates.getHours() + ':' + now.dates.getMinutes();
	} else {
		return respons += news.dates.getDate() + ' ' + this.mounthObject[lang][news.dates.getMonth() + 1] + ' ' + news.dates.getFullYear();
	}
};

Helper.prototype.getDate_Date = function(data) {
	'use strict';
	var dates = data ? new Date(data) : new Date(),
			datesValue = (new Date(dates.getFullYear(),dates.getMonth(),dates.getDate())).valueOf();
	return {dates: dates,	datesValue: datesValue};
};


/*XMLLOAD*/

Helper.prototype.XMLLoad = function (method, url, callback, self) {
	'use strict';
	var xml = new XMLHttpRequest();
	xml.addEventListener('readystatechange', function () {
		if (xml.readyState == 4 && xml.status == 200) {
			callback(xml.responseText, self);
		}
	});
	xml.open(method, url, true);
	xml.send();
};


/*SEARCH IN ARRAY*/

Helper.prototype.searchInArray = function (obj, key, callback, self) {
	'use strict';
	for (var i in obj) {
		if (i == key) {
			callback(obj[i], self);
		} else if (typeof obj[i] == "object" && Object.keys(obj[i]).length > 0) {
			self.searchInArray(obj[i], key, callback, self);
		}
	}
};

Helper.prototype.fade = function (el, time, up) {
	'use strict';
	var time = up === 'up' ? 0 : time;
	el.style.cssText += up === 'up' ? 'display: block;' : 'opacity: 0;';
	setTimeout(function () {el.style.cssText += up === 'up' ? ' opacity: 1;' : 'display:none;';}, time);
};

Helper.prototype.mounthObject = {
	ru: {
		1: 'Января',
		2: 'Февраля',
		3: 'Марта',
		4: 'Апреля',
		5: 'Мая',
		6: 'Июня',
		7: 'Июля',
		8: 'Августа',
		9: 'Сентября',
		10: 'Октября',
		11: 'Ноября',
		12: 'Декабря'
	},
	uk: {
		1: "Січня",
		2: "Лютого",
		3: "Березня",
		4: "Квітня",
		5: "Травня",
		6: "Червня",
		7: "Липня",
		8: "Серпня",
		9: "Вересня",
		10: "Жовтня",
		11: "Листопада",
		12: "Грудня"
	}
};

Helper.prototype.weatherDescription = {
	0: 'Торнадо',
	1: 'Тропічний шторм',
	2: 'Ураган',
	3: 'Сильні грози',
	4: 'Грози',
	5: 'Змішаний дощ зi снігом',
	6: 'Змішаний дощ зi снігом',
	7: 'Змішаний дощ зi снігом',
	8: 'Паморозь',
	9: 'Мряка',
	10: 'Град',
	11: 'Зливи',
	12: 'Зливи',
	13: 'Сніговi пориви',
	14: 'Легкий сніг',
	15: 'Хуртовина',
	16: 'Снiг',
	17: 'Град',
	18: 'Дощ зі снігом',
	19: 'Туманно',
	20: 'Туманно',
	21: 'Туманно',
	22: 'Туманно',
	23: 'Вітрянно',
	24: 'Вітрянно',
	25: 'Прохолодно',
	26: 'Хмарно',
	27: 'Переважно хмарно',
	28: 'Переважно хмарно',
	29: 'Мінлива хмарність',
	30: 'Мінлива хмарність',
	31: 'Ясно',
	32: 'Сонячно',
	33: 'Ясно',
	34: 'Ясно',
	35: 'Змішаний дощ з градом',
	36: 'Спекотно',
	37: 'Грози',
	38: 'Розсіяні грози',
	39: 'Розсіяні грози',
	40: 'Мінлива хмарність',
	41: 'Сильний снігопад',
	42: 'Снігопад',
	43: 'Сильний снігопад',
	44: 'Мінлива хмарність',
	45: 'Зливи',
	46: 'Зливовий сніг',
	47: 'Зливи'
};

Helper.prototype.weatherDays = {
	Mon: 'Понедiлок',
	Tue: 'Вiвторок',
	Wed: 'Середа',
	Thu: 'Четвер',
	Fri: 'П`ятниця',
	Sat: 'Субота',
	Sun: 'Недiля'
};
