<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Equipment extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'equipment';
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 || $token->role == 5 || $token->role == 6)
				{

				}
				else
				{
					$this->response(array('error'=>'Invalid Authorization.'),400);
				}
			}	
			catch (Exception $e)
			{
				$this->response(array('error'=>'Error'),400);
			}
		}


		public function equipment_get()
		{
			$page = $this->get('page');
			$limit = $this->get('limit');
			$order = $this->get('order');
			$table = $this->table;
			$filter = $this->get('filter');
			$field = $this->get('field');
			$limitpage = $page - 1;
			$offset = $limit * $limitpage;
			$count = $this->db->count_all_results($table);
			if($order==='-order')
			{
				$order_by = 'DESC';
			}
			else
			{
				$order_by = 'ASC';
			}
			
			if($filter === 'All')
			{
				$get = $this->db->select('*')->from($table)->order_by($field, $order_by)->get()->result_array();
			}
			else
			{
				$get = $this->db->select('*')->from($table)->like($field,$filter)->limit($limit, $offset)->order_by($field, $order_by)->get()->result_array();
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function equipment_post()
		{
			$data['equipment_code'] 	 	 = $this->post('equipment_code');
			$data['equipment_name']   		 = $this->post('equipment_name');
			$data['equipment_model']   		 = $this->post('equipment_model');
			$data['equipment_capacity']   	 = $this->post('equipment_capacity');
			
			

			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function equipment_put()
		{
			$id 					 = $this->put('equipment_id');
			$fieldname 				 = $this->put('fieldname');
			$value 				 	 = $this->put('value');
			$data[$fieldname]		 = $value; 
			$where 					 = array('equipment_id'=>$id);
			$upd = $this->main->update_data($this->table,$where,$data);

			if($upd)
			{
				$response = array('stat'=>200,'msg'=>'Success.');
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong..');
			}

			$this->response($response);
		}




	

	}
?>