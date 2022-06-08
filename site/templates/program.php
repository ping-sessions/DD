<?php snippet('header') ?>
<a href="<?= $site->url()?>" class="close-project">X</a>
<div class="project-title"><?= $page->title()?></div>
  <div class = 'program-page'>
    <div class = 'project-overlay'>
      <div class = 'program__outer'>
        <div class = 'program'>
          <?= $page->program()->kirbytext() ?>
        </div>
      </div>
    </div>
  </div>

<?php snippet('footer') ?>