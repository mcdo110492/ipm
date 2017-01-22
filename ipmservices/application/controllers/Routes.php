<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Routes extends REST_Controller {

		public function __construct()
		{
			parent::__construct();
			$this->load->model('main_model','main');
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 OR $token->role == 2 OR $token->role == 3 OR $token->role == 4 OR $token->role == 5 OR $token->role == 6 OR $token->role == 7)
				{

				}
				else
				{
					$this->response(array('error'=>'Invalid Authorization.'),400);
					exit();
				}
			}	
			catch (Exception $e)
			{
				$this->response(array('error'=>'Error'),400);
				exit();
			}
			
		}


		public function routes_get()
		{
			$response = array('stat'=>200,'msg'=>'Valid Credentials');
			$this->response($response,200);
		}



	



	

	}
?>