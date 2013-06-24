var indexModule = function() {
	this.$indexPage = document.querySelector('#index');
	this.$jobsPage = document.querySelector('#jobs');
	this.$form = document.querySelector('#indexForm');
	this.$tagInput = document.querySelector('input[name=tag]');
	this.$tags = document.querySelectorAll('#index .tagList > li');
	this.$location = document.querySelector('input[name=location]');
	this.jobsXhr = new XMLHttpRequest();
	this.geoXhr = new XMLHttpRequest();
	this.geoSpinner;
	this.locationXhr = new XMLHttpRequest();
};

indexModule.prototype.init = function() {
	console.log('init index');
	this.eventBindings();
};

indexModule.prototype.eventBindings = function() {
	var instance = this;

	for(var i = this.$tags.length - 1; i >= 0; i--) {
		this.$tags[i].addEventListener('click', function(e) {
			instance.loadTag(e.srcElement.dataset.tag);
		});
	};

	this.$form.addEventListener('submit', function(e) {
		instance.loadTag(instance.$tagInput.value);
		e.preventDefault();
	});

	this.$location.addEventListener('keyup', function() {
		instance.storeLocation(this.value);
	}, false);

	if(navigator.geolocation && this.$location.dataset.autolocate) {
		navigator.geolocation.getCurrentPosition(function(p) {
        	instance.onPositionReady(p, instance);
        });
        this.$location.parentNode.classList.add('loading');
        this.geoSpinner = new Spinner(
        	{ lines: 15, length: 3, width: 2, radius: 5, corners: 1, rotate: 0, direction: 1, color: '#000', speed: 1, trail: 46, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9, top: 'auto', right: 'auto'}
    	).spin(document.querySelector('.loactionWrap .spinner'));
    }
};

indexModule.prototype.loadTag = function(tag) {
	var instance = this,
		locationString = instance.$location.value;

	if(!tag) {
		alert('Invalid Tag');
		return;
	}

	document.body.classList.add('loading');
	
	instance.$indexPage.classList.add('toBg');
	var remove = function() {
		instance.$indexPage.classList.remove('toBg');
		instance.$indexPage.classList.add('bg');
		instance.$indexPage.removeEventListener("webkitAnimationEnd", remove, false);
	}
	instance.$indexPage.addEventListener("webkitAnimationEnd", remove, false);

	this.jobsXhr.onreadystatechange = function() {
		console.log([instance.jobsXhr]);
		if (instance.jobsXhr.readyState==4 && instance.jobsXhr.status==200) {
			instance.showJobs(instance.jobsXhr.responseText);
		}
	}
	this.jobsXhr.open('GET', 'jobs?ajax&tag=' + tag + '&location=' + locationString, true);
	this.jobsXhr.send();
}

indexModule.prototype.showJobs = function(markup) {
	var instance = this;

	if(instance.$jobsPage == null) {
	 	instance.$jobsPage = document.createElement('div');
		instance.$jobsPage.className = 'page cf hidden';
		instance.$jobsPage.id = 'jobs';
		document.body.appendChild(this.$jobsPage);
	}

	instance.$jobsPage.innerHTML = markup;

	document.body.classList.remove('loading');

	setTimeout(function() {
		instance.$indexPage.classList.add('slideOut');
		instance.$indexPage.classList.remove('bg');
		var removeSlide = function() {
			instance.$indexPage.classList.add('hidden');
			instance.$indexPage.classList.remove('slideOut');
			instance.$indexPage.removeEventListener("webkitAnimationEnd", removeSlide);
		}
		instance.$indexPage.addEventListener("webkitAnimationEnd", removeSlide, false);

		instance.$jobsPage.classList.add('slideIn');
		instance.$jobsPage.classList.remove('hidden');
		var removeSlideIn = function() {
			instance.$jobsPage.classList.remove('slideIn');
			instance.$jobsPage.removeEventListener("webkitAnimationEnd", removeSlideIn);
		}
		instance.$jobsPage.addEventListener("webkitAnimationEnd", removeSlideIn, false);
	}, 1);

	var j = new jobsModule(); 
	j.init();
}

indexModule.prototype.onPositionReady = function(position, instance) {
	instance.geoXhr.onreadystatechange = function() {
		if (instance.geoXhr.readyState==4 && instance.geoXhr.status==200) {
			instance.onReversegeoReady(instance.geoXhr.responseText);
		}
	}

	this.geoXhr.open('GET', 'location/reverse?ajax&lat=' + position.coords.latitude + '&lng=' + position.coords.longitude, true);
	this.geoXhr.send();
}

indexModule.prototype.onReversegeoReady = function(locationString) {
	this.geoSpinner.stop();
	this.$location.parentNode.classList.remove('loading');

	this.$location.value = locationString;
}

indexModule.prototype.storeLocation = function(locationString) {
	this.locationXhr.open('GET', 'location/store?s=' + locationString, true);
	this.locationXhr.send();
}