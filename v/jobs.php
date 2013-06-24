<? include "_head.php" ?>

<div class="col4">
	<div class="logoWrap">
		<a href="<?=$config['base']?>">
			<span class="icon-bug"></span>
			<span>hacker</span><span>jobs.at</span>
		</a>
	</div>

	<div class="tagWrap">
		/<b><?=$c->v['tag']?></b>
	</div>

	<div class="loactionWrap">
		<span class="icon-location"></span><input name="location" value="<?=$c->v['location']?>">
	</div>

	<ul class="tagList">
		<? $rtags = $tags; shuffle($rtags); foreach($rtags as $tag) : ?>
			<li data-tag="<?=$tag?>">
				<span>/<?=$tag?></span>
			</li>
		<? endforeach; ?>
	</ul>
</div>

<div class="col8">

	<ul class="jobsList">
		<? foreach($c->v['jobs'] as $job) : ?>
			<li data-id="<?=$job['id']?>">
				<h3><?=trim($job['title'])?></h3>
				<p><b><?=trim($job['location'])?></b> <?=trim($job['company']['name'])?></p> 

				<!--<pre><?var_dump($job)?></pre>-->
			</li>
		<? endforeach; ?>
	</ul>

	<? if($c->v['jobsCount'] > 15) : ?>
		<button class="loadMore">Load More</button>
	<? endif; ?>

</div>

<? include "_foot.php" ?>