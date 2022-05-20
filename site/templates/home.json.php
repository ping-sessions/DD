<?php

// foreach($tagged_files as $fileObj) {
//   $tagged_html .= snippet('file', ['fileObj' => $fileObj], true);
// }

// foreach($all_files as $fileObj) {
//   $all_html .= snippet('file', ['fileObj' => $fileObj], true);
// }

$json['current_words'] = $current_words;
$json['tagged_files'] = $tagged_files;
// $json['tagged_html'] = $tagged_html;
$json['all_files'] = $all_files;
// $json['all_html'] = $all_html;

echo json_encode($json);