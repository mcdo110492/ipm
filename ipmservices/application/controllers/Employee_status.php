<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Employee_status extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'employee_status_type';
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 || $token->role == 2 OR $token->role == 3)
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


		public function employee_status_get()
		{
			$page = $this->get('page');
			$limit = $this->get('limit');
			$order = $this->get('order');
			$field = $this->get('field');
			$table = $this->table;
			$filter = $this->get('filter');
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
				$get = $this->db->get($table)->result_array();
			}
			else
			{
				$get = $this->db->like($field,$filter)->limit($limit, $offset)->order_by($field, $order_by)->get($table)->result_array();
			}
			

			$data = array('count'=>$count,'data'=>$get);




			$this->response($data);

		}

		public function employee_status_post()
		{
			$data['type']		= $this->post('type');
			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function employee_status_put()
		{
			$id 					 	= $this->put('employee_status_type_id');
			$data['type'] 				= $this->put('type');
			$where 					 	= array('employee_status_type_id'=>$id);
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