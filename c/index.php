<?

class indexC extends c {

	public function index() {
		$this->v['location'] = array_key_exists('location', $_SESSION) ? $_SESSION['location'] : $this->config['defaultLocation'];
	}

}