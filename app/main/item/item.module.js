(function () {
	'use strict';
		angular
			.module('app.item',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.item', {
		            url      : '/item',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/item/item.html',
		                    controller : 'ItemController as vm'
		                }
		            }
		        });

		      
		         

		       
			}
})();