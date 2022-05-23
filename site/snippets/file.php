<?php $siteurl = $site->url()?>

<div class="projects__item">
  <a href = '<?= $siteurl."/home/projects/".$fileObj->project ?>'>
  <?php if ($fileObj->type == 'image'):?>
  <img class="clip1" src = '<?= $fileObj->url ?>' />
  <?php endif ?>
  <?php if ($fileObj->type == 'audio'):?>
    <audio controls>
  <source src="<?= $fileObj->url?>" type="audio/mpeg">
</audio>
  <?php endif ?>
  <div class="projects__item__title"><?= $fileObj->project_title ?></div>
</a>
</div>