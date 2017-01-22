<?php

class Employee_model extends CI_Model {



	public function __construct() {
    	parent::__construct();  
    	//load the main model function
    	$this->load->model('main_model','main');
    	$this->table = 'employee_information';
	}




	public function generateNumber($firstname,$middlename,$lastname)
	{
		$f = $firstname;
		$m = $middlename;
		$l = $lastname;
		$currentDate = date('Y-m-d h:i:s');
		$toTime		= strtotime($currentDate);
		$idNumber = $f[0].$m[0].$l[0].$toTime;

		return $idNumber;
	}



	public function addInformation($info,$emp)
	{
		$table 		= $this->table;
		$table2 	= 'employee_employment_status';
		$table3 	= 'employee_government_issued_number';
		$table4		= 'employee_address_contact';
		$table5 	= 'employee_family';

		$this->db->trans_start();
		$this->db->insert($table,$info);
		$employee_id 			= $this->db->insert_id();
		$emp['employee_id']		= $employee_id;
		$this->db->insert($table2,$emp);
		$data['employee_id']	= $employee_id;
		$this->db->insert($table3,$data);
		$this->db->insert($table4,$data);
		$this->db->insert($table5,$data);
		$this->db->trans_complete();

		if($this->db->trans_status())
		{
			$response = array('stat'=>200,'employee_id'=>$employee_id);
		}
		else
		{
			$response = array('stat'=>500,'msg'=>'Something went wrong.');
		}

		return $response;
	}


	public function gerPersonalInformation($where)
	{
		$table = $this->table;

		$count = $this->db->where($where)->count_all_results($table);

		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}

	public function addPersonalInfo($where,$posts)
	{
		$table = $this->table;
		$ins = $this->db->where($where)->update($table,$posts);

		if($ins)
		{
			$response = array('stat'=>200,'msg'=>'Save Success');
		}
		else
		{
			$response = array('stat'=>500,'msg'=>'Something went wrong');
		}

		return $response;
	}


	public function getEducationInfo($where)
	{
		$table = 'employee_education';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}

	public function addEducationInfo($data)
	{
			$table = 'employee_education';
			$ins = $this->db->insert($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function updateEducationInfo($where,$data)
	{
			$table = 'employee_education';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function getGovernmentInfo($where)
	{
		$table = 'employee_government_issued_number';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}

	public function updateGovernmentInfo($where,$data)
	{
			$table = 'employee_government_issued_number';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function getContactInfo($where)
	{
		$table = 'employee_address_contact';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}

	public function updateContactInfo($where,$data)
	{
			$table = 'employee_address_contact';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}

	public function getFamilyInfo($where)
	{
		$table = 'employee_family';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}

	public function updateFamilyInfo($where,$data)
	{
			$table = 'employee_family';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}

	public function getEmploymentInfo($where)
	{
		$table = 'employee_employment_status';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}


	public function updateEmploymentInfo($where,$data)
	{
			$table = 'employee_employment_status';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}

	public function getTrainingInfo($where)
	{
		$table = 'employee_training_seminar';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}


	public function addTrainingInfo($data)
	{
			$table = 'employee_training_seminar';
			$ins = $this->db->insert($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function updateTrainingInfo($where,$data)
	{
			$table = 'employee_training_seminar';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}

	public function getClubInfo($where)
	{
		$table = 'employee_club';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}


	public function addClubInfo($data)
	{
			$table = 'employee_club';
			$ins = $this->db->insert($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function updateClubInfo($where,$data)
	{
			$table = 'employee_club';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}

	public function getViolationInfo($where)
	{
		$table1 = 'employee_violation';
		$table2 = 'violation';
		$table3 = 'employee_nte';

		$count = $this->db->where($where)->count_all_results($table1);
		if($count>0)
		{
			$get = $this->db->select('*')->from($table1)->join($table2,$table2.'.violation_id='.$table1.'.violation_id')->join($table3,$table3.'.employee_violation_id='.$table1.'.employee_violation_id')->where($where)->get()->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}


	
	public function addViolationInfo($data)
	{
			$table = 'employee_violation';
			$table2 = 'employee_nte';

			$this->db->trans_start();
			$this->db->insert($table,$data);
			$data2['employee_violation_id'] = $this->db->insert_id();
			$this->db->insert($table2,$data2);
			$this->db->trans_complete();

			if($this->db->trans_status())
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function updateViolationInfo($where,$data)
	{
			$table = 'employee_violation';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function getLicensesInfo($where)
	{
		$table = 'employee_license';

		$count = $this->db->where($where)->count_all_results($table);
		if($count>0)
		{
			$get = $this->db->where($where)->get($table)->result_array();
			$response = array('stat'=>200,'data'=>$get);
		}
		else
		{
			$response = array('stat'=>404,'msg'=>'No result(s) found.');
		}

		return $response;
	}


	public function addLicensesInfo($data)
	{
			$table = 'employee_license';
			$ins = $this->db->insert($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}


	public function updateLicensesInfo($where,$data)
	{
			$table = 'employee_license';
			$ins = $this->db->where($where)->update($table,$data);

			if($ins)
			{
				$response = array('stat'=>200,'msg'=>"Success");
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong');
			}

			return $response;
	}
	

	


	

}
?>