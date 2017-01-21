(function () {
	'use strict';
		angular
			.module('app.employee-lists')
			.controller('EmployeeListsDialogController',EmployeeListsDialogController);

			/** @ngInject */
			function EmployeeListsDialogController (PluginConfig,api,$location)
			{
				var vm = this;

					vm.departments = [];
					vm.positions = [];
					vm.employment_status = [];
					vm.closeDialog = closeDialog;
					vm.loadDepartments = loadDepartments;
					vm.loadEmploymentStatus = loadEmploymentStatus;
					vm.getPosition = getPosition;
					vm.save 	= save;

					function closeDialog ()
					{
						PluginConfig.CloseDialog();
					}

					function loadDepartments ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'department_name'
						};

						return vm.departments.length ? null : api.department.get(query2,success);

						function success(r)
						{
							vm.departments = r.data;
						}
					}


					function loadEmploymentStatus()
					{
						var query4 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'status_type'
						};

						return vm.employment_status.length ? null : api.employment_status.get(query4,success);

						function success(r)
						{
							vm.employment_status = r.data;
						}
					}

					function getPosition(id)
					{
						var query3 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'Specific',
							field:'position_name',
							department_id:id
						};

						api.position.get(query3,success);

						function success(r)
						{
							vm.positions = r.data;
						}
					}


					function save (credentials)
					{
						api.employee.save(credentials,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								closeDialog();
								$location.url('/employee-details/'+r.employee_id);
							}
						}
					}
			}	
})();