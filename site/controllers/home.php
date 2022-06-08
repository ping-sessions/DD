<?php

return function ($kirby, $page) {
  require_once($kirby->root('site') . '/helpers/content.php');
  $content = new Content();
  return [
    'current_words' => $content->return_words($page->names()->toStructure()),
    'random_words' => $content->return_random_words($page->names()->toStructure()),
    'tagged_files' => $content->return_tagged_files($page->children()->find('projects')->children()->listed()->files()),
    'all_files' => $content->return_all_files($page->children()->find('projects')->children()->listed()->files())
  ];
};