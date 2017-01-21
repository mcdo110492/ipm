(function () {
	'use strict';
		angular
			.module('app.violation',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.violation', {
		            url      : '/violation',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/violation/violation.html',
		                    controller : 'ViolationController as vm'
		                }
		            }
		        });

	

		         

		    
			}
})();