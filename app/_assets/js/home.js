var sendingForm = false;

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

	// Form
	$('.js-contactForm').submit(bindFormBehaviour);

  // Transport map
  $('.js-busRouteMap').subwayMap({ debug: false });
  $('.js-returnButton').click(function (e) {
    $('.js-returnMap').removeClass('u-hidden');
    $('.js-departureMap').addClass('u-hidden');
  });
  $('.js-departureButton').click(function (e) {
    $('.js-returnMap').addClass('u-hidden');
    $('.js-departureMap').removeClass('u-hidden');
  });
});

function bindFormBehaviour(e) {
	e.stopPropagation();
	e.preventDefault();
	var $form = $(e.target);

	if (sendingForm) {
		return;
	}

	var formData = $(e.target).serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
	}, {});

	var inputWithErrors = [];

	for (var key in formData) {
	  if (!formData[key]) {
	    inputWithErrors.push(key);
	  }
	}

	if (inputWithErrors.length) {
		setFormErrors(inputWithErrors, $form);
		return;
	}

	disableForm($form);

	$.ajax({
    url: "https://formspree.io/javiylausep2017@gmail.com", 
    method: "POST",
    data: formData,
    dataType: "json",
    success: function () {
    	enableForm($form);
    	showSuccessMessage($form);
    	clearForm($form);
    },
    error: function () {
    	enableForm($form);
    	showErrorMessage($form);
    }
	});
}

function disableForm ($form) {
	sendingForm = true;
	hideMessages($form);
	$form.find('textarea,input').each(function (i, el) {
		$(el)
			.addClass('is-disabled')
			.prop('disabled', true);
	});
	$form.find('.js-submit').addClass('u-hidden');
	$form.find('.js-loading').removeClass('u-hidden');
}

function enableForm ($form) {
	sendingForm = false;
	$form.find('textarea,input').each(function (i, el) {
		$(el)
			.removeClass('is-disabled')
			.prop('disabled', false);
	});

	$form.find('.js-loading').addClass('u-hidden');
	$form.find('.js-submit').removeClass('u-hidden');
}

function hideMessages($form) {
	$form.find('.js-successMessage').addClass('u-hidden');
	$form.find('.js-errorMessage').addClass('u-hidden');
}

function showSuccessMessage ($form) {
	$form.find('.js-successMessage').removeClass('u-hidden');
}

function showErrorMessage ($form) {
	$form.find('.js-errorMessage').removeClass('u-hidden');
}

function setFormErrors (inputs, $form) {
	for (var i = 0, l = inputs.length; i < l; i++) {
		$form.find('[name="' + inputs[i]  + '"]').addClass('has-errors');
	}
}

function clearForm ($form) {
	$form.find('textarea,input').each(function (i, el) {
		$(el)
			.val('')
			.text('');
	});
}

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

	createMapIcon({
		center: [40.6257519, -4.1069981],
		map: map,
		iconUrl: '../img/losarcos.png',
    iconSize: [100, 50],
    iconAnchor: [50, 25]
	});

	createMapIcon({
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

function createMapIcon (opts) {
	var icon = L.icon({
    iconUrl: opts.iconUrl,
    iconSize: opts.iconSize,
    iconAnchor: opts.iconAnchor
	});

	L.marker(opts.center, { icon: icon }).addTo(opts.map);
}