	var MapDisplay;

	/**
	 * MapDisplay
	 * 
	 * @constructor
	 * @param {HTMLElement|String} elementID Div element or its ID for the map
	 * @return {void}
	 */
	function MapDisplay(elementID) {

		var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		var osmAttribution = '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors';

		var baseLayer = L.tileLayer(osmUrl, {
			maxZoom: 18,
			styleId: 997,
			attribution: osmAttribution
		});
	
		this.map = L.map(elementID, {
			center: [47, 20],
			zoom: 4,
			layers: [baseLayer]
		});
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
