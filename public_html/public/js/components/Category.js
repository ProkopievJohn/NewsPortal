function Category(el) {
	'use strict';
	if (!el) return;
	this.categoryEl = el;
	this.categoryStatus = true;
	this.categoryNumber = 0;
	this.categoryEL();
}

Category.prototype = Object.create(App.prototype);

Category.prototype.categoryEL = function() {
	'use strict';
	window.addEventListener('scroll', this.categoryWinEL.bind(this));
};

Category.prototype.categoryWinEL = function () {
	'use strict';
	if (this.categoryStatus === false) return;
	var width = document.body.scrollHeight - window.scrollY;
	if (width < 1000) {
		this.categoryStatus = false;
		this.categoryNumber = this.categoryNumber === 6 ? this.categoryNumber + 2 : this.categoryNumber + 1;
		if (this.categoryNumber > 9) return;
		this.categoryXML(this.categoryNumber);
	}
};

Category.prototype.categoryXML = function(id) {
	'use strict';
	var categoryUrl = 'http://' + location.hostname + '/site/GetCategory?id=' + id;
	this.XMLLoad('GET', categoryUrl, this.categoryJSONPars, this);
};

Category.prototype.categoryJSONPars = function(response, self) {
	'use strict';
	var jPars = JSON.parse(response);
	var parscategory = JSON.parse(jPars.category);
	var parsnews = JSON.parse(jPars.news);
	self.currencyCreateElement(parsnews, parscategory, jPars.language, self);
};

Category.prototype.currencyCreateElement = function(parsnews, parscategory, lang, self) {
	'use strict';
	var instrin = '',
			strin = '';
	for (var i = 0; i < parsnews.length; i++) {
		if (i === 0) {
			instrin += '<a href="/site/news/' + parsnews[i].id + '" class="val-news-item-category val-category-image">' +
										'<div class="val-item-outer-category-image">' +
											'<img src="/uploads/news/thumb/' + parsnews[i].image + '" alt=" + arrays[title_ + lang] + ">' +
										'</div>' +
										'<div class="val-line-vews-data">' +
											'<span class="val-content-news-data">' + self.getDate(parsnews[i].date, lang) + '</span>' +
											'<span class="val-news-view">' + parsnews[i].views + '</span>' +
										'</div>' +
										'<h2 class="val-title-news-category">' + parsnews[i]['title_' + lang] + '</h2>' +
									'</a>';
		} else {
			instrin += '<a href="/site/news/' + parsnews[i].id + '" class="val-news-item-category val-category-image">' +
										'<div class="val-line-vews-data">' +
											'<span class="val-content-news-data">' + self.getDate(parsnews[i].date, lang) + '</span>' +
											'<span class="val-news-view">' + parsnews[i].views + '</span>' +
										'</div>' +
										'<h2 class="val-title-news-category">' + parsnews[i]['title_' + lang] + '</h2>' +
										'<p class="val-description-news-category">' + parsnews[i]['description_' + lang].substring(0, 250) + '</p>' +
									'</a>';
		}
	}
	strin = '<div class="val-category-block">' +
						'<h2 class="val-title-uppercase-with-line">' + parscategory[0]['name_' + lang] + '</h2>' +
						'<div class="val-news-list-category">' +
							instrin +
						'</div>' +
					'</div>';
	self.categoryEl.insertAdjacentHTML('beforeend', strin);
	self.categoryStatus = true;
};
