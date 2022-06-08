<?php snippet('header') ?>
<?php require_once $kirby->root('site') . '/helpers/parse-rtf.php'; ?>

<a href="<?= $site->url()?>" class="close-project"><span class="hide-mobile">X</span><span class="hide-desktop">X</span></a>
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

  

<div class="text__snippets">
  <?php foreach($text_files as $text_file) : ?>
    <div class="text__snippet"><span class="text__snippet__number">(<?= $text_file->indexOf() + 1?></span><?= parse_rtf($text_file) ?>)</div>
  <?php endforeach ?>
  <a class="text__snippets__pdf-button" href = '<?= $pdf_file ?>' target='_blank'>Display PDF</a>
  </div>

  <!-- $page->files() ?> -->

<?php else : ?>
  <div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <?php foreach ($page->files() as $file) : ?>
      <!-- todo: ensure pdf does not show here -->
      <?php if ($file->type() == 'image') : ?>
      <?php 
        $resize_url = '';
        if ($file->size() > 300000) {
          if ($file->width() < 1200) {
             $resize_url = $file->resize($file->width())->url();
          }
          else {
             $resize_url = $file->resize(1200)->url();
          }
        }
        else {
          $resize_url = $file->url();
        }
      ?>
      <div data-url='<?= $resize_url ?>' class='project-slider_slide swiper-slide'><div class="swiper-slide-inner"><img loading="lazy" src="<?= $resize_url ?>" /></div></div>
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


<!-- Slider main container -->
    
  <div class = 'project-info'>
  <div class="project__meta">
<div class="project__meta__year"><span>Date<br></span><?= $page->year() ?></div>
<div class="project__meta__participants"><span>Participants<br></span><?= $page->participants() ?></div>
</div>
  <div class="project-info__inner">
    <?= kirbytext($page->text()) ?>
  </div>
  </div>
</div>

<?php snippet('footer') ?>