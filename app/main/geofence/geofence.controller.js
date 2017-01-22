(function () {
	'use strict';
		angular
			.module('app.geofence')
			.controller('GeofenceController',GeofenceController);

			/** @ngInject */
			function GeofenceController ($scope,api,toaster,PluginConfig,$filter)
			{
				var vm = this;
				var bookmark;
				
				vm.geofences = [];
				vm.getGeofence = getGeofence;
				vm.OpenAddDialog = OpenAddDialog;
				vm.openUpdate    = openUpdate;
				vm.changeStatus = changeStatus;
				vm.changeRoute = changeRoute;
				vm.OpenMap   = OpenMap;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'status'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/geofence/dialog/geofence-dialog.html';
					var ctrl = 'GeofenceDialogController';
					var ctrlAs = 'ddcvm';
				 	
				 	var localData = {'data':null};
				 	
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGeofence);
				 }


				 function openUpdate (geofence,ev)
				 {
				 	var tmpUrl = 'app/main/geofence/dialog/geofence_dialog2.html';
					var ctrl = 'GeofenceDialogController';
					var ctrlAs = 'ddcvm';
				 	var localData = {'data':geofence};
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGeofence);
				 }


				 function OpenMap (ev,data)
				 {
				 	var tmpUrl = 'app/main/geofence/maps-dialog/maps-dialog.html';
					var ctrl = 'GeofenceMapDialogController';
					var ctrlAs = 'dcvm';
				 	
				 	var localData = {'data':data};
				 	
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGeofence);
				 }

				
				
				

				
				function getGeofence ()
				{
					$scope.promise = api.geofence.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.geofences = r;
					}

				}

				function changeStatus(id,status)
				{
					var datastring = {geofence_id:id,status_type:status};
					api.geofence_change_status.save(datastring,success);

					function success (r)
					{
						if(r.status === 200)
						{
							getGeofence();
							toaster.pop('success','Status Changed.');
						}
					}
				}


				function changeRoute(id,ev)
				{
					var tmpUrl = 'app/main/geofence/dialog/change_route.html';
					var ctrl = 'ChangeRputeController';
					var ctrlAs = 'ddcvm';
				 	var localData = {'id':id};
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGeofence);
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
				    
				   getGeofence();
				 });
			}
})();