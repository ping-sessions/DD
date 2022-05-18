<?php

return function ($kirby, $site) {
  require_once($kirby->root('site') . '/helpers/content.php');
  $page = $site->page('home');
  $content = new Content();
  return [
    'current_words' => $content->returnWords($page->names()->toStructure()),
    'files' => $content->returnFiles($page->children()->find('projects')->children()->listed()->files()),
  ];
};