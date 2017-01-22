(function () {
	'use strict';
		angular
			.module('app.lunch-box',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.lunch-box', {
		            url      : '/lunch-box',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/lunch-box/lunch-box.html',
		                    controller : 'LunchBoxController as vm'
		                }
		            }
		        })
		        .state('app.lunch-box-details', {
		            url      : '/lunch-box-details/:id/:lunchboxName',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/lunch-box/details/lunch-box-details.html',
		                    controller : 'LunchBoxDetailsController as vm'
		                }
		            }
		        })

		        

                   
		        
			}
})();