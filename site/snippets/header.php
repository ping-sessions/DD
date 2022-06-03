<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <meta name="viewport" content="width=device-width" />

  <!-- would be nice to update this on every DD generate -->
  <title><?= $page->title() ?></title>

  <?= css(['assets/css/slick.css']) ?>
  <?= css(['assets/css/main.css']) ?>
</head>





<body class=" <?php if ($page->template() == 'project'):?> project-page <?php endif?> <?= $page->slug() ?>-page" data-barba="wrapper">

  <div class="fix"></div>


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
        <span>Decision of the Day</span>
        <span id='decision'>
          <!-- $current_words variable is set in controller -->
          <?php foreach($current_words as $word) : ?>
            <?= $word ?>
          <?php endforeach ?>
        </span>
      </h1>
      
      <div class = 'buttons'>
        <!-- accesskey is temp/need to figure out -->
        <button class = 'dd-select hide-mobile' accesskey="o">
          Decide DD
        </button>
        <button class = 'dd-random hide-desktop' accesskey="m">
          Do DD
        </button>
      </div>
    </header>

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

  <div class="fixed__title"><span class="fixed__title__inner__number"></span><span class="fixed__title__inner"></span></div>
  <div class="fixed__meta">
    Displays in 48 DDs
    <br>
    Digests 26 Dispositions
  </div>


<a href="<?= $site->url()?>/home/about" class="about__link">(About & Contact)</a>

  <?php snippet('shapes') ?>
  
  <main data-barba="container" data-barba-namespace="<?= $page->template() ?>">
