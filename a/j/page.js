var i, js, j = $currentPage = document.querySelector('.page.active');

if($currentPage.id == 'index') {
	i = new indexModule(); 
	i.init();
} else if($currentPage.id == 'jobs') {
	i = new jobsModule(); 
	i.init();
}

new Spinner(
	//{ lines: 15, length: 3, width: 2, radius: 5, corners: 1, rotate: 0, direction: 1, color: '#fff', speed: 1, trail: 46, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9, top: 'auto', right: 'auto'}
	{
	  lines: 17, // The number of lines to draw
	  length: 18, // The length of each line
	  width: 5, // The line thickness
	  radius: 23, // The radius of the inner circle
	  corners: 1, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#fff', // #rgb or #rrggbb
	  speed: 1, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: true, // Whether to render a shadow
	  hwaccel: true, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	}
).spin(document.querySelector('#loader'));