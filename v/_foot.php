<? if(!$isAjax) : ?>
</div>
<div id="loader"></div>

<script>
	<? foreach(array("a/j/spin.min.js", "a/j/index.js", "a/j/jobs.js", "a/j/job.js", "a/j/page.js") as $s) : ?>
		<?= file_get_contents($s) . "\n"; ?>
	<? endforeach; ?>
</script>

</body>
</html>
<? endif; ?>