(function () {
	'use strict';
		angular
			.module('app.geofence')
			.controller('MapsController',MapsController);

			/** @ngInject */
			function MapsController ($stateParams,NgMap)
			{
				var vm = this;
					vm.file_name = $stateParams.file_name;
					vm.geofence_id = $stateParams.id;
			}
})();