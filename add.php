<?php
header('Access-Control-Allow-Origin: *');
$fileName=$_POST["fileName"];
$addObj=$_POST["addObj"];
$str=file_get_contents($fileName);
$x=json_decode($str,true);
$x[sizeof($x)]=$addObj;
$s=json_encode($x);
$l=file_put_contents($fileName,$s);
echo $s;
?>