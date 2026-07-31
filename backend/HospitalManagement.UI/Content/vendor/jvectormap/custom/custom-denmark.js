// Denmark
$(function(){
	$('#mapDenmark').vectorMap({
		map: 'dk_mill',
		zoomOnScroll: false,
		regionStyle:{
			initial: {
				fill: '#4266b2',
			},
			hover: {
				"fill-opacity": 0.8
			},
			selected: {
				fill: '#65ab53'
			},
		},
		backgroundColor: '#ffffff',
	});
});