<?php
  require_once('parse-rtf.php');

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
      // generate random number for index of array based on the date
      srand(date('Ymd'));
      $value = rand(0, (count($namesArr) - 1));
      $random_index = $value; 
      $this->current_words[] = $namesArr[$random_index]->first_word->value();
      $this->current_words[] = $namesArr[$random_index]->last_word->value();
      return $this->current_words; 
    }
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
          $fileObj->extension = $file->extension();
          $fileObj->project_title = $file->page()->title()->value();
          $fileObj->project = $file->page()->slug();
          $fileObj->url = $file->url();
          if ($file->type() == 'image') {
            // if file is not already small enough
            if ($file->size() > 300000) {
              if ($file->width() < 1200) {
                $fileObj->resize_url = $file->resize($file->width())->url();
              }
              else {
                $fileObj->resize_url = $file->resize(1200)->url();
              }
            }
            else {
              $fileObj->resize_url = $file->url();
            }
          }
          $fileObj->size = $file->size();
          $fileObj->text = $file->text();
          $fileObj->position = $file->indexOf();
          $fileObj->tags = $file->tags()->split(',');
          $fileObj->text = parse_rtf($file);
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
        $fileObj->extension = $file->extension();
        $fileObj->project_title = $file->page()->title()->value();
        $fileObj->project = $file->page()->slug();
        $fileObj->url = $file->url();
        if ($file->type() == 'image') {
          // if file is not already small enough
          if ($file->size() > 300000) {
            if ($file->width() < 1200) {
              $fileObj->resize_url = $file->resize($file->width())->url();
            }
            else {
              $fileObj->resize_url = $file->resize(1200)->url();
            }
          }
          else {
            $fileObj->resize_url = $file->url();
          }
        }
        $fileObj->size = $file->size();
        $fileObj->text = $file->text();
        $fileObj->position = $file->indexOf();
        $fileObj->tags = $file->tags()->split(',');
        $fileObj->text = parse_rtf($file);
        $files_arr[] = $fileObj;
      }
      return $files_arr;
    }
  }