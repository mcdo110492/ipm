<?php

class Main_model extends CI_Model {

	function __construct() {
    	parent::__construct();  

	}

	public function token_encode($token){
		$key = $this->config->item('jwt_key');
		return $jwt = JWT::encode($token,$key);
	}

	public function token_decode($header){
		$extract = explode(" ", $header);
		$token = end($extract);
		$key = $this->config->item('jwt_key');
		$algo = $this->config->item('encryption_key');
		return $jwt = JWT::decode($token,$key,$algo);
	}

	public function restrict_page($accessrole,$header)
	{
		try {
    		$header = $header;
    		if($header!='')
    		{
    			$token = $this->token_decode($header);
		    	$role		= $token->role;
		    	if($accessrole==1)
		    	{
		    		$response = array('stat'=>200,'msg'=>'Authorized.','token'=>$token);
		    	}
	    		else if($role==$accessrole)
		    	{
		    		$response = array('stat'=>200,'msg'=>'Authorized.','token'=>$token);
		    			
		    	}
		    	else
		    	{
		    		$response = array('stat'=>403,'msg'=>'Restricted Access.');
		    	}
    		}
    		else
    		{
    			$response = array('stat'=>403,'msg'=>'Restricted Access.');
    		}
	    	
    			
    	} catch (Exception $e) {
    		$response = array('stat'=>403,'msg'=>'Restricted Access.');
    		
    	}
    	return $response;
	}

	public function hash ($raw)
	{
		return password_hash($raw,PASSWORD_DEFAULT);
	}

	public function getdate()
	{
		return date('Y-m-d h:i:s');
	}

	public function format_date($date)
	{
		$date = new DateTime($date);
		return $date->format('Y-m-d');
	}

	public function format_time($date)
	{
		$date = new DateTime($date);
		return $date->format('h:i:s');
	}

	public function timestamp ($date)
	{
		return strtotime($date);
	}

	public function addtime ($date)
	{
		$date = new DateTime($date);
		$date->modify('+1 day');
		return $date->format('Y-m-d h:i:s');
	}

	public function paginate ($page,$limit,$order,$table,$field,$filter)
	{
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
			$get = $this->db->get($table)->result_array();
		}
		else
		{
			$get = $this->db->like($field,$filter)->limit($limit, $offset)->order_by($field, $order_by)->get($table)->result_array();
		}
		

		$data = array('count'=>$count,'data'=>$get);

		return $data;
	}


	public function count_result($dbsettings)
	{
		if(array_key_exists('where', $dbsettings))
		{
			$res = $this->db->where($dbsettings['where'])->count_all_results($dbsettings['table']);
		}
		else
		{
			$res = $this->db->count_all_results($dbsettings['table']);
		}

		return $res;
	}

	public function get_result($dbsettings)
	{
		if(array_key_exists('where', $dbsettings))
		{
			$res = $this->db->where($dbsettings['where'])->get($dbsettings['table'])->result_array();
		}
		else
		{
			$res = $this->db->get($dbsettings['table'])->result_array();
		}

		return $res;
	}

	public function get_row($dbsettings)
	{
		if(array_key_exists('where', $dbsettings))
		{
			$res = $this->db->where($dbsettings['where'])->get($dbsettings['table'])->row();
		}
		else
		{
			$res = $this->db->get($dbsettings['table'])->row();
		}

		return $res;
	}


	public function upload_file($filename,$allowed_types,$uploadPath)
	{
		$config['upload_path']          = $uploadPath;
        $config['allowed_types']        = $allowed_types;
        $config['max_size']             = 28000;
        $config['overwrite']			= true;
        $config['encrypt_name']			= true;
		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload($filename))
        {
                $arr = array('stat'=>500,'msg'=>'Something Went Wrong.','error' => $this->upload->display_errors());
        }
        else
        {
                $arr = array('stat' => 200,'msg'=>'File Uploaded Successfully.','file_name'=>$this->upload->data('file_name'));

                
        }

        return $arr;
	}


	public function read_excel()
	{
		$this->load->library('excel');
		$file = './uploads/exceldocumentdata.xlsx';
		//read file from path
		$objPHPExcel = PHPExcel_IOFactory::load($file);
		$arr = $sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);

		return $arr;	 
	}

	public function add_data($table,$data)
	{
		$ins = $this->db->insert($table,$data);
		if($ins)
		{
			$id = $this->db->insert_id();
			$response = array('stat'=>200,'msg'=>'Success','id'=>$id);
		}
		else
		{
			$response = array('stat'=>500,'msg'=>'Something Went Wrong.');
		}

		return $response;
	}

	public function update_data($table,$where,$data)
	{	
		$upd = $this->db->where($where)->update($table,$data);

		return $upd;
	}










	


	

}
?>