function Sticky(el) {
	'use strict';
	if (!el) return;
	this.stickyEl = el;
	this.stickyElPositionTop = el.offsetTop;
	this.stickyElPositionLeft = el.offsetLeft;
	this.stickyEL();
}

Sticky.prototype = Object.create(App.prototype);

Sticky.prototype.stickyEL = function () {
	'use strict';
	window.addEventListener('scroll', this.stickyStyl.bind(this));
	window.addEventListener('resize', this.stickyResize.bind(this));
};

Sticky.prototype.stickyStyl = function () {
	'use strict';
	this.stickyEl.style.cssText = this.stickyElPositionTop - window.scrollY < 0 ? 'position:fixed;top:0;left:' + this.stickyEl.offsetLeft + 'px;' : 'position:relative;top:0;left:0;';

};

Sticky.prototype.stickyResize = function () {
	'use strict';
	this.stickyEl.style.cssText = 'position:relative;top:0;left:0;';
	this.stickyElPositionTop = this.stickyEl.offsetTop;
	this.stickyElPositionLeft = this.stickyEl.offsetLeft;
	this.stickyStyl();
};