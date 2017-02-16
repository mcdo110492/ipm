(function () {
	'use strict';
		angular
			.module('app.geofence')
			.controller('GeofenceMapDialogController',GeofenceMapDialogController);

			/** @ngInject */
			function GeofenceMapDialogController (data,PluginConfig)
			{
				var vm = this;
				
					vm.routeCode = data.route_code;
					vm.route_file = data.route_file;
					vm.details = {
						brgy:data.brgy,
						location:data.location,
						sector:data.sector,
						route_file_name:data.route_file_name
					};
					vm.closeDialog = closeDialog;


					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}
})();