<?php snippet('header') ?>

<div class = 'project-overlay'>

<div class="project-title">
  <?= $page->title() ?>
</div>

<a href="<?= $site->url()?>" class="close-project">Discontinue</a>

  <div class = 'project-slider'>
    <?php foreach ($page->files() as $file) : ?>
      <?php if ($file->type() == 'image'):?>
      <div data-url='<?= $file->url() ?>' class='project-slider_slide'><img src = "<?= $file->url() ?>" /></div>
      <?php endif ?>
      <?php if ($file->type() == 'audio'):?>
      <div data-url='<?= $file->url() ?>' class='project-slider_slide'>
      <audio controls>
  <source src="<?= $file->url()?>" type="audio/mpeg">
</audio>
<?= $file->filename()?>
    </div>
      <?php endif ?>
    <?php endforeach ?>
  </div>
    
  <div class = 'project-info'>
    <?= $page->text() ?>
  </div>
</div>

<?php snippet('footer') ?>