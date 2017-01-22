<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Lunchbox extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('main_model','main');
			$this->table1 = 'lunch_box';
			$this->table2 = 'lunch_box_gadget';
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


		public function lunchbox_get()
		{
			$page = $this->get('page');
			$limit = $this->get('limit');
			$order = $this->get('order');
			$table1 = $this->table1;
			$table2 = $this->table2;
			$filter = $this->get('filter');
			$field = $this->get('field');
			$limitpage = $page - 1;
			$offset = $limit * $limitpage;
			$count = $this->db->count_all_results($table1);
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
				$get = $this->db->get($table1)->result_array();
				foreach($get as $r)
				{
					$gadgets = $this->db->select('*')->from($table2)->join('gadget','gadget.gadget_id='.$table2.'.gadget_id')->where($table2.'.lunch_box_id',$r['lunch_box_id'])->get()->result_array();
					$data [] = array('lunch_box_id'=>$r['lunch_box_id'],'lunch_box_code'=>$r['lunch_box_code'],'gadgets'=>$gadgets);
				}
			}
			else
			{
				$get = $this->db->limit($limit, $offset)->order_by($field, $order_by)->like($field,$filter)->get($table1)->result_array();
				foreach($get as $r)
				{
					$gadgets = $this->db->select('*')->from($table2)->join('gadget','gadget.gadget_id='.$table2.'.gadget_id')->where($table2.'.lunch_box_id',$r['lunch_box_id'])->get()->result_array();
					$data [] = array('lunch_box_id'=>$r['lunch_box_id'],'lunch_box_code'=>$r['lunch_box_code'],'gadgets'=>$gadgets);
				}
			}
		

			$response = array('count'=>$count,'data'=>$data);



			$this->response($response);

		}

		public function lunchbox_post()
		{
			$gadgets 					 = $this->post('gadgets');
			$data['lunch_box_code'] 	 = $this->post('lunch_box_code');
			$this->db->trans_start();
			$this->main->add_data($this->table1,$data);
			$lunch_box_id 				 = $this->db->insert_id();
			foreach($gadgets as $g)
			{
				$array 		= array('lunch_box_id'=>$lunch_box_id,'gadget_id'=>$g);
				$this->db->insert($this->table2,$array);
			}
			$this->db->trans_complete();
			if($this->db->trans_status())
			{
				$response = array('stat'=>200,'msg'=>'Success');
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something Went Wrong.');
			}
			$this->response($response);
		}



		public function lunchboxGadgets_get()
		{

			$table1 = $this->table1;
			$table2 = $this->table2;
			$count = $this->db->count_all_results($table1);
			$lunch_box_id = $this->get('lunch_box_id');
			
			$get = $this->db->select('*')->from($table2)->join('gadget as g','g.gadget_id='.$table2.'.gadget_id')->where($table2.'.lunch_box_id',$lunch_box_id)->get()->result_array();
			
			$response = array('count'=>$count,'data'=>$get);



			$this->response($response);
		}

		public function lunchboxGadgets_post()
		{
			$table2 = $this->table2;
			$data['lunch_box_id']		= $this->post('lunch_box_id');
			$data['gadget_id']			= $this->post('gadget_id');
			$ins = $this->main->add_data($table2,$data);
			$this->response($ins);
		}

		public function lunchboxGadgets_put()
		{
			$table2 = $this->table2;
			$data['gadget_id']			= $this->put('gadget_id');
			$where 						= array('lunch_box_gadget_id'=>$this->put('lunch_box_gadget_id'));
			$upd = $this->main->update_data($table2,$where,$data);
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