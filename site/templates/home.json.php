<?php

$json['current_words'] = $current_words;
$json['random_words'] = $random_words;
$json['tagged_files'] = $tagged_files;
$json['all_files'] = $all_files;

echo json_encode($json);