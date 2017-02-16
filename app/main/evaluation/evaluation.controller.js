(function () {
	'use strict';
		angular
			.module('app.dispatch-evaluation')
			.controller('EvaluationController',EvaluationController);

			/** @ngInject */
			function EvaluationController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.evaluations = [];

				vm.getEvaluations = getEvaluations;
				vm.OpenAddDialog = OpenAddDialog;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'evaluation_code'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/evaluation/dialog/evaluation-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'EvaluationDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEvaluations);
				 }


			
				
				

				
				function getEvaluations ()
				{
					$scope.promise = api.dispatch_evaluation.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.evaluations = r;
					}

				}

				

				$scope.$watch('vm.query.filter', function (newValue, oldValue) {
				    if(!oldValue) {
				      bookmark = vm.query.page;
				    }
				    
				    if(newValue !== oldValue) {
				      vm.query.page = 1;
				    }
				    
				    if(!newValue) {
				      vm.query.page = bookmark;
				    }
				    
				   getEvaluations();
				 });
			}
})();