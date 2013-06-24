var jobModule = function() {
	this.$job = document.querySelector('#job');
	this.$jobsPage = document.querySelector('#jobs')
}

jobModule.prototype.init = function() {
	this.eventBindings();
};

jobModule.prototype.eventBindings = function() {
	console.log('eventbindings job');
	var instance = this,
		handler = function(e) {
			instance.keyHandler(e);
			document.removeEventListener('keyup', handler, false);
		}
	document.addEventListener('keyup', handler, false);
};

jobModule.prototype.keyHandler = function(e) {
	if(e.keyCode == 27) {
		this.unloadJob();
	}
};

jobModule.prototype.unloadJob = function() {
	var instance = this;

	instance.$jobsPage.classList.remove('bg');
	instance.$jobsPage.classList.add('fromBg');
	var removeFromBg = function() {
		instance.$jobsPage.classList.remove('fromBg');
		instance.$job.removeEventListener("webkitAnimationEnd", removeFromBg);
	}
	instance.$job.addEventListener("webkitAnimationEnd", removeFromBg, false);

	instance.$job.classList.remove('shown');
	instance.$job.classList.add('slideOut');
	var removeSlideOut = function() {
		instance.$jobsPage.classList.remove('slideOut');
		instance.$job.parentNode.removeChild(instance.$job);
		instance.$job.removeEventListener("webkitAnimationEnd", removeSlideOut);
		instance.$job = null;
	}
	instance.$job.addEventListener("webkitAnimationEnd", removeSlideOut, false);
};