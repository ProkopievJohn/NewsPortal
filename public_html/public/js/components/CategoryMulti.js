function CategoryMulti(el, dataEl) {
	'use strict';
	if (!el || !dataEl) return;
	this.catMultiEl = el;
	this.catMultiID = dataEl.getAttribute('data-id');
	this.catMultiCount = dataEl.getAttribute('data-count');
	this.catMultiStatus = true;
	this.catMultiMasonry = false;
	this.catMultiInit();
}

CategoryMulti.prototype = Object.create(App.prototype);

CategoryMulti.prototype.catMultiInit = function () {
	'use strict';
	this.catMultiEl.classList.add('grid');
	this.catMultiXML();
	this.catMultiEL();
};

CategoryMulti.prototype.catMultiXML = function () {
	'use strict';
	var catMultiUrl = 'http://' + location.hostname + '/site/GetMultimedia?offset=' + this.catMultiCount;
	this.XMLLoad('GET', catMultiUrl, this.catMultiJSONPars, this);
	this.catMultiStatus = false;
};

CategoryMulti.prototype.catMultiEL = function() {
	'use strict';
	window.addEventListener('scroll', this.catMultiWinEL.bind(this));
};

CategoryMulti.prototype.catMultiWinEL = function () {
	'use strict';
	if (this.catMultiStatus === false) return;
	var width = document.body.scrollHeight - window.scrollY;
	if (width < 2000) {
		this.catMultiXML();
	}
};

CategoryMulti.prototype.catMultiJSONPars = function (response, self) {
	'use strict';
	var jPars = JSON.parse(response),
			jParsMulti = JSON.parse(jPars.multimedia);
	self.catMultiCreateElement(jParsMulti, jPars.language, jPars.offset, self);
};

CategoryMulti.prototype.catMultiCreateElement = function (response, lang, offset, self) {
	'use strict';
	var elems = [],
			fragment = document.createDocumentFragment();
	for (var i = 0; i < response.length; i++) {
		var href = response[i].type === 'photo' ? '/' + lang + '/site/photos/' + response[i].id : '/' + lang + '/site/video/' + response[i].id,
				src = response[i].type === 'photo' ? 'http://val.ua/uploads/galery/category/' + response[i].image : 'http://img.youtube.com/vi/' + response[i].image + '/mqdefault.jpg',
				el = document.createElement('a'),
				strin = '<span class="-val-multimedia-description">' +
									response[i]['name_' + lang] +
								'</span>' +
								'<div class="val-image-block-multimedia">' +
									'<img src="' + src + '">' +
								'</div>';
		el.className += 'val-block-multimedia -val-ico-' + response[i].type;
		el.insertAdjacentHTML('beforeend', strin);
		fragment.appendChild(el);
		elems.push(el);
	};
	self.catMultiEl.appendChild(fragment);
	if (self.catMultiMasonry === false) {
		self.catMultiMasonry = new Masonry(self.catMultiEl, {
			columnWidth: 200,
			itemSelector: '.val-block-multimedia'
		});
	} else {
		self.catMultiMasonry.appended(elems);
	}
	self.catSinCount = 15;
	this.catSinStatus = true;
};
