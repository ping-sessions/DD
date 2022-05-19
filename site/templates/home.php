<?php snippet('header') ?>

<?php snippet('intro') ?>

<?php snippet('shapes') ?>

<h1 class = 'title'>
  <!-- $current_words variable is set in controller -->
  <?php foreach($current_words as $word) : ?>
    <?= $word ?>
  <?php endforeach ?>
</h1>

<!-- <h2 class = 'count'><= $count ?></h2> -->

<!-- get random content -->
<div class = 'content'>
  <!-- $files variable is set in controller -->
  <?php foreach ($files as $fileObj) : ?>
    <?php snippet('file', ['fileObj' => $fileObj]) ?>
  <?php endforeach ?>
</div>

<button class="load-more" accesskey="m">Load new result</button>

<style>
* > img {
  width: 100px;
}
</style>

<?php snippet('footer') ?>