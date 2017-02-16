<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Gadget extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'gadget';
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 || $token->role == 4 || $token->role == 5)
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


		public function gadget_get()
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

		public function gadget_post()
		{
			$data['gadget_code'] 	 	 = $this->post('gadget_code');
			$data['gadget_name']   	 	 = $this->post('gadget_name');
			$data['gadget_model']   	 = $this->post('gadget_model');
			$data['gadget_type']   	 	 = $this->post('gadget_type');
			$data['gadget_status']   	 = 1;
			

			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function gadget_put()
		{
			$id 					 = $this->put('gadget_id');
			$fieldname 				 = $this->put('fieldname');
			$value 				 	 = $this->put('value');
			$data[$fieldname]		 = $value; 
			$where 					 = array('gadget_id'=>$id);
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

		public function gadget_status_post()
		{
			$data['gadget_status']		= $this->post('gadget_status');
			$id 						= $this->post('gadget_id');
			$where 						= array('gadget_id'=>$id);
			$table 						= $this->table;

			$upd = $this->main->update_data($table,$where,$data);

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