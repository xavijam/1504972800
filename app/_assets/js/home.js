$(function(){ 

	var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' });
	var labelsLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' });

	$('.js-map').each(function (i, $map) {
		var map = L.map($map, {
			attribution: '',
			scrollWheelZoom: false,
			center: [40.527476, -3.919085],
			zoom: 16
		});
		
		map.addLayer(baseLayer);
		map.addLayer(labelsLayer);

		var churchIcon = L.icon({
	    iconUrl: '../img/church.png',
	    iconSize: [50, 57],
	    iconAnchor: [25, 28]
		});

		L.marker([40.527476, -3.919085], { icon: churchIcon }).addTo(map);
	});
});