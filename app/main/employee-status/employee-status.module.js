(function () {
	'use strict';
		angular
			.module('app.employee-status',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.employee-status', {
		            url      : '/employee-status',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/employee-status/employee-status.html',
		                    controller : 'EmployeeStatusController as vm'
		                }
		            }
		        });

		      

		         

	
			}
})();