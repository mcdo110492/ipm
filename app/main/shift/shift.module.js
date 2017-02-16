(function () {
	'use strict';
		angular
			.module('app.shift',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.shift', {
		            url      : '/shift',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/shift/shift.html',
		                    controller : 'ShiftController as vm'
		                }
		            }
		        });

		      
		         

		       
			}
})();