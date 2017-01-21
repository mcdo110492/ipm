(function () {
	'use strict';
		angular
			.module('app.employment-status',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.employment-status', {
		            url      : '/employment-status',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/employment-status/employment-status.html',
		                    controller : 'EmploymentStatusController as vm'
		                }
		            }
		        });

		      

		         

	
			}
})();