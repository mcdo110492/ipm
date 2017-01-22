<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Establishment extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'type_establishment';

			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 || $token->role == 7 || $token->role == 4)
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


		public function establishment_get()
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
				$get = $this->db->select('*')->from($table)->get()->result_array();
			}
			else
			{
				$get = $this->db->select('*')->from($table)->like($table.'.'.$field,$filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->get()->result_array();
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function establishment_post()
		{
			$data['type_est_name'] 	 = $this->post('type_est_name');
			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function establishment_put()
		{
			$id 					 = $this->put('type_est_id');
			$data['type_est_name'] 	 = $this->put('type_est_name');
			$where 					 = array('type_est_id'=>$id);
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