function CategorySingle(el, dataEl) {
	'use strict';
	if (!el || !dataEl) return;
	this.catSinEl = el;
	this.catSinID = dataEl.getAttribute('data-id');
	this.catSinCount = dataEl.getAttribute('data-count');
	this.catSinStatus = true;
	this.catSinInit();
}

CategorySingle.prototype = Object.create(App.prototype);

CategorySingle.prototype.catSinInit = function () {
	'use strict';
	this.catSinXML();
	this.catSinEL();
};

CategorySingle.prototype.catSinXML = function () {
	'use strict';
	var catSinUrl = 'http://' + location.hostname + '/site/GetCategoryByIdXhrOrNotId?id=' + this.catSinID + '&offset=' + this.catSinCount;
	this.XMLLoad('GET', catSinUrl, this.catSinJSONPars, this);
	this.catSinStatus = false;
};

CategorySingle.prototype.catSinEL = function() {
	'use strict';
	window.addEventListener('scroll', this.catSinWinEL.bind(this));
};

CategorySingle.prototype.catSinWinEL = function () {
	'use strict';
	if (this.catSinStatus === false) return;
	var width = document.body.scrollHeight - window.scrollY;
	if (width < 2000) {
		this.catSinXML();
	}
};

CategorySingle.prototype.catSinJSONPars = function (response, self) {
	'use strict';
	var jPars = JSON.parse(response),
			jParsNews = JSON.parse(jPars.news);
	self.catSinCreateElement(jParsNews, jPars.language, jPars.offset, self);
};

CategorySingle.prototype.catSinCreateElement = function (response, lang, offset, self) {
	'use strict';
	var strin = '';
	for (var i = 0; i < response.length; i++) {
		strin += '<a href="/site/news/' + response[i].id + '" class="val-block-gen-news">' +
								'<div class="val-image-block-gen-news">' +
									'<img src="/uploads/news/thumb/' + response[i].image + '">' +
								'</div>' +
								'<div class="val-description-block-gen-news">' +
									'<span class="val-news-view">' + response[i].views + '</span>' +
									'<span class="val-content-news-data">' + self.getDate(response[i].date, lang) + '</span>' +
									'<h3 class="val-content-news-title-small">' + response[i]['title_' + lang] + '</h3>' +
								'</div>' +
							'</a>';
	}
	self.catSinEl.insertAdjacentHTML('beforeend', strin);
	self.catSinCount = offset;
	this.catSinStatus = true;
};
