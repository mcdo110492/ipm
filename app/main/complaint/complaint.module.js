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
		        });

		        

		    

		         	
		     }
})();