<?php $siteurl = $site->url()?>

<div data-bg="#fff" data-tags='<?= implode(', ', $fileObj->tags) ?>' data-number="(<?= $fileObj->position + 1 ?>)" data-title="<?= $fileObj->project_title ?>" class="projects__item  <?php if ($fileObj->type == 'image') : ?><?php endif ?>">
  <a <?php if ($fileObj->type != 'image') : ?>  class="circ-grad"   <?php endif ?> data-position="<?= $fileObj->position ?>" href = '<?= $siteurl."/home/projects/".$fileObj->project ?>'>
    <?php if ($fileObj->type == 'image') : ?>
      <div class="lin-grad"></div>
      <img class='lazy' data-src='<?= $fileObj->resize_url ?>' />
    <?php elseif ($fileObj->type == 'audio') : ?>
      <audio controls>
        <source src="<?= $fileObj->url?>" type="audio/mpeg">
      </audio>
    <?php elseif ($fileObj->type == 'document') : ?>
      <div class="projects__text"><div class="Projects__text__inner"><?= $fileObj->text ?>"</div></div>
    <?php endif ?>
  </a>
</div>



