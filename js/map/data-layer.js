	var DataLayer;
	
	function DataLayer(options) {
		this.setOptions(options);
		this.visualizationType = 'circle';
		this.layer = new L.LayerGroup();
		map.addLayer(this.layer);
	}
	
	/**
	 * Sets the options.
	 * 
	 * @param {Object} options Option array
	 * @return {void}
	 */
	DataLayer.prototype.setOptions = function(options) {
		this.grades = options.grades;
		this.circleRadius_m = options.circleRadius * 1000;		// in meters
		this.rectangleHalfSize = options.gridSize / 2;		
	};
	
	/**
	 * 
	 * @param {Array} data
	 */
	DataLayer.prototype.plotPoints = function(data) {
		var point,
			opacity,
			color,
			options,
			_visualizationType = this.visualizationType;

		this.layer.clearLayers();
		//map.removeLayer(this.layer);

		for(var i=0, len=data.length; i < len; i++) {
			point = data[i];
			opacity = 1;
			if (point.in === 'no') {
				continue;
				opacity = 0.2;
			}
			
			color = this.getColor(point.val);
			
			options = {
				color: color,
				opacity: opacity,
				fillColor: color,
				fillOpacity: opacity
			};

			if (_visualizationType === 'circle') {
				L.circle([point.lat, point.lon], this.circleRadius_m, options).addTo(this.layer);
			} else if (_visualizationType === 'rectangle') {
				L.rectangle([[point.lat - this.rectangleHalfSize, point.lon - this.rectangleHalfSize], [point.lat + this.rectangleHalfSize, point.lon + this.rectangleHalfSize]], options).addTo(this.layer);
			} else if (_visualizationType === 'dot') {
				L.circle([point.lat, point.lon], 1000, options).addTo(this.layer);				
			}
		}
	};
	
	/**
	 * Gets a color for a the given value.
	 * 
	 * @private
	 * @param {number} v Value
	 * @return {String} Color as string
	 */
	DataLayer.prototype.getColor = function(v) {
		return v > this.grades[0].val ? this.grades[0].color :
           v > this.grades[1].val ? this.grades[1].color :
           v > this.grades[2].val ? this.grades[2].color :
           v > this.grades[3].val ? this.grades[3].color :
                                    this.grades[4].color;
	};
	
	/**
	 * Sets the visualization type.
	 * 
	 * @param {string} type Visualization type ('circle', 'rectangle', etc.)
	 * @return {void}
	 */
	DataLayer.prototype.setVisualizationType = function(type) {
		this.visualizationType = type;
	};
