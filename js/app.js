	var grades = [
		{val:1,       label:'10<sup>1</sup>',  color:'rgb(255,0,0)'},
		{val:0.1,     label:'10<sup>-1</sup>', color:'yellow'},
		{val:0.01,    label:'10<sup>-2</sup>', color:'rgb(0,255,0)'},
		{val:0.001,   label:'10<sup>-3</sup>', color:'rgb(0,255,255)'},
		{val:0.00001, label:'10<sup>-5</sup>', color:'rgb(0,0,255)'}
	];
	
	var options = {
		gridSize: 0.5,
		circleRadius: 10, // 30
		grades: grades
	};

	var options2 = {
		gridSize: 1,
		circleRadius: 10, // 30
		grades: grades
	};

	var mapDisplay = new MapDisplay('map');
	var map = mapDisplay.map;
	var animatedLayer = new AnimatedLayer(options);
	var navigationBar = new NavigationBar();
	
	mapDisplay.addLegend(options);
	//mapDisplay.addTitle("Title", "Subtitle");		
	
	var setData = function(data, options) {
		navigationBar.config(data.length);
		animatedLayer.setOptions(options);
		animatedLayer.setData(data);
	};
	
	setData(zamgTestData1.data, options2);