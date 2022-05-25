<?php 

require_once('rtf-html-php.php');

function parse_rtf($file) {
  $file_contents = '';
  if ($file->type() == 'document') {
    $reader = new RtfReader();
    $rtf = file_get_contents($file);
    if ($reader->Parse($rtf)) {
      $formatter = new RtfHtml('UTF-8');
      $html_content = $formatter->Format($reader->root);
      $file_contents = strip_tags($html_content);
    }
  }
  return $file_contents;
}