(function () {
	'use strict';
		angular
			.module('app.dispatch-evaluation',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.dispatch-evaluation', {
		            url      : '/evaluation',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/evaluation/evaluation.html',
		                    controller : 'EvaluationController as vm'
		                }
		            }
		        })
		       
		        

                   
		        
			}
})();