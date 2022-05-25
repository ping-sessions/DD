<?php snippet('header') ?>
<?php 

  // require_once('./../helpers/rtf-html-php.php');
  require_once $kirby->root('site') . '/helpers/parse-rtf.php';
?>


<div class = 'project-overlay'>

<div class="project-title">
  <?= $page->title() ?>
</div>

<!-- if text page -->
<?php if ($page->text_toggle()->toBool() == true) : ?>
  <?php 
    $pdf_file = '';
    $text_files = [];
    foreach ($page->files() as $file) {
      if ($file->extension() == 'pdf') {
        $pdf_file = $file->url();
      }
      else {
        if ($file->type() == 'document') {
          $text_files[] = $file; 
        }
      }
    }
  ?>

  <?php foreach($text_files as $text_file) : ?>
    <div style = 'display: block; margin-bottom: 2rem;'><?= parse_rtf($text_file) ?></div>
  <?php endforeach ?>

  <!-- $page->files() ?> -->
  <a href = '<?= $pdf_file ?>' target='_blank'>View PDF</a>
<?php else : ?>
  <div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <?php foreach ($page->files() as $file) : ?>
      <!-- todo: ensure pdf does not show here -->
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
<?php endif ?>
<a href="<?= $site->url()?>" class="close-project">(Discontinue Project)</a>

<!-- Slider main container -->
    
  <div class = 'project-info'>
    <div class="project-info__inner">
    <?= $page->text() ?>
      </div>
  </div>
</div>

<?php snippet('footer') ?>