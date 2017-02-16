(function () {
	'use strict';
		angular
			.module('app.drivers-paleros',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.drivers-paleros', {
		            url      : '/drivers-paleros',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/drivers_paleros/drivers_paleros.html',
		                    controller : 'DriversPalerosController as vm'
		                }
		            }
		        })
		        .state('app.drivers_paleros-details', {
		            url      : '/drivers_paleros-details/:id/:empNo/:empName',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/drivers_paleros/details/drivers_paleros-details.html',
		                    controller : 'DriversPalerosDetailsController as vm'
		                }
		            }
		        })

		        

                   
		        
			}
})();