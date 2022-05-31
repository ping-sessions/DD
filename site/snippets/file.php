<?php $siteurl = $site->url()?>

<div data-bg="#fff" data-number="(<?= $fileObj->position + 1 ?>)" data-title="<?= $fileObj->project_title ?>" class="projects__item">
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
  </a>
</div>



