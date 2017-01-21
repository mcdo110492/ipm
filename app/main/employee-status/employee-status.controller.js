(function () {
	'use strict';
		angular
			.module('app.employee-status')
			.controller('EmployeeStatusController',EmployeeStatusController);

			/** @ngInject */
			function EmployeeStatusController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.employee_status = [];

				vm.getEmployeeStatus = getEmployeeStatus;
				vm.OpenAddDialog = OpenAddDialog;
				vm.updateData    = updateData;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'type'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/employee-status/dialog/employee-status-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'EmployeeStatusDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEmployeeStatus);
				 }
				
				

				
				function getEmployeeStatus ()
				{
					$scope.promise = api.employee_status.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.employee_status = r;
					}

				}

				function updateData(value,id)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else
				    {
				    	var data = {'type':value.status_type,'employee_status_type_id':id};
				    	api.employee_status.update(data,success);
				    	function success(r)
				    	{
				    		if(r.stat == 200)
				    		{
				    			toaster.pop('success','Success','Changes has been saved.');
				    		}
				    		else
				    		{
				    			toaster.pop('error','Error','Something went wrong.');
				    		}
				    	}
				    }
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
				    
				   getEmployeeStatus();
				 });
			}
})();