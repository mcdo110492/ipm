<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Position extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'position';
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


		public function position_get()
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
				$get = $this->db->select('*')->from($table)->join('department','department.department_id='.$table.'.department_id')->get()->result_array();
			}
			else if($filter === 'Specific')
			{
				$dept_id = $this->get('department_id');
				$get = $this->db->where('department_id',$dept_id)->get($table)->result_array();
			}
			else
			{
				$get = $this->db->select('*')->from($table)->join('department','department.department_id='.$table.'.department_id')->like($table.'.'.$field,$filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->get()->result_array();
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function position_post()
		{
			$data['position_name'] 	 = $this->post('position_name');
			$data['department_id']   = $this->post('department_id');
			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function position_put()
		{
			$id 					 = $this->put('position_id');
			$data['position_name'] 	 = $this->put('position_name');
			$data['department_id']   = $this->put('department_id');
			$where 					 = array('position_id'=>$id);
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