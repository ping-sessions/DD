<?php

return function ($page) {
  // build array of names from structure
  $namesArr = [];
  $names = $page->names()->toStructure();
  foreach ($names as $name) {
    // each item in array is object
    $nameObj = new stdClass();
    $nameObj->first_word = $name->first_word();
    $nameObj->last_word = $name->last_word();
    $namesArr[] = $nameObj;
  }
  // generate random number for index of array
  $random_index = rand(0, (count($namesArr) - 1));
  // push each word in array to a new flat array
  $current_words = [];
  $current_words[] = $namesArr[$random_index]->first_word;
  $current_words[] = $namesArr[$random_index]->last_word;

  // create object representation of each file + create array from them
  $filesArr = [];
  foreach ($page->children()->find('projects')->children()->listed()->files() as $file) {
    // if the file contains tags (array intersects) with the current_words array 
    // include this in the data 
    $result = array_intersect($current_words, $file->tags()->split(','));
    if ($result) {
      $fileObj = new stdClass();
      $fileObj->id = $file->id();
      $fileObj->url = $file->url();
      $fileObj->tags = $file->tags()->split(',');
      $filesArr[] = $fileObj;
    }
  }

  return [
    'current_words' => $current_words,
    'files' => $filesArr,
  ];
};