function Slider(el) {
	'use strict';
	if (!el) return;
	this.sliderEl = el;
	this.slider = el.querySelector('.val-list-slider');
	this.sliderItems = el.querySelectorAll('.val-list-slider-item');
	this.sliderControl = el.querySelector('.val-display-controls');
	this.sliderCreateSpansAndAddDataAtribute();
	this.sliderAddEL();
	this.sliderAuto();
	// this.sliderStartAutoPlay;
}

Slider.prototype.sliderCreateSpansAndAddDataAtribute = function() {
	'use strict';
	var spans = '';
	for (var i = 0; i < this.sliderItems.length; i++) {
		spans += i === 0 ? '<span data-controls="' + i + '" class="-active-slide"></span>' : '<span data-controls="' + i + '"></span>';
	}
	this.sliderControl.insertAdjacentHTML('beforeend', spans);
	this.slider.style.cssText += 'transition: all ease-in-out 800ms;';
	this.sliderSpansControl = this.sliderControl.querySelectorAll('span');
};

Slider.prototype.sliderAddEL = function() {
	'use strict';
	this.sliderControl.addEventListener('click', this.sliderActiveSpan.bind(this));
	this.sliderEl.addEventListener('mouseover', this.sliderAuto.bind(this, 'mouseover'));
	this.sliderEl.addEventListener('mouseout', this.sliderAuto.bind(this));
};

Slider.prototype.sliderActiveSpan = function(event) {
	'use strict';
	var target = event.path ? event && event.target || window.event.srcElement : event,
		elactive = document.querySelector('.-active-slide');
	if (target.tagName == 'SPAN' && !target.classList.contains('-active-slide')) {
		elactive.classList.remove('-active-slide');
		target.classList.add('-active-slide');
		this.slider.style.cssText += 'transform: translateX(' + (-this.sliderItems[0].offsetWidth * parseFloat(target.getAttribute('data-controls'))) + 'px);';
	}
};

Slider.prototype.sliderAuto = function (mouse) {
	'use strict';
	var self = this,
			nextactiveclass = document.querySelector('.-active-slide').nextElementSibling ? document.querySelector('.-active-slide').nextElementSibling : self.sliderSpansControl[0];
	mouse == 'mouseover' ? clearTimeout(self.sliderStartAutoPlay) : self.sliderStartAutoPlay = setTimeout(function(){
			self.sliderActiveSpan(nextactiveclass);
			self.sliderAuto();
		}, 5000);
};
