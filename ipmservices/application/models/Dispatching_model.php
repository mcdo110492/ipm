<?php

class Dispatching_model extends CI_Model {



	public function __construct() {
    	parent::__construct();  
    	//load the main model function
    	$this->load->model('main_model','main');
    	$this->table = 'trip_ticket';
	}




	


	public function getDispatchingInformation($where)
	{
		$table = $this->table;

		$count = $this->db->where($where)->count_all_results($table);

		if($count>0)
		{
			$get = $this->db->select('*')->from($table)->join('item','item.item_id='.$table.'.item_id')->join('equipment','equipment.equipment_id='.$table.'.equipment_id')->get()->result_array();
			//$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}







	


	

	


	

}
?>