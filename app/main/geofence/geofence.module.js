(function () {
	'use strict';
		angular
			.module('app.geofence',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.geofence', {
		            url      : '/geofence',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/geofence/geofence.html',
		                    controller : 'GeofenceController as vm'
		                }
		            }
		        })
		        .state('app.geofence-maps', {
		            url      : '/geofence-maps/:file_name/:id',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/geofence/maps/maps.html',
		                    controller : 'MapsController as vm'
		                }
		            }
		        });

		        

		        
			}
})();