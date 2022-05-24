<?php $siteurl = $site->url()?>

<div class="projects__item">
  <a data-position="<?= $fileObj->position ?>" href = '<?= $siteurl."/home/projects/".$fileObj->project ?>'>
  <?php if ($fileObj->type == 'image') : ?>
  <img class="clip1" src = '<?= $fileObj->url ?>' />
  <?php elseif ($fileObj->type == 'audio') : ?>
    <audio controls>
      <source src="<?= $fileObj->url?>" type="audio/mpeg">
    </audio>
  <?php elseif ($fileObj->type == 'document') : ?>
    <div>DOCUMENT</div>
  <?php endif ?>
  <div class="projects__item__title"><?= $fileObj->project_title ?></div>
</a>
</div>