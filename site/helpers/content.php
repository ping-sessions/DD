<?php
  class Content {
    public $current_words = [];
    public function return_words($names) {
      $namesArr = [];
      foreach ($names as $name) {
        // each item in array is object
        $nameObj = new stdClass();
        $nameObj->first_word = $name->first_word();
        $nameObj->last_word = $name->last_word();
        $namesArr[] = $nameObj;
      }
      // generate random number for index of array
      $random_index = rand(0, (count($namesArr) - 1));
      $this->current_words[] = $namesArr[$random_index]->first_word->value();
      $this->current_words[] = $namesArr[$random_index]->last_word->value();
      return $this->current_words; 
    }
    // public function return_text_snippets($pages) {
      // $snippetsArr = [];
      // foreach ($pages as $page) {
      //   // each item in array is object
      //   $nameObj = new stdClass();
      //   $nameObj->first_word = $name->first_word();
      //   $nameObj->last_word = $name->last_word();
      //   $namesArr[] = $nameObj;
      // }
      // // generate random number for index of array
      // $random_index = rand(0, (count($namesArr) - 1));
      // $this->current_words[] = $namesArr[$random_index]->first_word->value();
      // $this->current_words[] = $namesArr[$random_index]->last_word->value();
      // return $this->current_words; 
    // }
    public function return_tagged_files($files) {
      // create object representation of each file + create array from them
      $tagged_files_arr = [];
      foreach ($files as $file) {
        // if the file contains tags (array intersects) with the current_words array 
        // include this in the data 
        $result = array_intersect($this->current_words, $file->tags()->split(','));
        if ($result) {
          $fileObj = new stdClass();
          $fileObj->id = $file->id();
          $fileObj->type = $file->type();
          $fileObj->project_title = $file->page()->title()->value();
          $fileObj->project = $file->page()->slug();
          $fileObj->url = $file->url();
          $fileObj->position = $file->indexOf();
          $fileObj->resize = $file->resize(1200);
          $fileObj->tags = $file->tags()->split(',');
          $tagged_files_arr[] = $fileObj;
        }
      }
      return $tagged_files_arr;
    }
    public function return_all_files($files) {
      // create object representation of each file + create array from them
      $files_arr = [];
      foreach ($files as $file) {
        $fileObj = new stdClass();
        $fileObj->id = $file->id();
        $fileObj->type = $file->type();
        $fileObj->project_title = $file->page()->title()->value();
        $fileObj->project = $file->page()->slug();
        $fileObj->url = $file->url();
        $fileObj->position = $file->indexOf();
        $fileObj->resize = $file->resize(1200);
        $fileObj->tags = $file->tags()->split(',');
        $files_arr[] = $fileObj;
      }
      return $files_arr;
    }
  }
