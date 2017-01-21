(function () {
	'use strict';
		angular
			.module('app.employment-status')
			.controller('EmploymentStatusController',EmploymentStatusController);

			/** @ngInject */
			function EmploymentStatusController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.employment_status = [];

				vm.getEmploymentStatus = getEmploymentStatus;
				vm.OpenAddDialog = OpenAddDialog;
				vm.updateData    = updateData;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'status_type'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/employment-status/dialog/employment-status-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'EmploymentStatusDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEmploymentStatus);
				 }
				
				

				
				function getEmploymentStatus ()
				{
					$scope.promise = api.employment_status.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.employment_status = r;
					}

				}

				function updateData(value,id)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else
				    {
				    	var data = {'status_type':value.status_type,'status_id':id};
				    	api.employment_status.update(data,success);
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

				$scope.$watch('vm.query.filter', function (newValue, oldValue) {
				    if(!oldValue) {
				      bookmark = vm.query.page;
				    }
				    
				    if(newValue !== oldValue) {
				      vm.query.page = 1;
				    }
				    
				    if(!newValue) {
				      vm.query.page = bookmark;
				    }
				    
				   getEmploymentStatus();
				 });
			}
})();