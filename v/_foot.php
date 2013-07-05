<? if(!$isAjax) : ?>
</div>
<div id="loader"></div>

<script>
	<? foreach(array("a/j/spin.min.js", "a/j/index.js", "a/j/jobs.js", "a/j/job.js", "a/j/page.js") as $s) : ?>
		<?= file_get_contents($s) . "\n"; ?>
	<? endforeach; ?>
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
  ga('create', 'UA-42261707-1', 'k94n.com');
  ga('send', 'pageview');
</script>
</body>
</html>
<? endif; ?>