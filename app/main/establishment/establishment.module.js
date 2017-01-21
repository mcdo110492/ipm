(function () {
	'use strict';
		angular
			.module('app.establishment',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.establishment', {
		            url      : '/establisment',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/establishment/establishment.html',
		                    controller : 'EstablishmentController as vm'
		                }
		            }
		        });

		       

		         

		       
		         
			}
})();	