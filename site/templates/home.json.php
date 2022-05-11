<?php

foreach($files as $file) {

  // $html .= snippet('result', ['result' => $file], true);
  // need to do this
  $html = '<div>test</div>';
}
$json['html'] = $html;
$json['files'] = $files;

echo json_encode($json);