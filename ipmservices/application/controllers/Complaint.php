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

				$this->token = $this->main->token_decode($header);
				if( $this->token->role == 1 OR $this->token->role == 4 OR $this->token->role == 7)
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
				
				$result = $this->db->select('*')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->join('complaint_dispatcher as cd','cd.complaint_id='.$table.'.complaint_id')->join('complaint_it as ci','ci.complaint_id='.$table.'.complaint_id')->order_by($table.'.'.$field, $order_by)->get()->result_array();

				foreach($result as $r)
				{
					$countGeofence 		= $this->db->where('geofence_id',$r['geofence_id'])->count_all_results('geofence');
					if($countGeofence>0)
					{
						$geofence   = $this->db->where('geofence_id',$r['geofence_id'])->get('geofence')->row();
						$route_code = $geofence->route_code;
						$route_file = $geofence->route_file;
						$route_file_name = $geofence->route_file_name;
						$brgy 		= $geofence->brgy;
						$location = $geofence->location;
						$sector  = $geofence->sector;
					}
					else
					{
						$route_file = '';
						$route_code = '';
						$route_file_name = '';
						$brgy 		= '';
						$location = '';
						$sector  = '';
					}
					$countDispatch  	= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->count_all_results('trip_ticket');
					if($countDispatch>0)
					{
						$trip_ticket 			= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->get('trip_ticket')->row();
						$trip_ticket_code 		= $trip_ticket->trip_ticket_code;
						$dispatch_time 			= $trip_ticket->dispatch_time;
						$dispatch_date 			= $trip_ticket->dispatch_date;
						$shift 					= $this->db->where('shift_id',$trip_ticket->shift_id)->get('shift')->row()->shift_name;
					}
					else
					{
						$trip_ticket 			= '';
						$trip_ticket_code 		= '';
						$dispatch_time 			= '';
						$dispatch_date 			= '';
						$shift 					= '';
					}
					$get []  = array('complaint_no'=>$r['complaint_no'],'complaint_id'=>$r['complaint_id']
									  ,'complaint_it_id'=>$r['complaint_it_id'],'client_name'=>$r['client_name'],
									  'client_type'=>$r['client_type'],'contact_no'=>$r['contact_no'],'type_est_name'=>$r['type_est_name'],'type_est_id'=>$r['type_est_id'],
									  'details'=>$r['details'],'location'=>$r['location'],'complaint_date'=>$r['complaint_date'],
									  'route_code'=>$route_code,'route_file'=>$route_file,'geofence_id'=>$r['geofence_id'],
									  'it_status'=>$r['it_status'],'it_remarks'=>$r['it_remarks'],
									  'brgy'=>$brgy,'location'=>$location,'sector'=>$sector,'route_file_name'=>$route_file_name,
									  'trip_ticket_id'=>$r['trip_ticket_id'],'trip_ticket_code'=>$trip_ticket_code,'dispatch_time'=>$dispatch_time,'dispatch_date'=>$dispatch_date,'shift'=>$shift,
									  'dispatcher_status'=>$r['dispatcher_status'],'dispatcher_remarks'=>$r['dispatcher_remarks'],'complaint_dispatcher_id'=>$r['complaint_dispatcher_id']);
				}
			}
			else
			{
				$result = $this->db->select('*')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->join('complaint_dispatcher as cd','cd.complaint_id='.$table.'.complaint_id')->join('complaint_it as ci','ci.complaint_id='.$table.'.complaint_id')->like($table.'.'.$field,$filter)->or_like('type_establishment.type_est_name', $filter)->or_like($table.'.location', $filter)->or_like($table.'.complaint_date',$filter)->or_like($table.'.client_type',$filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->get()->result_array();
				foreach($result as $r)
				{
					$countGeofence 		= $this->db->where('geofence_id',$r['geofence_id'])->count_all_results('geofence');
					if($countGeofence>0)
					{
						$geofence   = $this->db->where('geofence_id',$r['geofence_id'])->get('geofence')->row();
						$route_code = $geofence->route_code;
						$route_file = $geofence->route_file;
						$route_file_name = $geofence->route_file_name;
						$brgy 		= $geofence->brgy;
						$location = $geofence->location;
						$sector  = $geofence->sector;
					}
					else
					{
						$route_file = '';
						$route_code = '';
						$route_file_name = '';
						$brgy 		= '';
						$location = '';
						$sector  = '';
					}
					$countDispatch  	= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->count_all_results('trip_ticket');
					if($countDispatch>0)
					{
						$trip_ticket 			= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->get('trip_ticket')->row();
						$trip_ticket_code 		= $trip_ticket->trip_ticket_code;
						$dispatch_time 			= $trip_ticket->dispatch_time;
						$dispatch_date 			= $trip_ticket->dispatch_date;
						$shift 					= $this->db->where('shift_id',$trip_ticket->shift_id)->get('shift')->row()->shift_name;
					}
					else
					{
						$trip_ticket 			= '';
						$trip_ticket_code 		= '';
						$dispatch_time 			= '';
						$dispatch_date 			= '';
						$shift 					= '';
					}
					$get []  = array('complaint_no'=>$r['complaint_no'],'complaint_id'=>$r['complaint_id']
									  ,'complaint_it_id'=>$r['complaint_it_id'],'client_name'=>$r['client_name'],
									  'client_type'=>$r['client_type'],'contact_no'=>$r['contact_no'],'type_est_name'=>$r['type_est_name'],'type_est_id'=>$r['type_est_id'],
									  'details'=>$r['details'],'location'=>$r['location'],'complaint_date'=>$r['complaint_date'],
									  'route_code'=>$route_code,'route_file'=>$route_file,'geofence_id'=>$r['geofence_id'],
									  'it_status'=>$r['it_status'],'it_remarks'=>$r['it_remarks'],
									  'brgy'=>$brgy,'location'=>$location,'sector'=>$sector,'route_file_name'=>$route_file_name,
									  'trip_ticket_id'=>$r['trip_ticket_id'],'trip_ticket_code'=>$trip_ticket_code,'dispatch_time'=>$dispatch_time,'dispatch_date'=>$dispatch_date,'shift'=>$shift,'dispatcher_status'=>$r['dispatcher_status'],'dispatcher_remarks'=>$r['dispatcher_remarks'],'complaint_dispatcher_id'=>$r['complaint_dispatcher_id']);
				}
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function complaint_post()
		{
			$maxId 					 = $this->db->select_max('complaint_no')->get($this->table)->row();
			$data['client_name'] 	 = $this->post('client_name');
			$data['client_type'] 	 = $this->post('client_type');
			$data['contact_no']   	 = $this->post('contact_no');
			$data['type_est_id']   	 = $this->post('type_est_id');
			$data['details']		 = $this->post('details');
			$data['location']		 = $this->post('location');
			$data['complaint_date']  = $this->main->format_date($this->post('complaint_date'));
			$data['status']			 = 1;
			$data['complaint_no']	 = $maxId->complaint_no + 1;
			$data['user_id']		= $this->token->user_id;
			
			$this->db->trans_start();
			$this->db->insert($this->table,$data);
			$complaint_id 			= $this->db->insert_id();
			$data2['complaint_id']	= $complaint_id;
			$data2['dispatcher_status'] 	= 0;
			$this->db->insert('complaint_dispatcher',$data2);
			$data3['complaint_id']	= $complaint_id;
			$data3['it_status']		= 0;
			$this->db->insert('complaint_it',$data3);
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

		public function complaint_put()
		{
			$data['client_name'] 	 = $this->put('client_name');
			$data['client_type'] 	 = $this->put('client_type');
			$data['contact_no']   	 = $this->put('contact_no');
			$data['type_est_id']   	 = $this->put('type_est_id');
			$data['details']		 = $this->put('details');
			$data['location']		 = $this->put('location');
			$data['complaint_date']  = $this->main->format_date($this->put('complaint_date'));
			$where 					 = array('complaint_id'=>$this->put('complaint_id'));
			$upd 					 = $this->main->update_data($this->table,$where,$data);
			if($upd)
			{
				$response = array('stat'=>200);
			}
			else
			{
				$response = array('stat'=>500);
			}
			$this->response($response);
		}


		public function complaint_it_get()
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
				
				$result = $this->db->select('*, ci.user_id as it_user,'.$table.'.user_id as c_user')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->join('complaint_it as ci','ci.complaint_id='.$table.'.complaint_id')->order_by($table.'.'.$field, $order_by)->get()->result_array();
				foreach($result as $r)
				{
					$countGeofence 		= $this->db->where('geofence_id',$r['geofence_id'])->count_all_results('geofence');
					if($countGeofence>0)
					{
						$geofence   = $this->db->where('geofence_id',$r['geofence_id'])->get('geofence')->row();
						$route_code = $geofence->route_code;
						$route_file = $geofence->route_file;
						$route_file_name = $geofence->route_file_name;
						$brgy 		= $geofence->brgy;
						$location = $geofence->location;
						$sector  = $geofence->sector;
					}
					else
					{
						$route_file = '';
						$route_code = '';
						$route_file_name = '';
						$brgy 		= '';
						$location = '';
						$sector  = '';
					}
					$userCount 		= $this->db->where('user_id',$r['it_user'])->count_all_results('user');
					if($userCount>0)
					{
						$user 		= $this->db->where('user_id',$r['it_user'])->get('user')->row()->profile_name;
					}
					else
					{
						$user 		= '';
					}
					$get []  = array('complaint_no'=>$r['complaint_no'],'complaint_id'=>$r['complaint_id']
									  ,'complaint_it_id'=>$r['complaint_it_id'],'client_name'=>$r['client_name'],
									  'client_type'=>$r['client_type'],'contact_no'=>$r['contact_no'],'type_est_name'=>$r['type_est_name'],
									  'details'=>$r['details'],'location'=>$r['location'],'complaint_date'=>$r['complaint_date'],
									  'route_code'=>$route_code,'route_file'=>$route_file,'geofence_id'=>$r['geofence_id'],
									  'it_status'=>$r['it_status'],'it_remarks'=>$r['it_remarks'],
									  'brgy'=>$brgy,'location'=>$location,'sector'=>$sector,'route_file_name'=>$route_file_name,'last_save'=>$r['last_save'],'last_acted_by'=>$user);
				}

			}
			else
			{
				$result = $this->db->select('*, ci.user_id as it_user,'.$table.'.user_id as c_user')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->join('complaint_it as ci','ci.complaint_id='.$table.'.complaint_id')->like($table.'.'.$field,$filter)->or_like('type_establishment.type_est_name', $filter)->or_like($table.'.location', $filter)->or_like($table.'.complaint_date',$filter)->or_like($table.'.client_type',$filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->get()->result_array();
				foreach($result as $r)
				{
					$countGeofence 		= $this->db->where('geofence_id',$r['geofence_id'])->count_all_results('geofence');
					if($countGeofence>0)
					{
						$geofence   = $this->db->where('geofence_id',$r['geofence_id'])->get('geofence')->row();
						$route_code = $geofence->route_code;
						$route_file = $geofence->route_file;
						$route_file_name = $geofence->route_file_name;
						$brgy 		= $geofence->brgy;
						$location = $geofence->location;
						$sector  = $geofence->sector;

					}
					else
					{
						$route_file = '';
						$route_code = '';
						$route_file_name = '';
						$brgy 		= '';
						$location = '';
						$sector  = '';
					}

					$userCount 		= $this->db->where('user_id',$r['it_user'])->count_all_results('user');
					if($userCount>0)
					{
						$user 		= $this->db->where('user_id',$r['it_user'])->get('user')->row()->profile_name;
					}
					else
					{
						$user 		= '';
					}

					$get []  = array('complaint_no'=>$r['complaint_no'],'complaint_id'=>$r['complaint_id']
									  ,'complaint_it_id'=>$r['complaint_it_id'],'client_name'=>$r['client_name'],
									  'client_type'=>$r['client_type'],'contact_no'=>$r['contact_no'],'type_est_name'=>$r['type_est_name'],
									  'details'=>$r['details'],'location'=>$r['location'],'complaint_date'=>$r['complaint_date'],
									  'route_code'=>$route_code,'route_file'=>$route_file,'geofence_id'=>$r['geofence_id'],
									  'it_status'=>$r['it_status'],'it_remarks'=>$r['it_remarks'],
									  'brgy'=>$brgy,'location'=>$location,'sector'=>$sector,'route_file_name'=>$route_file_name,'last_save'=>$r['last_save'],'last_acted_by'=>$user);
				}
				
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function complaint_it_put()
		{
			$data['geofence_id'] 	 = $this->put('geofence_id');
			$data['it_status'] 	 	 = 1;
			$data['last_save']		 = date('Y-m-d');
			$data['user_id']		 = $this->token->user_id;
			$where 					 = array('complaint_it_id'=>$this->put('complaint_it_id'));
			$upd 					 = $this->main->update_data('complaint_it',$where,$data);
			if($upd)
			{
				$response = array('stat'=>200);
			}
			else
			{
				$response = array('stat'=>500);
			}
			$this->response($response);
		}

		public function complaint_dispatch_get()
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
				
				$result = $this->db->select('*,cd.user_id as dispatcher_user,'.$table.'.user_id as c_user')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->join('complaint_dispatcher as cd','cd.complaint_id='.$table.'.complaint_id')->order_by($table.'.'.$field, $order_by)->get()->result_array();

				foreach($result as $r)
				{
					
					$countDispatch  	= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->count_all_results('trip_ticket');
					if($countDispatch>0)
					{
						$trip_ticket 			= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->get('trip_ticket')->row();
						$trip_ticket_code 		= $trip_ticket->trip_ticket_code;
						$dispatch_time 			= $trip_ticket->dispatch_time;
						$dispatch_date 			= $trip_ticket->dispatch_date;
						$shift 					= $this->db->where('shift_id',$trip_ticket->shift_id)->get('shift')->row()->shift_name;
					}
					else
					{
						$trip_ticket 			= '';
						$trip_ticket_code 		= '';
						$dispatch_time 			= '';
						$dispatch_date 			= '';
						$shift 					= '';
					}
					$userCount 		= $this->db->where('user_id',$r['dispatcher_user'])->count_all_results('user');
					if($userCount>0)
					{
						$user 		= $this->db->where('user_id',$r['dispatcher_user'])->get('user')->row()->profile_name;
					}
					else
					{
						$user 		= '';
					}
					$get []  = array('complaint_no'=>$r['complaint_no'],'complaint_id'=>$r['complaint_id']
									  ,'client_name'=>$r['client_name'],
									  'client_type'=>$r['client_type'],'contact_no'=>$r['contact_no'],'type_est_name'=>$r['type_est_name'],'type_est_id'=>$r['type_est_id'],
									  'details'=>$r['details'],'location'=>$r['location'],'complaint_date'=>$r['complaint_date'],
									  'trip_ticket_id'=>$r['trip_ticket_id'],'trip_ticket_code'=>$trip_ticket_code,'dispatch_time'=>$dispatch_time,'dispatch_date'=>$dispatch_date,'shift'=>$shift,
									  'dispatcher_status'=>$r['dispatcher_status'],'dispatcher_remarks'=>$r['dispatcher_remarks'],'complaint_dispatcher_id'=>$r['complaint_dispatcher_id'],'last_save'=>$r['last_save'],'last_acted_by'=>$user);
				}
			}
			else
			{
				$result = $this->db->select('*,cd.user_id as dispatcher_user,'.$table.'.user_id as c_user')->from($table)->join('type_establishment','type_establishment.type_est_id='.$table.'.type_est_id')->join('complaint_dispatcher as cd','cd.complaint_id='.$table.'.complaint_id')->like($table.'.'.$field,$filter)->or_like('type_establishment.type_est_name', $filter)->or_like($table.'.location', $filter)->or_like($table.'.complaint_date',$filter)->or_like($table.'.client_type',$filter)->limit($limit, $offset)->order_by($table.'.'.$field, $order_by)->get()->result_array();
				foreach($result as $r)
				{
					
					$countDispatch  	= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->count_all_results('trip_ticket');
					if($countDispatch>0)
					{
						$trip_ticket 			= $this->db->where('trip_ticket_id',$r['trip_ticket_id'])->get('trip_ticket')->row();
						$trip_ticket_code 		= $trip_ticket->trip_ticket_code;
						$dispatch_time 			= $trip_ticket->dispatch_time;
						$dispatch_date 			= $trip_ticket->dispatch_date;
						$shift 					= $this->db->where('shift_id',$trip_ticket->shift_id)->get('shift')->row()->shift_name;
					}
					else
					{
						$trip_ticket 			= '';
						$trip_ticket_code 		= '';
						$dispatch_time 			= '';
						$dispatch_date 			= '';
						$shift 					= '';
					}
					$userCount 		= $this->db->where('user_id',$r['dispatcher_user'])->count_all_results('user');
					if($userCount>0)
					{
						$user 		= $this->db->where('user_id',$r['dispatcher_user'])->get('user')->row()->profile_name;
					}
					else
					{
						$user 		= '';
					}
					$get []  = array('complaint_no'=>$r['complaint_no'],'complaint_id'=>$r['complaint_id']
									  ,'client_name'=>$r['client_name'],
									  'client_type'=>$r['client_type'],'contact_no'=>$r['contact_no'],'type_est_name'=>$r['type_est_name'],'type_est_id'=>$r['type_est_id'],
									  'details'=>$r['details'],'location'=>$r['location'],'complaint_date'=>$r['complaint_date'],
									  'trip_ticket_id'=>$r['trip_ticket_id'],'trip_ticket_code'=>$trip_ticket_code,'dispatch_time'=>$dispatch_time,'dispatch_date'=>$dispatch_date,'shift'=>$shift,'dispatcher_status'=>$r['dispatcher_status'],'dispatcher_remarks'=>$r['dispatcher_remarks'],'complaint_dispatcher_id'=>$r['complaint_dispatcher_id'],'last_save'=>$r['last_save'],'last_acted_by'=>$user);
				}
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function complaint_dispatch_put()
		{
			$data['trip_ticket_id'] 	 		 = $this->put('trip_ticket_id');
			$data['dispatcher_status'] 	 	 	 = 1;
			$data['last_save']					 = date('Y-m-d');
			$data['user_id']					 = $this->token->user_id;
			$where 					 = array('complaint_dispatcher_id'=>$this->put('complaint_dispatcher_id'));
			$upd 					 = $this->main->update_data('complaint_dispatcher',$where,$data);
			if($upd)
			{
				$response = array('stat'=>200);
			}
			else
			{
				$response = array('stat'=>500);
			}
			$this->response($response);
		}

	

	}
?>