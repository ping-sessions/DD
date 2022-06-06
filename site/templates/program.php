<?php snippet('header') ?>

  <div class = 'program-page'>
    <div class = 'project-overlay'>
    <a href="<?= $site->url()?>" class="close-project">X</a>
      <div class = 'program__outer'>
        <div class = 'program'>
          <?= $page->program()->kirbytext() ?>
        </div>
      </div>
    </div>
  </div>

<?php snippet('footer') ?>