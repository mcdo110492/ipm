(function () {
	'use strict';
		angular
			.module('app.dispatching-details',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.dispatching-details', {
		            url      : '/dispatching-details/:id',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/dispatching/dispatching-details/dispatching-details.html',
		                    controller : 'DispatchingDetailsController as vm'
		                }
		            }
		        });

		      	
			}

})();