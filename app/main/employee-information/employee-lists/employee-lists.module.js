(function () {
	'use strict';
		angular
			.module('app.employee-lists',[])
			.config(config);

			/** @ngInject */
			function config ($stateProvider)
			{
				// State
		        $stateProvider.state('app.employee-lists', {
		            url      : '/employee-lists',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/employee-information/employee-lists/employee-lists.html',
		                    controller : 'EmployeeListsController as vm'
		                }
		            }
		        });

		         
			}
})();