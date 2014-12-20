	var MapDisplay;

	/**
	 * MapDisplay
	 * 
	 * @constructor
	 * @param {HTMLElement|String} elementID Div element or its ID for the map
	 * @return {void}
	 */
	function MapDisplay(elementID) {

		// Replace 'examples.map-i87786ca' with your map id.
		var mapboxUrl = 'https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png'
		var mapboxAttribution = '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>';

		var baseLayer = L.tileLayer(mapboxUrl, {
			maxZoom: 18,
			styleId: 997,
			attribution: mapboxAttribution
		});
		var midnightLayer  = L.tileLayer(mapboxUrl, {
			styleId: 999,
			attribution: mapboxAttribution
		});
	
		this.map = L.map(elementID, {
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
