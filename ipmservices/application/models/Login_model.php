<?php

class Login_model extends CI_Model {



	public function __construct() {
    	parent::__construct();  
    	//load the main model function
    	$this->load->model('main_model','main');
    	$this->table = 'user';
	}


	//authenticate from the database	
	public function authenticate($credentials)
	{
		$table = $this->table;
		$dbsettings = array('where'=>array('username'=>$credentials['username']),'table'=>$table);
		$verify = $this->main->count_result($dbsettings);
		if($verify>0)
		{
			$raw = $credentials['password'];
			$row = $this->main->get_row($dbsettings);
			$verify_password = password_verify($raw,$row->password);
			if($verify_password)
			{
				$payload = $this->generate_token($row);
				$response = array('stat'=>200,'msg'=>'Verified.','token'=>$payload,'user_id'=>$row->user_id,'role'=>$row->role,'profile_name'=>$row->profile_name,'profile_picture'=>$row->image);
			}
			else
			{
				$response = array('stat'=>403,'msg'=>'Invalid Credentials');
			}
		}
		else
		{
			$response = array('stat'=>403,'msg'=>'Invalid Credentials');
		}

		return $response;
	}


	public function generate_token ($row)
	{
		$date				= $this->main->getdate();
		$data['iat']		= $this->main->timestamp($date);
		$data['nbf']		= $this->main->timestamp($date);
		$data['exp']		= $this->main->timestamp($this->main->addtime($date));
		$data['user_id']	= $row->user_id;
		$data['jti']		= $data['iat'].$row->user_id.uniqid();
		$data['role']		= $row->role;
		$data['status']	 	= $row->status;
		$token				= $this->main->token_encode($data);

		return $token;
	}
	


	

	


	

}
?>