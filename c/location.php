<?

class locationC extends c {
	public function reverse() {
    	$lat = @$_GET['lat'];
    	$lng = @$_GET['lng'];
        
    	//$type = 'administrative_area_level_2';
    	$type = 'administrative_area_level_1';

    	if(empty($lat) || empty($lng)) {
    		echo 0;
    		return;
    	}

    	$geoApi =sprintf("http://maps.googleapis.com/maps/api/geocode/json?language=de&latlng=%s,%s&sensor=false", $lat, $lng); 
	    $result = json_decode(file_get_contents($geoApi), true); 

	    $geoResultTypes = array();
	    foreach($result['results'][0]['address_components'] as $item) {
	    	$geoResultTypes[$item['types'][0]] = $item['long_name'];
	    }

	    if(array_key_exists($type, $geoResultTypes)) {
	    	echo $geoResultTypes[$type];
	    	$_SESSION['location'] = $geoResultTypes[$type];
	    	return;
	    }
	}

	public function store() {
		if(empty($_GET['s'])) {
			unset($_SESSION['location']);
		} else {
			$_SESSION['location'] = $_GET['s'];
		}			
	}
}