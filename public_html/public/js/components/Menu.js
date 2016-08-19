function Menu(el) {
	'use strict';
	if (!el) return;
	this.menuEl = el;
	this.menuElBlock = el.querySelector('.val-menu-block');
	this.menulTime = 500;
	this.menuStatus = true;
	this.menuAddEL();
}

Menu.prototype = Object.create(App.prototype);

Menu.prototype.menuAddEL = function () {
	'use strict';
	this.menuEl.addEventListener('click', this.menuActive.bind(this));
};

Menu.prototype.menuActive = function (event) {
	'use strict';
	if (this.menuStatus === false) return;
	this.menuStatus = false;
	var target = event.target,
			self = this;
	if (target.classList.contains('val-button-menu') || target.classList.contains('val-main-menu')) {
		if (this.menuEl.querySelector('.val-main-menu').classList.contains('active')) {
			this.fade(this.menuElBlock, this.menulTime, '');
			this.menuElBlock.style.cssText += 'left:-50%;';
		} else {
			this.fade(this.menuElBlock, this.menulTime, 'up');
			setTimeout(function () {self.menuElBlock.style.cssText += 'left: 0;';}, 0);
		}
		this.menuEl.querySelector('.val-main-menu').classList.toggle('active');
	}
	setTimeout(function () {self.menuStatus = true;}, self.menulTime);
};