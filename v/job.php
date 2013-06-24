<? include "_head.php" ?>
<? $job = $c->v['job']; ?>

<div class="col6">

	<h1><?=$job['title']?></h1>
	<h2><b><?=$job['location']?></b> <?=$job['company']['name']?></h2>

	<p class="jobtext">
		<?=nl2br($job['contentText'])?>
	</p>

<? /*

	<pre>
		<? var_dump($job);?>
	</pre>

	<ul class="tagList">
		<? foreach($job['keywords'] as $k) : ?>
			<li><?=$k?></li>
		<? endforeach; ?>
	</ul>
*/ ?>

</div>

<div class="col6">
	<iframe src="http://www.karriere.at/html/<?=$job['id']?>"></iframe>
	<p>
		Inserat vom <?=date('d.m.Y', $job['showDate'])?>
	</p>
</div>

<? include "_foot.php" ?>