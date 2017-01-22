<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Complaint extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'complaint';
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if( $token->role == 1 OR $token->role == 4 OR $token->role == 7)
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


		public function complaint_get()
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
				$get = $this->db->select('*')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->order_by($table.'.'.$field, $order_by)->get()->result_array();
			}
			else
			{
				$get = $this->db->select('*')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->like($table.'.'.$field,$filter)->or_like('type_establishment.type_est_name', $filter)->or_like($table.'.location', $filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->get()->result_array();
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function complaint_post()
		{
			$data['client_name'] 	 = $this->post('client_name');
			$data['type_est_id']   	 = $this->post('type_est_id');
			$data['details']		 = $this->post('details');
			$data['location']		 = $this->post('location');
			$data['complaint_date']  = $this->post('complaint_date');
			$data['status']			 = 1;
			

			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function complaint_put()
		{
			$id 					 = $this->put('complaint_id');
			$fieldname 				 = $this->put('fieldname');
			$value 				 	 = $this->put('value');
			$data[$fieldname]		 = $value; 
			$where 					 = array('complaint_id'=>$id);
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