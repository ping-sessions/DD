<h1>HOME PAGE</h1>

<!-- get random content -->
<div class = 'content'>
  <!-- <php foreach ($page->children()->find('projects')->children()->listed() as $project) : ?>
    <php foreach ($project->files() as $file) : ?>
      <php $result = $file->url() ?>
      <php snippet('result', ['result' => $result]) ?>
    <php endforeach ?>
  <php endforeach ?> -->

  <!-- $files variable is set in controller -->
  <?php foreach ($files as $file) : ?>
    <div>FILE</div>
    <!-- <php snippet('result', ['result' => $file]) ?> -->
  <?php endforeach ?>
</div>

<!-- variable $ is defined in controller -->
<!-- <div class="projects"  data-page="<= $pagination->nextPage() ?>"> -->
  <!-- <php foreach ($projects as $project) : ?> -->
    <!-- <php snippet('result', ['result' => $project]) ?> -->
  <!-- <php endforeach ?> -->
  <!-- <php foreach ($files as $file) : ?> -->
    <!-- <php snippet('result', ['result' => $project]) ?> -->
  <!-- <php endforeach ?> -->
</div>

<button class="load-more" accesskey="m">Load new result</button>

<style>
* > img {
  width: 100px;
}
</style>