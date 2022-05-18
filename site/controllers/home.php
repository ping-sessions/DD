<?php

return function ($kirby, $page) {
  require_once($kirby->root('site') . '/helpers/content.php');
  $content = new Content();
  return [
    'current_words' => $content->returnWords($page->names()->toStructure()),
    'files' => $content->returnFiles($page->children()->find('projects')->children()->listed()->files()),
  ];
};