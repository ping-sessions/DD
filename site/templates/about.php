<?php snippet('header') ?>

<div class = 'about-page'>
  <div class = 'project-overlay'>

  <a href="<?= $site->url()?>" class="close-project">Disclose Decision</a>
  <div class="about-page__inner">
    <?= $page->about_text()->kirbytext() ?>
</div>
  </div>
</div>

<?php snippet('footer') ?>