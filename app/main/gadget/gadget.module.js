(function () {
	'use strict';
		angular
			.module('app.gadget',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.gadget', {
		            url      : '/gadget',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/gadget/gadget.html',
		                    controller : 'GadgetController as vm'
		                }
		            }
		        });


		         
			}
})();