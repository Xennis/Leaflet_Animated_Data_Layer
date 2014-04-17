	var NavigationBar;

	/**
	 * Naviagation bar
	 * 
	 * @constructor
	 * @param {number} dataLength Length of the given data
	 * @return {void}
	 */
	function NavigationBar(dataLength) {		
		this.button_start = $("#button_start");
		this.button_pause = $("#button_pause");
		this.checkbox_loop = $("#checkbox_loop");
		this.select_visualization = $("#select_visualization");
		this.input_date = $("#input_date");
		this.slider_date = $("#slider_date");
		
		this.init(dataLength);
		this.observe();
	}
	
	/**
	 * Intitializes all elements.
	 * 
	 * @param {number} dataLength Length of the given data
	 * @return {void}
	 */
	NavigationBar.prototype.init = function(dataLength) {
		this.slider_date.attr('max', dataLength - 1);
	};
	
	/**
	 * Resets all elements (expect the checkbox) to intial state.
	 * 
	 * @return {void}
	 */
	NavigationBar.prototype.reset = function() {
		this.button_start.text("Start");
		this.button_pause.text("Pause");
		this.button_pause.prop("disabled", true);
		this.input_date.text("");
		this.slider_date.val(0);
	};
	
	/**
	 * Updates all elements.
	 * 
	 * @param {number} index Current index 
	 * @param {numer} date Current timestamp in milliseconds
	 * @return {void}
	 */
	NavigationBar.prototype.update = function(index, date) {
		this.slider_date.val(index);
		this.input_date.val(new Date(date).toLocaleString());
	};
	
	NavigationBar.prototype.animatedStarted = function() {
		this.button_start.text("Stop");
		this.button_pause.prop("disabled", false);
		this.button_pause.text("Resume");	
	};
	
	/**
	 * Observes all elements.
	 * 
	 * @return {void}
	 */
	NavigationBar.prototype.observe = function() {
		var _this = this;

		this.button_start.click(function() {
			if ($(this).text() === "Start") {
				$(this).text("Stop");
				_this.button_pause.prop("disabled", false);
				animatedLayer.animationStart();
			} else {
				animatedLayer.animationStop();
				_this.reset();
			}
		});
		
		this.button_pause.click(function() {
			if ($(this).text() === "Pause") {
				$(this).text("Resume");
				animatedLayer.animationPause();
			} else {
				$(this).text("Pause");
				animatedLayer.animationResume();
			}
		});
		
		this.checkbox_loop.change(function() {
			animatedLayer.animationLoop($(this).prop('checked'));
		});
		
		this.select_visualization.change(function() {
			_this.animatedStarted();
			animatedLayer.animationPause();
			animatedLayer.showMoment();			
		});
		
		this.slider_date.change(function() {
			_this.animatedStarted();
			animatedLayer.animationPause();
			animatedLayer.showMoment($(this).val());
		});
		
	};