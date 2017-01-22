<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Violation extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'violation';

			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 || $token->role == 2 || $token->role == 3)
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


		public function violation_get()
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

		public function violation_post()
		{
			$data['violation_type']		= $this->post('violation_type');
			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function violation_put()
		{
			$id 					 	= $this->put('violation_id');
			$data['violation_type'] 	= $this->put('violation_type');
			$where 					 	= array('violation_id'=>$id);
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