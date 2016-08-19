function Currency(el) {
	'use strict';
	if (!el) return;
	this.currencyEl = el;
	this.currencyBanksUrl = ["Альфа-Банк", "ПриватБанк", "ПУМБ", "Укрсоцбанк", "Райффайзен Банк Аваль"];
	this.currencyResponsObj = [];
	this.currencyInit();
}

Currency.prototype = Object.create(App.prototype);

Currency.prototype.currencyInit = function() {
	'use strict';
		var currencyUrl = 'http://' + location.hostname + '/site/tryCurrency';
		this.XMLLoad('GET', currencyUrl, this.currencyJSONPars, this)
};

Currency.prototype.currencyJSONPars = function (response, self) {
	'use strict';
	var jPars = JSON.parse(response);
	// for (var i = 0; i < jPars.length; i++) {
	// 	if (self.currencyBanksUrl.indexOf(jPars[i]) !== -1) {
	// 		self.currencyCreateObj(jPars[i], self);
	// 	}
	// }
	for (var i = 0; i < self.currencyBanksUrl.length; i++) {
		for (var j = 0; j < jPars.length; j++) {
			if (self.currencyBanksUrl[i] === jPars[j].bankName) {
			self.currencyCreateObj(jPars[j], self);
			}
		}
	}
	self.currencyCreateElement(self);
};

Currency.prototype.currencyCreateObj = function (response, self) {
	'use strict';
	var cuObj = false;
	for (var key in self.currencyResponsObj) {
		if (key === response.bankName) {
			cuObj = true;
		}
	}
	if (cuObj === false) {
		self.currencyResponsObj[response.bankName] = [];
		self.currencyResponsObj[response.bankName][response.codeAlpha] = {rateBuy: response.rateBuy, rateSale: response.rateSale};
	} else {
		self.currencyResponsObj[response.bankName][response.codeAlpha] = {rateBuy: response.rateBuy, rateSale: response.rateSale};
	}
};

Currency.prototype.currencyCreateElement = function(self) {
	'use strict';
	var nameBank = '';
	console.log(self.currencyResponsObj)
	console.log(self.currencyResponsObj instanceof Array);
	for (var name in self.currencyResponsObj) {
		nameBank += '<tr>' +
									'<td>' +
										'<p><i>' + name + '</i></p>' +
									'</td>' +
									'<td>' +
										'<span>' +
											'<b>&euro;</b>' +
										'</span>' +
										'<span>' +
											'<b>$</b>' +
										'</span>' +
										'<span>' +
											'<b>R</b>' +
										'</span>' +
									'</td>' +
									'<td>' +
										'<span>' +
											self.currencyResponsObj[name].EUR.rateBuy +
										'</span>' +
										'<span>' +
											self.currencyResponsObj[name].USD.rateBuy +
										'</span>' +
										'<span>' +
											self.currencyResponsObj[name].RUB.rateBuy +
										'</span>' +
									'</td>' +
									'<td>' +
										'<span>' +
											self.currencyResponsObj[name].EUR.rateSale +
										'</span>' +
										'<span>' +
											self.currencyResponsObj[name].USD.rateSale +
										'</span>' +
										'<span>' +
											self.currencyResponsObj[name].RUB.rateSale +
										'</span>' +
									'</td>' +
								'</tr>';
	}
	var strin = '<table class="-new-currensy">' +
								'<tr>' +
									'<th>' +
										'<span>Банк</span>' +
									'</th>' +
									'<th>' +
										'<span style="font-size: 18px">&#402;</span>' +
									'</th>' +
									'<th>' +
										'<span>Покупка</span>' +
									'</th>' +
									'<th>' +
										'<span>Продажа</span>' +
									'</th>' +
								'</tr>' +
								nameBank +
							'</table>';
	self.currencyEl.insertAdjacentHTML('beforeend', strin);
};
