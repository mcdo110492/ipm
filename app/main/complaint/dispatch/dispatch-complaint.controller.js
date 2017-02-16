(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('DispatchComplaintController',DispatchComplaintController);

			/** @ngInject */
			function DispatchComplaintController ($scope,api,toaster,PluginConfig,$filter)
			{
				var vm = this;
				var bookmark;

				
				vm.role_type = true;
				vm.complaints = [];
				vm.getComplaints = getComplaints;
				vm.OpenUpdateDialog = OpenUpdateDialog;
				vm.OpenDetails = OpenDetails;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'complaint_date'
				};

				init();
				function init()
				{
					var role = localStorage.user_type;
					if(role==7 || role == 1)
					{
						vm.role_type = false;
					}

				}
				
				 
				 

				 function OpenUpdateDialog (ev,dataarray)
				 {
				 	var tmpUrl = 'app/main/complaint/dispatch/dialog/dispatch-complaint-dialog.html';
				 	var localData = {'data':dataarray};
				 	var ctrl = 'DispatchComplaintDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getComplaints);
				 }

				 function OpenDetails(ev,data)
				 {
				 	var tmpUrl = 'app/main/complaint/dispatch/dialog/dispatch-complaint-dialog-details.html';
					var ctrl = 'DispatchComplaintDetailsDialogController';
					var ctrlAs = 'dcvm';
				 	
				 	var localData = {'data':data};
				 	
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGeofence);
				 }
				
				

				
				function getComplaints ()
				{
					$scope.promise = api.complaint_dispatch.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.complaints = r;
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
				    
				   getComplaints();
				 });
				
			}
})();