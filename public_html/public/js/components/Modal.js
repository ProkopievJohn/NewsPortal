function Modal (el) {
	'use strict';
	if (!el) return;
	this.modalEl = el;
	this.modalBlock = document.querySelector('.val-modal-login-reg-outer');
	this.modalRegistration = this.modalBlock.querySelector('.-reg-modal');
	this.modalLogin = this.modalBlock.querySelector('.-login-modal');
	this.modalAbout = this.modalBlock.querySelector('.-about-modal');
	this.modalTime = 500;
	this.modalInit();
}

Modal.prototype = Object.create(App.prototype);

Modal.prototype.modalInit = function () {
	'use strict';
	var transition = '-webkit-transition: all ' + this.modalTime + 'ms ease-in-out;-moz-transition: all ' + this.modalTime + 'ms ease-in-out;-o-transition: all ' + this.modalTime + 'ms ease-in-out;transition: all ' + this.modalTime + 'ms ease-in-out;';
	this.modalBlock.style.cssText += transition;
	this.modalRegistration.style.cssText += transition;
	this.modalLogin.style.cssText += transition;
	this.modalAbout.style.cssText += transition;
	this.modalAddEL();
};

Modal.prototype.modalAddEL = function () {
	'use strict';
	this.modalEl.addEventListener('click', this.modalActivBlock.bind(this));
	this.modalBlock.addEventListener('click', this.modalActivBlock.bind(this));
};

Modal.prototype.modalActivBlock = function (event) {
	'use strict';
	var target = event.target;
		
	if (target.classList.contains('button')) {
		this.fade(this.modalBlock, this.modalTime, 'up');
		if (target.classList.contains('-login')) {
			this.fade(this.modalLogin, this.modalTime, 'up');
		} else if (target.classList.contains('-registration')) {
			this.fade(this.modalRegistration, this.modalTime, 'up');
		}
	}

	if (target.classList.contains('-about')) {
		this.fade(this.modalBlock, this.modalTime, 'up');
		this.fade(this.modalAbout, this.modalTime, 'up');
	}

	if (target.classList.contains('val-close-modals')) {
		this.fade(this.modalBlock, this.modalTime, '');
		this.fade(target.parentNode, this.modalTime, '');
	}
};