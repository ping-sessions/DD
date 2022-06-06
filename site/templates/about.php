<?php snippet('header') ?>

<div class = 'about-page'>
  <div class = 'project-overlay'>

  <a href="<?= $site->url()?>" class="close-project">X</a>
  <div class="about-page__inner">
    <?= $page->about_text()->kirbytext() ?>
</div>
  </div>
</div>

<?php snippet('footer') ?>