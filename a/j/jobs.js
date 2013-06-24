var jobsModule = function() {
	this.$jobsPage = document.querySelector('#jobs');
	this.currentTag = document.querySelector('.tagWrap b').innerText;
	this.$job = null;
	this.$jobs = document.querySelectorAll('#jobs .jobsList > li');
	this.$tags = document.querySelectorAll('#jobs .tagList > li');
	this.jobsXhr = new XMLHttpRequest();
	this.$location = document.querySelector('#jobs input[name=location]');
	this.locationXhr = new XMLHttpRequest();
};

jobsModule.prototype.init = function() {
	console.log('init jobs', this.$jobs);
	this.eventBindings();
};

jobsModule.prototype.eventBindings = function() {
	var instance = this;

	for(var i = this.$tags.length - 1; i >= 0; i--) {
		this.$tags[i].addEventListener('click', function(e) {
			instance.currentTag = e.srcElement.dataset.tag;
			instance.openTag(instance.currentTag);
		});
	};

	for(var i = this.$jobs.length - 1; i >= 0; i--) {
		this.$jobs[i].addEventListener('click', function(e) {
			instance.openJob(e.srcElement.dataset.id);
		});
	};

	console.log(['jobs location', this.$location]);

	this.$location.addEventListener('keyup', function(e) {
		console.log(['keyup', e.keyCode]);
		if(e.keyCode == 13) {
			instance.openTag(instance.currentTag);
		} else {
			instance.storeLocation(this.value);
		}
	}, false);
};

jobsModule.prototype.openJob = function(jobId) {
	var instance = this;

	document.body.classList.add('loading');

	instance.$jobsPage.classList.add('toBg');
	var remove = function() {
		instance.$jobsPage.classList.remove('toBg');
		instance.$jobsPage.classList.add('bg');
		instance.$jobsPage.removeEventListener("webkitAnimationEnd", remove, false);
	}
	instance.$jobsPage.addEventListener("webkitAnimationEnd", remove, false);

	this.jobsXhr.onreadystatechange = function() {
		console.log([instance.jobsXhr.readyState, instance.jobsXhr.status]);

		if (instance.jobsXhr.readyState==4 && instance.jobsXhr.status==200) {
			instance.showJob(instance.jobsXhr.responseText);
		}
	}
	this.jobsXhr.open('POST', 'job?ajax&id=' + jobId, true);
	this.jobsXhr.send();
};

jobsModule.prototype.openTag = function(tag) {
	var instance = this,
		locationString = instance.$location.value;

	document.body.classList.add('loading');

	instance.$jobsPage = document.querySelector('#jobs'); // @todo missing link
	instance.$jobsPage.classList.add('toBg');
	var remove = function() {
		instance.$jobsPage.classList.remove('toBg');
		instance.$jobsPage.classList.add('bg');
		instance.$jobsPage.removeEventListener("webkitAnimationEnd", remove, false);
	}
	instance.$jobsPage.addEventListener("webkitAnimationEnd", remove, false);

	this.jobsXhr.onreadystatechange = function() {
		console.log([instance.jobsXhr.readyState, instance.jobsXhr.status]);
		if (instance.jobsXhr.readyState==4 && instance.jobsXhr.status==200) {
			instance.onTagReady(instance.jobsXhr.responseText);
		}
	}
	this.jobsXhr.open('POST', 'jobs?ajax&tag=' + tag + '&location=' + locationString, true);
	this.jobsXhr.send();

	e.preventDefault();
};

jobsModule.prototype.onTagReady = function(markup) {
	var instance = this;

	console.log(instance.$jobsPage);

	document.body.classList.remove('loading');

 	instance.$newJobsPage = document.createElement('div');
	instance.$newJobsPage.className = 'page cf hidden bg';
	instance.$newJobsPage.id = 'jobs';
	document.body.appendChild(this.$newJobsPage);

	instance.$newJobsPage.innerHTML = markup;

	setTimeout(function() {
		instance.$jobsPage = document.querySelector('#jobs');
		/*
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
		*/
		document.body.removeChild(instance.$jobsPage);

		instance.$newJobsPage.classList.remove('bg');
		instance.$newJobsPage.classList.add('fromBg');
		var removeFromBg = function() {
			instance.$newJobsPage.classList.remove('fromBg');
			instance.$newJobsPage.removeEventListener("webkitAnimationEnd", removeFromBg);
		}
		instance.$newJobsPage.addEventListener("webkitAnimationEnd", removeFromBg, false);

		instance.$newJobsPage.classList.remove('hidden');

		instance.$jobsPage = document.querySelector('#jobs'); // @todo missing link should be = $newJobsPage
	}, 1);

	var j = new jobsModule(); 
	j.init();
}

jobsModule.prototype.showJob = function(markup) {
	var instance = this;

	instance.$jobsPage = document.querySelector('#jobs'); // @todo missing link
	this.$job = document.querySelector('#job');

	if(this.$job == null) {
	 	this.$job = document.createElement('div');
		this.$job.className = 'cf';
		this.$job.id = 'job';
		document.body.appendChild(this.$job);
	}

	this.$job.innerHTML = markup;

	document.body.classList.remove('loading');

	setTimeout(function() {
		var removeToBg = function(){
			instance.$jobsPage.classList.remove('toBg');
			instance.$jobsPage.removeEventListener("webkitAnimationEnd", removeToBg);
		}
		instance.$jobsPage.addEventListener("webkitAnimationEnd", removeToBg, false);

		instance.$job.classList.add('slideIn');
		var removeSlideIn = function() {
			instance.$jobsPage.classList.remove('slideIn');
			instance.$job.classList.add('shown');	
			instance.$job.removeEventListener("webkitAnimationEnd", removeSlideIn);
		}
		instance.$job.addEventListener("webkitAnimationEnd", removeSlideIn, false);
	}, 1);

	j = new jobModule;
	j.init();
}

jobsModule.prototype.storeLocation = function(locationString) {
	this.locationXhr.open('GET', 'location/store?s=' + locationString, true);
	this.locationXhr.send();
}