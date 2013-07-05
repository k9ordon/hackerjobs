<?

class jobsC extends c {
	public function index() {
		$tag = $this->v['tag'] = @$_GET['tag'];
		if(empty($tag)) {
			header('Location: ' . $this->config['base']);
		}

		$location = $this->v['location'] = $_SESSION['location'] = 
		!empty($location) ? @$_GET['location'] : (array_key_exists('location', $_SESSION) ? $_SESSION['location'] : $this->config['defaultLocation']);

		$this->getJobs($tag, $location);
		//echo "<pre>".print_r($jobs, true);
	}

	public function getJobs($tag, $location) {
		$apiUrl = sprintf($this->config['apiUrl'], 'job/list', 'jobfield=2172&keyword='.$tag.'&location='.$location);

		//sleep(1);
		//$r = $this->config['fakeJobs']; // cache read
		//die(base64_encode(file_get_contents($apiUrl))); // cache write
		$r = unserialize(file_get_contents($apiUrl)); // live

		$this->v['jobsCount'] = $r['data']['pagination']['entriesSum'];
		$this->v['jobs'] = $r['data']['data'];
	}
}