// Morris Donut
Morris.Donut({
	element: 'donutColors',
	data: [
		{value: 70, label: 'foo'},
		{value: 15, label: 'bar'},
		{value: 10, label: 'baz'},
		{value: 5, label: 'A really really long label'}
	],
	backgroundColor: '#ffffff',
	labelColor: '#666666',
	colors:['#4266b2', '#65ab53', '#ecb94a', '#ff9f41'],
	resize: true,
	hideHover: "auto",
	gridLineColor: "#e4e6f2",
	formatter: function (x) { return x + "%"}
});