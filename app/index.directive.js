(function () {
	'use strict';

		angular
			.module('fuse')
			.directive('uniqueData',uniqueData);

			/** @ngInject */
			function uniqueData (api,$q)
			{
				return {
				    restrict: 'A',
				    replace:true,
				    scope:{
				    	fieldName: '@',
				    	tableName: '@'
				    },
				    require: 'ngModel',
				    link: function(scope, element, attrs, ngModel) {
				      ngModel.$asyncValidators.unique = validation;


				  		function validation ()
				  		{
				  			var d = $q.defer();
						    api.main.save({'field':scope.fieldName,'table':scope.tableName,'value':ngModel.$viewValue},success);
						    function success (res) {
						      res = res || {};
						      if(res.stat == 200) { 
						        d.resolve();
						      } else { 
						        d.reject();
						      }
						    }

						    return d.promise;
				  		}
				    }
				  };
			}
})();