	var AnimatedLayer;
	
	window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
		return window.setTimeout(callback, 1000 / 60);
	};

	/**
	 * Animated layer
	 * 
	 * @constructor
	 * @param {Object} options {gradient: {...}}
	 * @return {void}
	 */
	function AnimatedLayer(options) {
		this.options = options;
		this.data = [];
		this.momentIndex = 0;
		this.isPaused = false;
		this.isLooped = false;
	}
	
	/**
	 * Sets the data.
	 * 
	 * @param {Object} data
	 * @return {void}
	 */
	AnimatedLayer.prototype.setData = function(data) {
		this.data = data;
	};
	
	/**
	 * Shows a specific moment.
	 * 
	 * @param {number} index A index of the given data array.
	 * @return {void}
	 */
	AnimatedLayer.prototype.showMoment = function(index) {
		if (index >= 0) {
			this.momentIndex = index;
		}
		this.clearMap();
		navigationBar.update(this.momentIndex, this.data[this.momentIndex].date * 1000);
		var animatedLayer = new DataLayer(this.options);
		animatedLayer.plotPoints(this.data[this.momentIndex].points);
	};
	
	/**
	 * Animates the given data.
	 * 
	 * @return {Function}
	 */
	AnimatedLayer.prototype.animate = function() {
		var _this = this;
		var doDraw = function() {
			if (_this.isPaused) {
				return;
			}
		
			_this.showMoment();
			_this.momentIndex++;
			if (_this.momentIndex >= _this.data.length) {
				if (_this.isLooped) {
					_this.momentIndex = 0;
				} else {
					_this.animationStop();
					return;
				}
			}
			return window.requestAnimFrame(function() {
				return doDraw();
			});
		};
		return window.requestAnimFrame(function() {
			return doDraw();
		});
	};
	
	/**
	 * Starts the animation.
	 * 
	 * @return {void}
	 */
	AnimatedLayer.prototype.animationStart = function() {
		console.log("animationStart");
		this.isPaused = false;
		this.momentIndex = 0;
		this.animate();
	};
	
	/**
	 * Pauses the animation.
	 * 
	 * @return {void}
	 */	
	AnimatedLayer.prototype.animationPause = function() {
			this.isPaused = true;
	};
	
	/**
	 * Pauses the animation.
	 * 
	 * @return {void}
	 */	
	AnimatedLayer.prototype.animationResume = function() {
			console.log("resume");
			this.isPaused = false;
			this.animate();
	};
	
	/**
	 * Stops the animation.
	 * 
	 * @return {void}
	 */
	AnimatedLayer.prototype.animationStop = function() {
		console.log("animationStop");
		this.animationPause();
		this.clearMap();
		navigationBar.reset();
	};
	
	/**
	 * Set animation to a endless loop.
	 * 
	 * @param {boolean} isLooped True to activate endless loop
	 * @return {void}
	 */	
	AnimatedLayer.prototype.animationLoop = function(isLooped) {
			this.isLooped = isLooped;
	};		
	
	AnimatedLayer.prototype.clearMap = function() {
		for(i in map._layers){
			if(map._layers[i]._path != undefined) {
				try {
					map.removeLayer(map._layers[i]);
				} catch(e) {
					console.log("problem with " + e + map._layers[i]);
				}
			}
		}
	}