(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('ComplaintController',ComplaintController);

			/** @ngInject */
			function ComplaintController ($scope,api,toaster,PluginConfig,$filter)
			{
				var vm = this;
				var bookmark;

				
				vm.role_type = true;
				vm.complaints = [];
				vm.getComplaints = getComplaints;
				vm.OpenAddDialog = OpenAddDialog;
				vm.OpenUpdateDialog = OpenUpdateDialog;
				vm.OpenMap 			= OpenMap;
				vm.OpenDetails 		= OpenDetails;
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
				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/complaint/dialog/complaint-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'ComplaintDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getComplaints);
				 }

				 function OpenUpdateDialog (ev,dataarray)
				 {
				 	var tmpUrl = 'app/main/complaint/dialog/complaint-dialog.html';
				 	var localData = {'data':dataarray};
				 	var ctrl = 'ComplaintDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getComplaints);
				 }

				function OpenMap (ev,data)
				 {
				 	var tmpUrl = 'app/main/geofence/maps-dialog/maps-dialog.html';
					var ctrl = 'GeofenceMapDialogController';
					var ctrlAs = 'dcvm';
				 	
				 	var localData = {'data':data};
				 	
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGeofence);
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
					$scope.promise = api.complaint.get(vm.query,success).$promise;
					
					

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