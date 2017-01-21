(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('EmploymentController',EmploymentController);


			/** @ngInject */

			function EmploymentController(api,toaster,$stateParams,$timeout)
			{
				var vm = this;

					vm.departments = [];
					vm.positions = [];
					vm.employment_status = [];
					vm.employee_status = [];

					vm.getEmployment = getEmployment;
					vm.getPosition = getPosition;
					vm.saveChanges = saveChanges;
					vm.employment = {
						department_id:'',
						position_id:'',
						date_employed:'',
						date_retired:'',
						status_id:'',
						employee_status_type_id:'',
						salary:'',
						remarks:'',
						employee_id:$stateParams.id,
						employment_status_id:''
					};

					getDepartment();
					function getDepartment ()
					{
						var query1 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'',
							field:'department_name'
						};
						api.department.get(query1,success);

						function success(r)
						{
							vm.departments = r.data;
						}
					}

					function getPosition ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'Specific',
							field:'position_name',
							department_id:vm.employment.department_id
						};

						api.position.get(query2,success);

						function success(r)
						{
							vm.positions = r.data;
						}
					}
					getEmploymentStatus();
					function getEmploymentStatus ()
					{
						var query3 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'status_type'
						};

						api.employment_status.get(query3,success);
					
						function success(r){
							
							vm.employment_status = r.data;
						}
					}
					getEmployeeStatus();
					function getEmployeeStatus ()
					{
						var query4 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'type'
						};

						api.employee_status.get(query4,success);
					
						function success(r){
							
							vm.employee_status = r.data;
						}
					}

					function getEmployment ()
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_employment.get(datastring,success);

						function success(r)
						{

							if(r.stat === 200)
							{

								vm.employment = {
									department_id:r.data[0].department_id,
									position_id:r.data[0].position_id,
									date_employed:new Date(r.data[0].date_employed),
									date_retired:new Date(r.data[0].date_retired),
									status_id:r.data[0].status_id,
									employee_status_type_id:r.data[0].employee_status_type_id,
									salary: Number(r.data[0].salary),
									remarks:r.data[0].remarks,
									employee_id:$stateParams.id,
									employment_status_id:r.data[0].employment_status_id
								};

								$timeout(function(){
									getPosition();
								},250);
								
							}

						}
					}

					function saveChanges ()
					{
						api.employee_employment.save(vm.employment,success);

						function success(r)
						{
							if(r.stat == 200)
							{
								toaster.pop('success','Changes has been saved.');
							}
							else
							{
								toaster.pop('error','Something went wrong.');
							}
						}
					}


			}
})();