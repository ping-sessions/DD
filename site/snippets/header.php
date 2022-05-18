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
  <h1 class = 'title'>
    <!-- $current_words variable is set in controller -->
    <?php foreach($current_words as $word) : ?>
      <?= $word ?>
    <?php endforeach ?>
  </h1>

  <!-- <h2 class = 'count'><= $count ?></h2> -->

  <!-- get random content -->
  <div class = 'content'>
    <!-- $files variable is set in controller -->
    <?php foreach ($files as $fileObj) : ?>
      <?php snippet('file', ['fileObj' => $fileObj]) ?>
    <?php endforeach ?>
  </div>

  <button class="load-more" accesskey="m">Load new result</button>
  <main data-barba="container" data-barba-namespace="<?= $page->uid() ?>">
