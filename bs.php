<?

if(!strpos($_SERVER['HTTP_USER_AGENT'], ' Chrome/') && !strpos($_SERVER['HTTP_USER_AGENT'], ' AppleWebKit/')) {
?>
<html>
<link href="a/c/page.css" rel="stylesheet" type="text/css" media="screen" />
<body id="wack">
<h1>Your browser is wack!</h1>
<a href="https://www.google.com/intl/de/chrome/browser/canary.html">Download Chrome</a>
<a href="http://www.karriere.at">Get a job</a>
<?
exit;	
}