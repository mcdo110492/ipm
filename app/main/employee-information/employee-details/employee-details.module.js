(function () {
	'use strict';
		angular
			.module('app.employee-details',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.employee-details', {
		            url      : '/employee-details/:id',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/employee-information/employee-details/employee-details.html',
		                    controller : 'EmployeeDetailsController as vm'
		                }
		            }
		        });

		      
			}

})();