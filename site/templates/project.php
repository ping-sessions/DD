<?php snippet('header') ?>

<div class = 'project-overlay'>

  <div class = 'project-slider'>
    <?php foreach ($page->files() as $file) : ?>
      <div data-url='<?= $file->url() ?>' class='project-slider_slide'><img src = "<?= $file->url() ?>" /></div>
    <?php endforeach ?>
  </div>
    
  <div class = 'project-info'>
    <?= $page->text() ?>
  </div>
</div>

<?php snippet('footer') ?>