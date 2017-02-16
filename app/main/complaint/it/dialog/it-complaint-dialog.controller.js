(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('ITComplaintDialogController',ITComplaintDialogController);

			/** @ngInject */
			function ITComplaintDialogController ($mdDialog,toaster,PluginConfig,api,data,$q)
			{
				var vm = this;
					vm.geofences = '';
					vm.data = {
						details:data.details,
						location:data.location,
						complaint_no:data.complaint_no,
						complaint_it_id:data.complaint_it_id,
						it_status:data.it_status,
						geofence_id:data.geofence_id,
						it_remarks:data.it_remarks
						
					};

					vm.routes = [];
					vm.searchRoutes = data.route_code;

					vm.closeDialog = closeDialog;
					vm.save 	   = save;
					vm.querySearchRoutes = querySearchRoutes;
					vm.selectGeofence  	 = selectGeofence;

					

					

					function save ()
					{
						api.complaint_it.update(vm.data,success);
						
						
						function success(r)
						{
							if(r.stat == 200)
							{	
								$mdDialog.hide();
								toaster.pop('success','Successfully Saved.');

							}
							else
							{
								toaster.pop('error','Error','Something went wrong.');
							}
						}
					}

					function querySearchRoutes(searchText)
					{
						var deferred = $q.defer();
						var query = {
							order:'order',
							limit: 20,
							page: 1,
							filter:searchText,
							field:'route_code'
						};
						 api.geofence.get(query,success);


						function success(r){
							
							deferred.resolve(r.data);
						}

						return deferred.promise;
					}

					function selectGeofence(route)
					{
						if(route!=undefined)
						{
							vm.data.geofence_id = route.geofence_id;
						}
						
					}

					
					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}

					
			}

})();