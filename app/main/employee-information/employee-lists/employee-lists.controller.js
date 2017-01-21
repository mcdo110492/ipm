(function () {
	'use strict';	
		angular
			.module('app.employee-lists')
			.controller('EmployeeListsController',EmployeeListsController);

			/** @ngInject */
			function EmployeeListsController ($scope,PluginConfig,api) 
			{
				var vm = this;
				var bookmark;
				var tmpUrl = 'app/main/employee-information/employee-lists/dialog/employee-lists-dialog.html';
				var ctrl = 'EmployeeListsDialogController';
				var ctrlAs = 'edcvm';
				vm.role_type = true;
				vm.employees = [];
				vm.getEmployee = getEmployee;
				vm.OpenAddDialog = OpenAddDialog;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'employee_no'
				};


				init();
				function init()
				{
					var role = localStorage.user_type;
					if(role==1 || role == 2)
					{
						vm.role_type = false;
					}

				}

				getEmployee();
				function getEmployee ()
				{
					$scope.promise = api.employee.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.employees = r;
					}

				}


				function OpenAddDialog (ev)
				{
				 	
				 	var localData = {'data':null};
				 	
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEmployee);
				}


				$scope.$watchCollection('vm.query.filter', function (newValue, oldValue) {
				    if(!oldValue) {
				      bookmark = vm.query.page;
				    }
				    
				    if(newValue !== oldValue) {
				      vm.query.page = 1;
				    }
				    
				    if(!newValue) {
				      vm.query.page = bookmark;
				    }
				    
				   getEmployee();
				 });
			}
})();