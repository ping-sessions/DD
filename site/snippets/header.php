<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <meta name="viewport" content="width=device-width" />
  <title>Daily Decisions – <?= $page->title() ?></title>
  <link rel="apple-touch-icon" sizes="180x180" href="<?= $kirby->url('assets') ?>/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="<?= $kirby->url('assets') ?>/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="<?= $kirby->url('assets') ?>/favicon-16x16.png">
<link rel="manifest" href="<?= $kirby->url('assets') ?>/site.webmanifest">
<link rel="mask-icon" href="<?= $kirby->url('assets') ?>/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <!-- <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&display=swap" rel="stylesheet">-->
  <?= css(['assets/css/slick.css']) ?>
  <?= css(['assets/css/main.css']) ?>
</head>


<body class=" <?php if ($page->template() == 'project'):?> project-page <?php endif?> <?= $page->slug() ?>-page" data-barba="wrapper">

  <?php snippet('intro') ?>

  <div class="fix"></div>

  <div class="loader"></div>

  <div class="screensaver"></div>


  <?php if ($site->page('home')->show_radio()->toBool() == true) : ?>
    <?php snippet('radio') ?>
  <?php endif ?>


  <?php if ($site->page('home')->show_program()->toBool() == true) : ?>
    <?php snippet('program-button') ?>
  <?php endif ?>



  <!-- content that is always visible: tidy this up -->

  <div class = 'index'>
  
    <header class = 'header'>
      <h1 class = 'title'>
        <span class="dday">Decision of the Day</span>
        <span id='decision'>
          <!-- $current_words variable is set in controller -->
          <?php foreach($current_words as $word) : ?>
            <?= $word ?>
          <?php endforeach ?>
        </span>
      </h1>
      
    </header>

    <div class = 'buttons'>
        <!-- accesskey is temp/need to figure out -->
        <button class = 'dd-select hide-mobile' accesskey="o">
          Decide DD
        </button>
        <button class = 'dd-random hide-desktop' accesskey="m">
          Do DD
        </button>
      </div>

    <!-- DD selector overlay -->
    <?php snippet('selector') ?>

    <!-- get random content -->
    <div class="projects__outer">
    <div class = 'content projects'>
      <!-- $tagged_files variable is set in controller -->
      <?php foreach ($tagged_files as $fileObj) : ?>
        <?php snippet('file', ['fileObj' => $fileObj]) ?>
      <?php endforeach ?>
    </div>
      </div>
  
  </div>

  <a href="" class="fixed__title"><span class="fixed__title__inner__number"></span><span class="fixed__title__inner"></span></a>
  <div class="fixed__meta hide-mobile">
    <?php 
      $imageCount = 0;
      $documentCount = 0;
      $audioCount = 0;
      $videoCount = 0;
      foreach ($tagged_files as $tagged_file) {
        if ($tagged_file->type == 'image') {
          $imageCount++;
        }
        else if ($tagged_file->type == 'audio') {
          $audioCount++;
        }
        // would have to check for screenshot/if using video at all
        else if ($tagged_file->type == 'video') {
          $videoCount++;
        }
        // filter out pdfs
        else if ($tagged_file->type == 'document' && $tagged_file->extension == 'rtf') {
          $documentCount++;
        }
      }
    ?>
    <?php if ($imageCount > 0) : ?>
      <div><?= $imageCount ?> Images</div>
    <?php endif ?>
    <?php if ($audioCount > 0) : ?>
      <!-- need to rename this -->
      <div><?= $audioCount ?> Audios</div>
    <?php endif ?>
    <?php if ($documentCount > 0) : ?>
      <div><?= $documentCount ?> Texts</div>
    <?php endif ?>
    <?php if ($videoCount > 0) : ?>
      <div><?= $documentCount ?> Videos</div>
    <?php endif ?>
  </div>


<a href="<?= $site->url()?>/home/about" class="about__link">About & Contact</a>

  <?php snippet('shapes') ?>
  
  <main data-barba="container" data-barba-namespace="<?= $page->template() ?>">


