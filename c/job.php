<?

class jobC extends c {
	public function index() {
		$id = $this->v['id'] = @$_GET['id'];
		if(empty($id)) {
			header('Location: ' . $this->config['base']);
		}

		$this->getJob($id);
		//echo "<pre>".print_r($jobs, true);
	}

	public function getJob($id) {
		$apiUrl = sprintf($this->config['apiUrl'], 'job/detail', 'id='.$id);

		//sleep(1);
		$r = $this->config['fakeJob']; // cache read
		//die(base64_encode(file_get_contents($apiUrl))); // cache write
		//$r = unserialize(file_get_contents($apiUrl)); // live

		$this->v['job'] = $r['data'];
	}
}