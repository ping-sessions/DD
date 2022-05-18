<?php snippet('header') ?>

<div class = 'page-overlay'>
  <?php foreach ($page->files() as $file) : ?>
    <img src = "<?= $file->url() ?>" />
  <?php endforeach ?>
</div>

<?php snippet('footer') ?>