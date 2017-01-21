(function () {
	'use strict';
		angular
			.module('app.equipment',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.equipment', {
		            url      : '/equipment',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/equipment/equipment.html',
		                    controller : 'EquipmentController as vm'
		                }
		            }
		        });

		      
		      

		   
			}
})();