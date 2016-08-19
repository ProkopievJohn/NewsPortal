function Iframe(el) {
	'use strict';
	if (!el) return;
	var template = this.loadIframe_template(el.getAttribute('data-src'));
	el.insertAdjacentHTML('beforeend', template);
}

Iframe.prototype.loadIframe_template = function(src) {
	'use strict';
	var str = "";
	var srcs = src.split(', ');
	for (var i = 0; i < srcs.length; i++) {
		str += '<div class="val-outer-frame">' + 
							'<span class="val-ico-online"><i>Online</i></span>' + 
							'<iframe src="' + srcs[i] + '" width="100%" height="270px"></iframe>' + 
						'</div>';
	}
	return str;
};
