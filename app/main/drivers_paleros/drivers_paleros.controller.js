(function () {
	'use strict';
		angular
			.module('app.drivers-paleros')
			.controller('DriversPalerosController',DriversPalerosController);

			/** @ngInject */
			function DriversPalerosController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.drivers = [];

				vm.getDrivers = getDrivers;
				vm.OpenAddDialog = OpenAddDialog;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'employee_no'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/drivers_paleros/dialog/drivers_paleros-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'DriversPalerosDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getDrivers);
				 }


			
				
				

				
				function getDrivers ()
				{
					$scope.promise = api.drivers_paleros.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.drivers = r;
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
				    
				   getDrivers();
				 });
			}
})();