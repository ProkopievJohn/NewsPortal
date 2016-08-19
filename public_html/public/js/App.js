function App() {
	this.init();
}

App.prototype = Object.create(Helper.prototype);

App.prototype.init = function(){
	new Iframe(document.querySelector('.val-iframe-streams'));
	new Slider(document.querySelector('.val-slider-general-news'));
	new Weather(document.querySelector('.outer-for-weather'));
	new Currency(document.querySelector('.-currency-val'));
	new Category(document.querySelector('.val-full-width-category'));
	new CategorySingle(document.querySelector('#val-single-category'), document.querySelector('#val-count-and-id'));
	new Modal(document.querySelector('.val-header'));
	new Menu(document.querySelector('.val-button-menu'));
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
})