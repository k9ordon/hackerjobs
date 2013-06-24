<?
// browser switch
include "bs.php";

// bootstrap
include 'd/config.php';
include 'd/tags.php';
include 'c/c.php';

session_start();

$p = parse_url($_SERVER['REQUEST_URI']);
$up = split('/', $p['path']);
$cn = array_key_exists(2, $up) && !empty($up[2]) ? $up[2] : 'index';
$an = array_key_exists(3, $up) && !empty($up[3]) ? $up[3] : 'index';

$isAjax = array_key_exists('ajax', $_GET) ? true : false;

//var_dump(array('cn' => $cn,'an' => $an));exit;

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