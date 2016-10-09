$(function () {	
	createMap({
		el: $('.js-churchMap')[0],
		center: [40.527476, -3.919085],
		iconUrl: '../img/church.png',
    iconSize: [50, 57],
    iconAnchor: [25, 28]
	});
	
	createMap({
		el: $('.js-banquetMap')[0],
		center: [40.6257519, -4.1069981],
		iconUrl: '../img/losarcos.png',
    iconSize: [70, 50],
    iconAnchor: [35, 25]
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
	
	addBasemapToMap(map);
	createIcon({
		center: opts.center,
		map: map,
		iconUrl: opts.iconUrl,
    iconSize: opts.iconSize,
    iconAnchor: opts.iconAnchor
	});
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