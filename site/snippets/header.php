<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <meta name="viewport" content="width=device-width" />

  <!-- would be nice to update this on every DD generate -->
  <title><?= $page->title() ?></title>

  <?= css(['assets/css/main.css']) ?>
</head>


<body data-barba="wrapper">

  <!-- content that is always visible: tidy this up -->

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
      <button class = 'dd-select' accesskey="o">
        Decide DD
      </button>
      <button class = 'dd-random' accesskey="m">
        Random DD
      </button>
    </div>
  </header>

  <!-- get random content -->
  <div class = 'content'>
    <!-- $files variable is set in controller -->
    <?php foreach ($files as $fileObj) : ?>
      <?php snippet('file', ['fileObj' => $fileObj]) ?>
    <?php endforeach ?>
  </div>

  <!-- <button class="load-more" accesskey="m">Load new result</button> -->
  <main data-barba="container" data-barba-namespace="<?= $page->template() ?>">
