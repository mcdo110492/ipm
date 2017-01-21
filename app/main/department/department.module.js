(function () {
	'use strict';
		angular
			.module('app.department',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.project', {
		            url      : '/project',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/department/department.html',
		                    controller : 'DepartmentController as vm'
		                }
		            }
		        });

		        

                   
		        
			}
})();