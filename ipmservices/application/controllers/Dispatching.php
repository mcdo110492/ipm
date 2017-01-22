<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Dispatching extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('Dispatching_model','dispatching');
			$this->table = 'trip_ticket';
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 OR $token->role == 5)
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


		public function dispatching_get()
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
				$get = $this->db->select('*')->from($table)->join('item','item.item_id='.$table.'.item_id')->order_by($table.'.'.$field,$order_by)->get()->result_array();
			}
			else
			{
		
				$get = $this->db->select('*')->from($table)->join('item','item.item_id='.$table.'.item_id')->join('equipment','equipment.equipment_id='.$table.'.equipment_id')->join('gadget','gadget.gadget_id='.$table.'.gadget_id')->like($table.'.'.$field,$filter)->limit($limit, $offset)->order_by($table.'.'.$field,$order_by)->get()->result_array();
			}
		

			$data = array('count'=>$count,'data'=>$get);



			$this->response($data);

		}

		public function dispatching_post()
		{
			$data['trip_ticket_code'] 	 	 = $this->post('trip_ticket_code');
			$data['dispatch_time']   	 = $this->main->format_time($this->post('dispatch_time'));
			$data['dispatch_date']   	 = $this->main->format_date($this->post('dispatch_date'));
			$data['shift']   	 = $this->post('shift');
			$data['item_id']   	 = $this->post('item_id');
			$data['equipment_id']   	 = $this->post('equipment_id');
			$data['gadget_id']   	 = $this->post('gadget_id');
			$data['geofence_id']   	 = $this->post('geofence_id');
			$data['driver']   	 = $this->post('driver');
			$data['garbage_collectors']   	 = $this->post('garbage_collectors');
			$data['dispatcher']   	 = $this->post('dispatcher');
			

			$ins = $this->main->add_data($this->table,$data);

			$this->response($ins);
		}

		public function dispatching_put()
		{
			$id 					 = $this->put('trip_ticket_id');
			$fieldname 				 = $this->put('fieldname');
			$value 				 	 = $this->put('value');
			$data[$fieldname]		 = $value; 
			$where 					 = array('trip_ticket_id'=>$id);
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


		public function dispatchingInfo_get()
		{
			$where = array('trip_ticket_id'=>$this->get('trip_ticket_id'));

			$get = $this->dispatching->getDispatchingInformation($where);

			$this->response($get);
		}





	

	}
?>