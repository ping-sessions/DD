<?php snippet('header') ?>

<div class = 'about-page'>
<a href="<?= $site->url()?>" class="close-project">X</a>
<div class="project-title"><?= $page->title()?></div>
  <div class = 'project-overlay'>
  <div class="about-page__inner">
    <?= $page->about_text()->kirbytext() ?>
</div>
  </div>
</div>

<?php snippet('footer') ?>