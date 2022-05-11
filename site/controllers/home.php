<?php

return function ($page) {
  $limit = 2;
  // get DD iteration 
  $current_name = $page->names();


  $files = $page->children()->find('projects')->children()->listed()->files();
  return [
    'limit' => $limit,
    'files' => $files,  
     // 'pagination' => $projects->pagination(),  
  ];
};