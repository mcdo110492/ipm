<?php
	require(APPPATH.'libraries/REST_Controller.php');

	class Employee extends REST_Controller {

		public function __construct()
		{
			parent::__construct();

			$this->load->model('employee_model','employee');
			$this->load->model('main_model','main');
			$header = $this->input->get_request_header('Authorization', TRUE);
			try{

				$token = $this->main->token_decode($header);
				if($token->role == 1 OR $token->role == 2 OR $token->role == 3 OR $token->role == 4 OR $token->role == 5 OR $token->role == 6)
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


		public function employee_get()
		{
			$page = $this->get('page');
			$limit = $this->get('limit');
			$order = $this->get('order');
			$field = $this->get('field');
			$table = 'employee_information';
			$filter = $this->get('filter');
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
				$get = $this->db->select('*')->from($table)->join('employee_employment_status','employee_employment_status.employee_id='.$table.'.employee_id')->join('department','department.department_id=employee_employment_status.department_id')->join('position','position.position_id=employee_employment_status.position_id')->join('employment_status','employment_status.status_id=employee_employment_status.status_id')->join('employee_status_type','employee_status_type.employee_status_type_id=employee_employment_status.employee_status_type_id')->order_by($table.'.'.$field,$order_by)->get()->result_array();
			}
			else
			{
				$get = $this->db->select('*')->from($table)->join('employee_employment_status','employee_employment_status.employee_id='.$table.'.employee_id')->join('department','department.department_id=employee_employment_status.department_id')->join('position','position.position_id=employee_employment_status.position_id')->join('employment_status','employment_status.status_id=employee_employment_status.status_id')->join('employee_status_type','employee_status_type.employee_status_type_id=employee_employment_status.employee_status_type_id')->like($table.'.'.$field,$filter)->limit($limit, $offset)->order_by($table.'.'.$field,$order_by)->get()->result_array();
			}
			

			$data = array('count'=>$count,'data'=>$get);




			$this->response($data);

		}

		public function employee_post()
		{
			$info['firstname']				= $this->post('firstname');
			$info['middlename']				= $this->post('middlename');
			$info['lastname'] 				= $this->post('lastname');
			$info['employee_no'] 			= $this->post('employee_no');

			$emp['department_id']			= $this->post('department_id');
			$emp['position_id']				= $this->post('position_id');
			$emp['status_id']				= $this->post('status_id');
			$emp['date_employed']			= $this->main->format_date($this->post('date_employed'));
			$emp['employee_status_type_id'] = 1;

			$get 							= $this->employee->addInformation($info,$emp);

			$this->response($get);

		}


		public function personalInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->gerPersonalInformation($where);

			$this->response($get);
		}


		public function personalInfo_post()
		{
			$where = array('employee_id'=>$this->post('employee_id'));
			$data['firstname']		= $this->post('firstname');
			$data['middlename']		= $this->post('middlename');
			$data['lastname']		= $this->post('lastname');
			$data['dob']			= $this->main->format_date($this->post('dob'));
			$data['pob']			= $this->post('pob');
			$data['height']			= $this->post('height');
			$data['weight']			= $this->post('weight');
			$data['distinguishing_mark'] = $this->post('distinguishing_mark');
			$data['blood']			= $this->post('blood');
			$data['civil_status']	= $this->post('civil_status');
			$data['citizenship']	= $this->post('citizenship');
			$data['religion']		= $this->post('religion');
			$ins = $this->employee->addPersonalInfo($where,$data);

			$this->response($ins);
		}


		public function educationInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getEducationInfo($where);

			$this->response($get);
		}


		public function educationInfo_post()
		{
			$data['school_name']				= $this->post('school_name');
			$data['school_address']				= $this->post('school_address');
			$data['school_year']				= $this->post('school_year');
			$data['degree']						= $this->post('degree');
			$data['honors_awards']				= $this->post('honors_awards');
			$data['major']						= $this->post('major');
			$data['minor']						= $this->post('minor');
			$data['employee_id']				= $this->post('employee_id');

			$ins 								= $this->employee->addEducationInfo($data);

			$this->response($ins);
		}


		public function educationInfo_put()
		{
			$where 								= array('employee_education_id'=>$this->put('employee_education_id'));
			$data['school_name']				= $this->put('school_name');
			$data['school_address']				= $this->put('school_address');
			$data['school_year']				= $this->put('school_year');
			$data['degree']						= $this->put('degree');
			$data['honors_awards']				= $this->put('honors_awards');
			$data['major']						= $this->put('major');
			$data['minor']						= $this->put('minor');
			$data['employee_id']				= $this->put('employee_id');

			$upd 								= $this->employee->updateEducationInfo($where,$data);

			$this->response($upd);
		}


		public function governmentInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getGovernmentInfo($where);

			$this->response($get);
		}


		public function governmentInfo_post()
		{
			$where 								= array('govt_issued_id'=>$this->post('govt_issued_id'));
			$data['sss']						= $this->post('sss');
			$data['pag_ibig']					= $this->post('pag_ibig');
			$data['tin']						= $this->post('tin');
			$data['philhealth']					= $this->post('philhealth');

			$upd 								= $this->employee->updateGovernmentInfo($where,$data);

			$this->response($upd);
		}

		public function contactInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getContactInfo($where);

			$this->response($get);
		}


		public function contactInfo_post()
		{
			$where 								= array('employee_contact_id'=>$this->post('employee_contact_id'));
			$data['present_address']			= $this->post('present_address');
			$data['provincial_address']			= $this->post('provincial_address');
			$data['tel_no']						= $this->post('tel_no');
			$data['cel_no']						= $this->post('cel_no');

			$upd 								= $this->employee->updateContactInfo($where,$data);

			$this->response($upd);
		}

		public function familyInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getFamilyInfo($where);

			$this->response($get);
		}


		public function familyInfo_post()
		{
			$where 								= array('employee_family_id'=>$this->post('employee_family_id'));
			$data['spouse_name']				= $this->post('spouse_name');
			$data['spouse_occupation']			= $this->post('spouse_occupation');
			$data['spouse_address']				= $this->post('spouse_address');
			$data['father_name']				= $this->post('father_name');
			$data['father_occupation']			= $this->post('father_occupation');
			$data['father_address']				= $this->post('father_address');
			$data['mother_name']				= $this->post('mother_name');
			$data['mother_occupation']			= $this->post('mother_occupation');
			$data['mother_address']				= $this->post('mother_address');
			$data['childrens']					= $this->post('childrens');

			$upd 								= $this->employee->updateFamilyInfo($where,$data);

			$this->response($upd);
		}

		public function employmentInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getEmploymentInfo($where);

			$this->response($get);
		}


		public function employmentInfo_post()
		{
			$where 								= array('employment_status_id'=>$this->post('employment_status_id'));
			$data['department_id']				= $this->post('department_id');
			$data['position_id']				= $this->post('position_id');
			$data['date_employed']				= $this->main->format_date($this->post('date_employed'));
			$data['date_retired']				= $this->main->format_date($this->post('date_retired'));
			$data['salary']						= $this->post('salary');
			$data['employee_status_type_id']	= $this->post('employee_status_type_id');
			$data['status_id']					= $this->post('status_id');
			$data['remarks']					= $this->post('remarks');

			$upd 								= $this->employee->updateEmploymentInfo($where,$data);

			$this->response($upd);
		}



		public function trainingInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getTrainingInfo($where);

			$this->response($get);
		}


		public function trainingInfo_post()
		{
			$data['training_title']				= $this->post('training_title');
			$data['training_nature']			= $this->post('training_nature');
			$data['training_period']			= $this->post('training_period');

			$ins 								= $this->employee->addTrainingInfo($data);

			$this->response($ins);
		}


		public function trainingInfo_put()
		{
			$where 								= array('employee_trainings_id'=>$this->put('employee_trainings_id'));
			$data['training_title']				= $this->put('training_title');
			$data['training_nature']			= $this->put('training_nature');
			$data['training_period']			= $this->put('training_period');

			$upd 								= $this->employee->updateTrainingInfo($where,$data);

			$this->response($upd);
		}


		public function clubInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getClubInfo($where);

			$this->response($get);
		}


		public function clubInfo_post()
		{
			$data['club_name']					= $this->post('club_name');
			$data['club_position']				= $this->post('club_position');
			$data['club_membership']			= $this->post('club_membership');

			$ins 								= $this->employee->addClubInfo($data);

			$this->response($ins);
		}


		public function clubInfo_put()
		{
			$where 								= array('employee_club_id'=>$this->put('employee_club_id'));
			$data['club_name']					= $this->put('club_name');
			$data['club_position']				= $this->put('club_position');
			$data['club_membership']			= $this->put('club_membership');

			$upd 								= $this->employee->updateClubInfo($where,$data);

			$this->response($upd);
		}


		public function violationInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getViolationInfo($where);

			$this->response($get);
		}


		public function violationInfo_post()
		{
			$data['employee_id']				= $this->post('employee_id');
			$data['violation_id']				= $this->post('violation_id');
			$data['date_committed']				= $this->main->format_date($this->post('date_committed'));
			$data['remarks']					= $this->post('remarks');

			$ins 								= $this->employee->addViolationInfo($data);

			$this->response($ins);
		}


		public function violationInfo_put()
		{
			$where 								= array('employee_violation_id'=>$this->put('employee_violation_id'));
			$data['employee_id']				= $this->put('employee_id');
			$data['violation_id']				= $this->put('violation_id');
			$data['date_committed']				= $this->main->format_date($this->put('date_committed'));
			$data['remarks']					= $this->put('remarks');

			$upd 								= $this->employee->updateViolationInfo($where,$data);

			$this->response($upd);
		}


		public function uploadNte_post()
		{
			$where 			= array('employee_nte_id'=>$this->post('employee_nte_id'));

			$up 			= $this->main->upload_file('userfile');

			if($up['stat']==200)
			{
				$table 				= 'employee_nte';
				$data['file']		= $up['file_name'];
				$upd 				= $this->db->where($where)->update($table,$data);
				if($upd)
				{
					$response = array('stat'=>200,'msg'=>'Success');
				}
				else
				{
					$response = array('stat'=>500,'msg'=>'Something went wrong in updating');
				}
			}
			else
			{
				$response = array('stat'=>500,'msg'=>'Something went wrong when uploading.');
			}

			$this->response($response);
		}


		public function licensesInfo_get()
		{
			$where = array('employee_id'=>$this->get('employee_id'));

			$get = $this->employee->getLicensesInfo($where);

			$this->response($get);
		}

		public function licensesInfo_post()
		{
			$data['license_no']					= $this->post('license_no');
			$data['license_type']				= $this->post('license_type');
			$data['date_issued']				= $this->main->format_date($this->post('date_issued'));
			$data['date_expired']				= $this->main->format_date($this->post('date_expired'));
			$data['employee_id']				= $this->post('employee_id');

			$ins 								= $this->employee->addLicensesInfo($data);

			$this->response($ins);
		}


		public function licensesInfo_put()
		{
			$where 								= array('employee_license_id'=>$this->put('employee_license_id'));
			$data['license_no']					= $this->put('license_no');
			$data['license_type']				= $this->put('license_type');
			$data['date_issued']				= $this->main->format_date($this->put('date_issued'));
			$data['date_expired']				= $this->main->format_date($this->put('date_expired'));

			$upd 								= $this->employee->updateLicensesInfo($where,$data);

			$this->response($upd);
		}



		

	

	}
?>