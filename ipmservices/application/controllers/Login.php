<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Login extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('login_model','login');
			
		}


		public function login_post()
		{
			$username = $this->post('username');
			$password = $this->post('password');
			$credentials = array('username'=>$username,'password'=>$password);
			$get = $this->login->authenticate($credentials);
			$this->response($get);

		}

	

	}
?>