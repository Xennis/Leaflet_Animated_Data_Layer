	var options = {
		grades: [
			{val:1,       label:"10<sup>1</sup>",  color:"rgb(255,0,0)"},
			{val:0.1,     label:"10<sup>-1</sup>", color:'yellow'},
			{val:0.01,    label:"10<sup>-2</sup>", color:"rgb(0,255,0)"},
			{val:0.001,   label:"10<sup>-3</sup>", color:'rgb(0,255,255)'},
			{val:0.00001, label:"10<sup>-5</sup>", color:'rgb(0,0,255)'}
		]
	};

	var mapDisplay = new MapDisplay('map');
	mapDisplay.addLegend(options);
	//mapDisplay.addTitle("Title", "Subtitle");
	var map = mapDisplay.map;
		
	var animatedLayer = new AnimatedLayer(options);
	var navigationBar = new NavigationBar(zamgTestData.data.length);
		
	animatedLayer.setData(zamgTestData.data);