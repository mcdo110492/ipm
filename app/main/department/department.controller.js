(function () {
	'use strict';
		angular
			.module('app.department')
			.controller('DepartmentController',DepartmentController);

			/** @ngInject */
			function DepartmentController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.departments = [];

				vm.getDepartments = getDepartments;
				vm.OpenAddDialog = OpenAddDialog;
				vm.updateData    = updateData;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'department_name'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/department/dialog/department-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'DepartmentDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getDepartments);
				 }
				
				

				
				function getDepartments ()
				{
					$scope.promise = api.department.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.departments = r;
					}

				}

				function updateData(value,id)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else
				    {
				    	var data = {'department_name':value.department_name,'department_id':id};
				    	api.department.update(data,success);
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
				    
				   getDepartments();
				 });
			}
})();