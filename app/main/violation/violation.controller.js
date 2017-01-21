(function () {
	'use strict';
		angular
			.module('app.violation')
			.controller('ViolationController',ViolationController);

			/** @ngInject */
			function ViolationController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.violations = [];

				vm.getViolations = getViolations;
				vm.OpenAddDialog = OpenAddDialog;
				vm.updateData    = updateData;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'violation_type'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/violation/dialog/violation-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'ViolationDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getViolations);
				 }
				
			
				
				function getViolations ()
				{
					$scope.promise = api.violation.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.violations = r;
					}

				}

				function updateData(value,id)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else
				    {
				    	var data = {'violation_type':value.violation_type,'violation_id':id};
				    	api.violation.update(data,success);
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
				    
				   getViolations();
				 });
			}
})();