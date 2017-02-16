<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Main extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			
		}


		
		public function checkField_post()
		{
			$field 		= $this->post('field');
			$table 		= $this->post('table');
			$value      = str_replace(" ", "", $this->post('value'));
			
			$where      = array($field=>$value);
			$dbsettings = array('where'=>$where,'table'=>$table);
			$check = $this->main->count_result($dbsettings);
			if($check>0)
			{
				$response = array('stat'=>403,'msg'=>'This data is in use.');
			}
			else
			{
				$response = array('stat'=>200,'msg'=>true);
			}

			$this->response($response);
		}


		

		

	

	}
?>