<?php

return function ($page) {

  $limit = 2;
  // $projects   = $page->children()->listed()->paginate($limit);
  // $projects =  $page->children()->find('projects')->children()->listed()->paginate($limit);
  // $pagination = $projects->pagination();
  // $more       = $pagination->hasNextPage();
  // $files = $page->children()->find('projects')->children()->listed()->files();

  // create object representation of each file
  // and push it to array
  $filesArr = [];
  foreach ($page->children()->find('projects')->children()->listed()->files() as $file) {
    $fileObj = new stdClass();
    $fileObj->id = $file->id();
    $fileObj->url = $file->url();
    $fileObj->tags = $file->tags()->split(',');
    $filesArr[] = $fileObj;
  }

  return [
      // 'projects' => $projects,
      // 'more'     => $more,
      'files' => $filesArr,
      'html'     => '',
      'json'     => [],
    ];
};

