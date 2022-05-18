<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <meta name="viewport" content="width=device-width" />

  <!-- would be nice to update this on every DD generate -->
  <title><?= $page->title() ?></title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" integrity="sha512-yHknP1/AwR+yx26cB1y0cjvQUMvEa2PFzt1c9LlS4pRQ5NOTZFWbhBig+X9G9eYW/8m0/4OXNx8pxJ6z57x0dw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <?= css(['assets/css/main.css']) ?>
</head>


<body data-barba="wrapper">

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
  
  </div>

  <!-- <button class="load-more" accesskey="m">Load new result</button> -->
  <main data-barba="container" data-barba-namespace="<?= $page->template() ?>">
