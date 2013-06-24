<? include "_head.php" ?>

<div class="col4">
	<div class="logoWrap">
		<a href="<?=$config['base']?>">
			<span class="icon-bug"></span>
			<span>hacker</span><span>jobs.at</span>
			<b>2</b>
		</a>
		<p class="logosub">powerd by karriere.at</p>
	</div>


	<div class="loactionWrap">
		<span class="icon-location"></span>
		<input name="location" value="<?=$c->v['location']?>" data-autolocate="<?=!array_key_exists('location', $_SESSION) ? true : false?>">
		<span class="spinner"></span>
		<span class="spinnerText">Loading Location ...</span>
	</div>
</div>

<div class="col8">

	<div class="tagselectWrap cf">
		<p>I want to hack on </p>
		<ul class="tagList">
			<? $rtags = $tags; shuffle($rtags); foreach($rtags as $tag) : ?>
			<li data-tag="<?=$tag?>">
				<span>/<?=$tag?></span>
			</li>
		<? endforeach; ?>
		</ul>
		<form id="indexForm" action="<?=$config['base'];?>/jobs">
			/<input name="tag" value="" placeholder="..." autocomplete='off'>
			<button type="submit">YOLO</button>
		</form>

	</div>

</div>

<? include "_foot.php" ?>