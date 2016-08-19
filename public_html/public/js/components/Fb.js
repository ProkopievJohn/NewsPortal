function Fb (el) {
	'use strict';
	if (!el) return;
	this.fbEl = el;
	this.fbInit();
}

Fb.prototype = Object.create(App.prototype);

Fb.prototype.fbInit = function () {
	'use strict';
	if (this.FbReadCookie('timedie')) return;
	this.fb
	var self = this;
	setTimeout(function(){
		self.fade(self.fbEl, 500, 'up');
	}, 3000);
};

Fb.prototype.FbReadCookie = function (name) {
	'use strict';
	var b = new RegExp( name + '=([^;]){1,}' ),
			c = b.exec(document.cookie);
	if (c) {
		c = c[0].split('=');
	} else {
		return false;
	}
	return c[1] ? c[1] : false;
};

// '<div class="fb">' +
// 	'<div class="fb-title">' +
// 		'<div class="fb-close">facebook</div>' +
// 	'</div>' +
// 	'<div class="fb-body"></div>' +
// 	'<div class="fb-sub"></div>' +
// '</div>'