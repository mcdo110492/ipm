(function () {
	'use strict';
		angular
			.module('app.complaint',[])
			.config(config);

			/** @ngInject */
			function config($stateProvider)
			{
				// State
		        $stateProvider.state('app.complaint', {
		            url      : '/complaint',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/complaint/complaint.html',
		                    controller : 'ComplaintController as vm'
		                }
		            }
		        })
		        .state('app.it-complaint', {
		            url      : '/it-complaint',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/complaint/it/it-complaint.html',
		                    controller : 'ITComplaintController as vm'
		                }
		            }
		        })
		        .state('app.dispatch-complaint', {
		            url      : '/dispatch-complaint',
		            views    : {
		                'content@app': {
		                    templateUrl: 'app/main/complaint/dispatch/dispatch-complaint.html',
		                    controller : 'DispatchComplaintController as vm'
		                }
		            }
		        });

		        

		    

		         	
		     }
})();