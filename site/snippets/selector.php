<div class = 'selector hidden'>
  <?php $names = $page->names()->toStructure(); ?>
  <?php foreach ($names as $name) : ?>
    <div class = 'selector__name' data-tags='<?= $name->first_word().', '.$name->last_word() ?>'><?= $name->first_word().' '.$name->last_word() ?></div>
  <?php endforeach ?>
</div>