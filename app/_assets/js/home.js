$(function () {	
	window.churchMap = createMap({
		el: $('.js-churchMap')[0],
		center: [40.527476, -3.919085]
	});
	
	window.banquetMap = createMap({
		el: $('.js-banquetMap')[0],
		center: [40.6257519, -4.1069981],
		zoom: 15
	});

	$(window).bind('scroll', onScroll);
});

function onScroll () {
	var isAtTheBottom = $(window).scrollTop() + $(window).height() == $(document).height();
	$('.js-goNext').toggle(!isAtTheBottom);
}

function createMap (opts) {
	var map = L.map(opts.el, {
		scrollWheelZoom: false,
		center: opts.center,
		zoom: opts.zoom || 16
	});

	var routeLayer = L.geoJSON(null, {
    color: "#436971",
    weight: 5,
    opacity: 0.65
	}).addTo(map);
	routeLayer.addData(window.route);
	
	addBasemapToMap(map);

	createIcon({
		center: [40.6257519, -4.1069981],
		map: map,
		iconUrl: '../img/losarcos.png',
    iconSize: [100, 50],
    iconAnchor: [50, 25]
	});

	createIcon({
		center: [40.527476, -3.919085],
		map: map,
		iconUrl: '../img/church.png',
    iconSize: [50, 57],
    iconAnchor: [25, 28]
	});

	return map;
}

function addBasemapToMap (map) {
	var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' });
	var labelsLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' });
	map.addLayer(baseLayer);
	map.addLayer(labelsLayer);
}

function createIcon (opts) {
	var icon = L.icon({
    iconUrl: opts.iconUrl,
    iconSize: opts.iconSize,
    iconAnchor: opts.iconAnchor
	});

	L.marker(opts.center, { icon: icon }).addTo(opts.map);
}



