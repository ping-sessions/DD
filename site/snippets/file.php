<?php $siteurl = $site->url()?>

<div data-bg="#fff" data-title="(<?= $fileObj->position + 1 ?>) <?= $fileObj->project_title ?>" class="projects__item">
  <a data-position="<?= $fileObj->position ?>" href = '<?= $siteurl."/home/projects/".$fileObj->project ?>'>
    <?php if ($fileObj->type == 'image') : ?>
      <img class="clip1" src = '<?= $fileObj->url ?>' />
    <?php elseif ($fileObj->type == 'audio') : ?>
      <audio controls>
        <source src="<?= $fileObj->url?>" type="audio/mpeg">
      </audio>
    <?php elseif ($fileObj->type == 'document') : ?>
      <div class="projects__text">"<?= $fileObj->text ?>"</div>
    <?php endif ?>
   <!-- <div class="projects__item__title"><?= $fileObj->project_title ?></div>-->
  </a>
</div>



