new Chartist.Pie('.donut-chart4', {
  series: [985, 476]
}, {
	donut: true,
	donutWidth: 9,
	donutSolid: true,
	startAngle: 270,
	showLabel: false,
	height: "180px",
	plugins: [
		Chartist.plugins.tooltip()
	],
	low: 0
});


new Chartist.Pie('.donut-chart5', {
  series: [189, 556]
}, {
	donut: true,
	donutWidth: 9,
	donutSolid: true,
	startAngle: 120,
	showLabel: false,
	height: "180px",
	plugins: [
		Chartist.plugins.tooltip()
	],
	low: 0
});