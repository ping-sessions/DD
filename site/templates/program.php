<?php snippet('header') ?>

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