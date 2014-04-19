	var DataLayer;
	
	function DataLayer(options) {
		this.grades = options.grades;
		this.circleRadius_km = options.circleRadius;		// in kilometer
		this.rectangleHalfSize = options.gridSize / 2;
		this.layer = new L.LayerGroup();
		map.addLayer(this.layer);
	}
	
	/**
	 * 
	 * @param {Array} data
	 */
	DataLayer.prototype.plotPoints = function(data) {
		var point, opacity, color, options;

		var select_visualization = $("#select_visualization").val();
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

			if (select_visualization === "circle") {
				L.circle([point.lat, point.lon], this.circleRadius_km * 1000, options).addTo(this.layer);
			} else if (select_visualization === "rectangle") {
				L.rectangle([[point.lat - this.rectangleHalfSize, point.lon - this.rectangleHalfSize], [point.lat + this.rectangleHalfSize, point.lon + this.rectangleHalfSize]], options).addTo(this.layer);
			} else if (select_visualization === "dot") {
				L.circle([point.lat, point.lon], 1000, options).addTo(this.layer);				
			}
		}
	};
	
	DataLayer.prototype.getColor = function(v) {
		return v > this.grades[0].val ? this.grades[0].color :
           v > this.grades[1].val ? this.grades[1].color :
           v > this.grades[2].val ? this.grades[2].color :
           v > this.grades[3].val ? this.grades[3].color :
                                    this.grades[4].color;
	};
