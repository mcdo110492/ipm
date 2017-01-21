(function () {
	'use strict';
		angular
			.module('app.dispatching')
			.controller('DispatchingController',DispatchingController);

			/** @ngInject */
			function DispatchingController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.dispatching = [];

				vm.getDispatchings = getDispatchings;
				vm.OpenAddDialog = OpenAddDialog;
				vm.updateData    = updateData;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'trip_ticket_code'
				};

				vm.goToPrint	= goToPrint;
				vm.openMenu 	= openMenu;
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/dispatching/dialog/dispatching-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'DispatchingDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getDispatchings);
				 }
				
				

				
				function getDispatchings ()
				{
					$scope.promise = api.dispatching.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.dispatchings = r;
					}

				}

				function updateData(value,id)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else
				    {
				    	var data = {'trip_ticket_code':value,'trip_ticket_id':id};
				    	api.dispatching.update(data,success);
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

				
					 function goToPrint (id)
					 {
					 	
					 	window.open('dispatching-ticket/'+id,'_blank');
					 }


					 function openMenu($mdOpenMenu,ev)
					 {
					 		$mdOpenMenu(ev);
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
				    
				   getDispatchings();
				 });



				
			}
})();