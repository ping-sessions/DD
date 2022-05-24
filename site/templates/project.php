<?php snippet('header') ?>

<div class = 'project-overlay'>

<div class="project-title">
  <?= $page->title() ?>
</div>

<a href="<?= $site->url()?>" class="close-project">(Discontinue Project)</a>

<!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <?php foreach ($page->files() as $file) : ?>
      <?php if ($file->type() == 'image'):?>
      <div data-url='<?= $file->url() ?>' class='project-slider_slide swiper-slide'><img src = "<?= $file->url() ?>" /></div>
      <?php endif ?>
      <?php if ($file->type() == 'audio'):?>
      <div data-url='<?= $file->url() ?>' class='project-slider_slide swiper-slide'>
      <audio controls>
  <source src="<?= $file->url()?>" type="audio/mpeg">
</audio>
<?= $file->filename()?>
    </div>
      <?php endif ?>
    <?php endforeach ?>
  </div>
  <div class="swiper-pagination"></div>
      </div>
    
  <div class = 'project-info'>
    <div class="project-info__inner">
    <?= $page->text() ?>
      </div>
  </div>
</div>

<?php snippet('footer') ?>