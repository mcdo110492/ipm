(function () {
	'use strict';
		angular
			.module('app.dispatching',['app.dispatching-details'])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.dispatching', {
		            url      : '/dispatching',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/dispatching/dispatching.html',
		                    controller : 'DispatchingController as vm'
		                }
		            }
		        });

		        $stateProvider.state('app.dispatching-pdf', {
		            url      : '/dispatching-ticket/:id',
		            views    : {
		            	'main@': {
		                    templateUrl: 'app/core/layouts/content-only.html',
		                    controller : 'MainController as vm'
	                	},
		                'content@app.dispatching-pdf': {
		                    templateUrl: 'app/main/dispatching/print/dispatching-print.html',
		                    controller : 'DispatchingPrintController as pvm'
		                }
		                
		            },
		            resolve:{ /* @ngInject */
		            	RoutesResolver:function(){
		            		
		            	}
		            }
		        });
		      
		       
		        
		  
			}
})();