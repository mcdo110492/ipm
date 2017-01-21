(function () {
	'use strict';
		angular
			.module('app.position',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.position', {
		            url      : '/position',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/position/position.html',
		                    controller : 'PositionController as vm'
		                }
		            }
		        });

		      

		         

			}
})();