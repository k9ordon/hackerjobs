<?
// browser switch
include "bs.php";

// bootstrap
include 'd/config.php';
include 'd/tags.php';
include 'c/c.php';

session_start();

$p = split('\?', substr(sprintf('http://%s%s', $_SERVER['SERVER_NAME'], $_SERVER['REQUEST_URI']),strlen($config['base'])));
$up = split('/', $p[0]);

$cn = array_key_exists(1, $up) && !empty($up[1]) ? $up[1] : 'index';
$an = array_key_exists(2, $up) && !empty($up[2]) ? $up[2] : 'index';

$isAjax = array_key_exists('ajax', $_GET) ? true : false;

//var_dump(array($p, $up, 'cn' => $cn,'an' => $an));exit;

// run controller
include sprintf('c/%s.php', $cn);

$ccn = $cn . 'C';

$c = new $ccn;
$c->config = $config;
$c->$an();

// run view
if(file_exists(sprintf('v/%s.php', $cn))) {
	include sprintf('v/%s.php', $cn);
}