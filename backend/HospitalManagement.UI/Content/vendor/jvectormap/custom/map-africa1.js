// Africa
$(function(){
	$('#mapAfrica').vectorMap({
		map: 'africa_mill',
		backgroundColor: '#ffffff',
		scaleColors: ['#4266b2'],
		zoomOnScroll:false,
		zoomMin: 1,
		hoverColor: true,
		series: {
			regions: [{
				values: gdpData,
				scale: ['#4266b2', '#102f73'],
				normalizeFunction: 'polynomial'
			}]
		},
	});
});