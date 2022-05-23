<div class = 'selector hidden'>
<div class="show-title"></div>
<div class="instructions">Decide DD</div>
<div class="grid">
  <?php $names = $page->names()->toStructure()->shuffle(); ?>
  <?php foreach ($names as $name) : ?>
    <div class = 'selector__name' data-tags='<?= $name->first_word().', '.$name->last_word() ?>'><?= $name->first_word().' '.$name->last_word() ?></div>
  <?php endforeach ?>
</div>
  </div>