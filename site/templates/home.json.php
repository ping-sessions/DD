<?php

foreach($files as $fileObj) {
  $html .= snippet('file', ['fileObj' => $fileObj], true);
}

$json['current_words'] = $current_words;
$json['html'] = $html;
$json['files'] = $files;

echo json_encode($json);