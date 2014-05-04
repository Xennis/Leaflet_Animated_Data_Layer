	var MapDisplay;

	/**
	 * MapDisplay
	 * 
	 * @constructor
	 * @param {HTMLElement|String} id Div element or its ID for the map
	 * @return {void}
	 */
	function MapDisplay(id) {
			
		this.id = id;
		
		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/ad132e106cd246ec961bbdfbe0228fe8/{styleId}/256/{z}/{x}/{y}.png';
		var cloudmadeAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>';

		var baseLayer = L.tileLayer(cloudmadeUrl, {maxZoom: 18, styleId: 997, attribution: cloudmadeAttribution});
		var midnightLayer  = L.tileLayer(cloudmadeUrl, {styleId: 999, attribution: cloudmadeAttribution});
	
		this.map = new L.Map(this.id, {
			center: [47, 20],
			zoom: 4,
			layers: [midnightLayer, baseLayer]
		});
		
		var baseMaps = {
			"Night View": midnightLayer,
			"Minimal": baseLayer
		};

		L.control.layers(baseMaps).addTo(this.map);
		//L.control.scale().addTo(map);
	
		return;
	};
	
	/**
	 * Adds a title on the map.
	 * 
	 * @param {String} title Title
	 * @param {String} subtitle? Subtitle
	 * @return {void}
	 */
	MapDisplay.prototype.addTitle = function(title, subtitle) {
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>' + title + '</h4>' +  subtitle;
		};

		info.addTo(this.map);
	};
	
	/**
	 * Adds a lagend on the map.
	 * 
	 * @param {Object} options
	 * @return {void}
	 */
	MapDisplay.prototype.addLegend = function(options) {
		var grades = options.grades;
		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend');

			for (var i = 0; i < grades.length; i++) {
				div.innerHTML +=
					'<i style="background:' + grades[i].color + '"></i>&ge; ' +
					grades[i].label + (grades[i + 1] ? '<br>' : '');
			}
			return div;
		};

		legend.addTo(this.map);
	};
