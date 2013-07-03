<?
$config['base'] = "http://hackerjobs.k94n.com";

// get your api key at http://www.karriere.at/api/docs
$config['apiKey'] = file_get_contents('d/apikey');
$config['apiUrl'] = 'http://www.karriere.at/api/%s?key='.$config['apiKey'].'&type=php&%s';
$config['defaultLocation'] = 'Österreich';

include ('fake.php');