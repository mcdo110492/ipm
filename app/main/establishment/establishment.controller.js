(function () {
	'use strict';
		angular
			.module('app.establishment')
			.controller('EstablishmentController',EstablishmentController);

			/** @ngInject */
			function EstablishmentController($scope,api,toaster,PluginConfig,$filter)
			{
				var vm = this;
				var bookmark;
				
				vm.establishments = [];
				vm.getEstablishment = getEstablishment;
				vm.checkName  = checkName;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'type_est_name'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/establishment/dialog/establishment-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'EstablishmentDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEstablishment);
				 }


				 function save(data,id)
				 {
				 	var data = {'type_est_name':data.type_est_name,'type_est_id':id};
				 	api.establishment.update(data,success);
				 	function success(r)
				 	{
				 		if(r.stat == 200)
				 		{
				 			toaster.pop('success','Successfully Saved.');
				 		}
				 		else
				 		{
				 			toaster.pop('error','Something Went Wrong.');
				 		}
				 	}
				 }
				
				

				
				function getEstablishment ()
				{
					$scope.promise = api.establishment.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.establishments = r;
					}

				}

			

				function checkName(value)
				{
					if (value === '') {
				      
				      return 'This is required';
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
				    
				   getEstablishment();
				 });
			}
})();