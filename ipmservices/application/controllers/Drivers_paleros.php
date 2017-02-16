<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Drivers_paleros extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
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



		public function employees_get()
		{
			$position_id = $this->get('position_id');
			$where 		 = array('ees.position_id'=>$position_id);
			$count       = $this->db->where('position_id',$position_id)->count_all_results('employee_employment_status');
			$get 		 = $this->db->select('*')->from('employee_information as ei')->join('employee_employment_status as ees','ees.employee_id=ei.employee_id')->where($where)->get()->result_array();
			$response 		 = array('count'=>$count,'data'=>$get);
			$this->response($response);
		}


		public function drivers_paleros_get()
		{
			$page = $this->get('page');
			$limit = $this->get('limit');
			$order = $this->get('order');
			$filter = $this->get('filter');
			$field = $this->get('field');
			$limitpage = $page - 1;
			$offset = $limit * $limitpage;
			$count = $this->db->count_all_results('driver');
			if($order==='-order')
			{
				$order_by = 'DESC';
			}
			else
			{
				$order_by = 'ASC';
			}
			
				$get = $this->db->select('*')->from('driver as d')->join('employee_information as ei','ei.employee_id=d.employee_id')->limit($limit, $offset)->order_by('ei.lastname',$order_by)->like('ei.employee_no',$filter)->or_like('ei.lastname',$filter)->get()->result_array();
				foreach($get as $r)
				{
					$paleros = $this->db->select('*')->from('driver_paleros as dp')->join('employee_information as ei','ei.employee_id=dp.employee_id')->where('dp.driver_id',$r['driver_id'])->get()->result_array();
					$data [] = array('driver_id'=>$r['driver_id'],'employee_id'=>$r['employee_id'],'employee_no'=>$r['employee_no'],'lastname'=>$r['lastname'],'middlename'=>$r['middlename'],'firstname'=>$r['firstname'],'paleros'=>$paleros);
				}
			
		

			$response = array('count'=>$count,'data'=>$data);



			$this->response($response);

		}

		

		public function drivers_paleros_post()
		{
			$driver['employee_id'] 	= $this->post('driver_id');
			$paleros 				= $this->post('paleros');

			$this->db->trans_start();
			$this->db->insert('driver',$driver);
			$driver_id  = $this->db->insert_id();
			foreach($paleros as $p)
			{
				$data = array('driver_id'=>$driver_id,'employee_id'=>$p,'paleros_status'=>1);
				$this->db->insert('driver_paleros',$data);
			}

			$this->db->trans_complete();

			if($this->db->trans_status())
			{
				$response = array('stat'=>200);
			}
			else
			{
				$response = array('stat'=>500);
			}

			$this->response($response);
		}


		public function paleros_get()
		{
			$where 		= array('dp.driver_id'=>$this->get('driver_id'));
			$get 		= $this->db->select('*')->from('driver_paleros as dp')->join('employee_information as ei','ei.employee_id=dp.employee_id')->where($where)->get()->result_array();
			$response   = array('data'=>$get);
			$this->response($response);
		}

		public function paleros_post()
		{
			$paleros 		= $this->post('paleros');
			$driver_id 		= $this->post('driver_id');
			$this->db->trans_start();
			foreach($paleros as $p)
			{
				$data 	= array('driver_id'=>$driver_id,'employee_id'=>$p,'paleros_status'=>1);
				$this->db->insert('driver_paleros',$data);
			}
			$this->db->trans_complete();
			if($this->db->trans_status())
			{
				$response = array('stat'=>200);
			}	
			else
			{
				$response = array('stat'=>500);
			}

			$this->response($response);
		}

		public function paleros_put()
		{
			$driver_paleros_id 		 = $this->put('driver_paleros_id');
			$data['paleros_status']  = $this->put('paleros_status');
			$where 					 = array('driver_paleros_id'=>$driver_paleros_id);
			$update 				 = $this->db->where($where)->update('driver_paleros',$data);
			if($update)
			{
				$response 			 = array('stat'=>200);
			}
			else
			{
				$response 			 = array('stat'=>500);
			}

			$this->response($response);
		}




	

	}
?>