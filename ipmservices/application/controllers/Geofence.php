<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Geofence extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table = 'geofence';

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


		public function geofence_get()
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
				$get = $this->db->select('*')->from($table)->order_by($table.'.'.$field, $order_by)->get()->result_array();
			}
			else
			{
				$get = $this->db->select('*')->from($table)->like($table.'.'.$field,$filter)->or_like($table.'.brgy',$filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->order_by($table.'.status','ASC')->get()->result_array();
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function geofence_post()
		{
			$allowed_types = 'jpg|jpeg';
			$uploadPath = '../ipmrepository/routes/';
			$up = $this->main->upload_file('userfile',$allowed_types,$uploadPath);
			if($up['stat']==200)
			{
				$last_route_code 				= $this->db->select_max('route_code')->get($this->table)->row()->route_code;
				$data['route_code']				= $last_route_code + 1;
				$data['route_file']				= $up['file_name'];
				$data['brgy']					= $this->post('brgy');
				$data['location']				= $this->post('location');
				$data['sector']					= $this->post('sector');
				$data['route_file_name']		= $this->post('route_file_name');
				$data['status']					= 1;
				$ins = $this->main->add_data($this->table,$data);

			}
			else
			{
				$ins = array('stat'=>500,'msg'=>'Something went wrong.','error'=>$up['error']);
			}

			

			$this->response($ins);
		}

		public function geofence_put()
		{
			$geofence_id 				= $this->put('geofence_id');
			$data['brgy']				= $this->put('brgy');
			$data['location']			= $this->put('location');
			$data['sector']				= $this->put('sector');
			$data['route_file_name']	= $this->put('route_file_name');
			$where 						= array('geofence_id'=>$geofence_id);
			$upd 						= $this->main->update_data($this->table,$where,$data);
			if($upd)
			{
				$response = array('status'=>200,'msg'=>'Success.');
			}
			else
			{
				$response = array('status'=>500,'msg'=>'Something went wrong..');
			}

			$this->response($response);
		}

		public function change_status_post()
		{
			$geofence_id 		= $this->post('geofence_id');
			$data['status']		= $this->post('status_type');
			$where 				= array('geofence_id'=>$geofence_id);
			$upd 				= $this->main->update_data($this->table,$where,$data);
			if($upd)
			{
				$response = array('status'=>200,'msg'=>'Success.');
			}
			else
			{
				$response = array('status'=>500,'msg'=>'Something went wrong..');
			}

			$this->response($response);
		}


		public function change_route_post()
		{
			$allowed_types = 'jpeg|jpg';
			$uploadPath = '../ipmrepository/routes/';
			$up = $this->main->upload_file('userfile',$allowed_types,$uploadPath);
			if($up['stat']==200)
			{
				$geofence_id 					= $this->post('geofence_id');
				$data['route_file']				= $up['file_name'];
				$where 							= array('geofence_id'=>$geofence_id);
				$upd 							= $this->main->update_data($this->table,$where,$data);
				if($upd)
				{
					$response = array('status'=>200,'msg'=>'Success.');
				}
				else
				{
					$response = array('status'=>500,'msg'=>'Something went wrong..');
				}

			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong.','error'=>$up['error']);
			}

			

			$this->response($response);
		}


	

	}
?>