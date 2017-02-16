(function () {
	'use strict';
		angular
			.module('app.driver-equipment',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.driver-equipment', {
		            url      : '/driver-equipment',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/driver-equipment/driver-equipment.html',
		                    controller : 'DriverEquipmentController as vm'
		                }
		            }
		        });

		      
		      

		   
			}
})();