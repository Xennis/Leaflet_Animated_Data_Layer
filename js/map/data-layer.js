	var DataLayer;
	
	function DataLayer(options) {
		this.grades = options.grades;
		this.layer = new L.LayerGroup();
		this.circleRadius_km = 30;		// in kilometer
		this.rectangleHalfSize = 0.5;
	}
	
	DataLayer.prototype.plotPoints = function(data) {
		var point;
		var opacity;
		var color;
		
		var select_visualization = $("#select_visualization").val();

		for(var i=0, len=data.length; i < len; i++) {
			point = data[i];
			opacity = 1;
			if (point.in === 'no') {
				opacity = 0.0;
			}
			
			color = this.getColor(point.val);
			
			var options = {
				color: color,
				opacity: opacity,
				fillColor: color,
				fillOpacity: opacity
			};

			if (select_visualization === "circle") {
				L.circle([point.lat, point.lon], this.circleRadius_km * 1000, options).addTo(map);
			} else if (select_visualization === "rectangle") {
				L.rectangle([[point.lat - this.rectangleHalfSize, point.lon - this.rectangleHalfSize], [point.lat + this.rectangleHalfSize, point.lon + this.rectangleHalfSize]], options).addTo(this.layer);
			} else if (select_visualization == "dot") {
				L.circle([point.lat, point.lon], 1000, options).addTo(map);				
			}
		}
		map.addLayer(this.layer);
	};
	
	DataLayer.prototype.getColor = function(v) { 
		return v > this.grades[0].val ? this.grades[0].color :
           v > this.grades[1].val ? this.grades[1].color :
           v > this.grades[2].val ? this.grades[2].color :
           v > this.grades[3].val ? this.grades[3].color :
                                    this.grades[4].color;
	};
