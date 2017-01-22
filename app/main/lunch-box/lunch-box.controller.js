(function () {
	'use strict';
		angular
			.module('app.lunch-box')
			.controller('LunchBoxController',LunchBoxController);

			/** @ngInject */
			function LunchBoxController($scope,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.lunchboxes = [];

				vm.getLunchBoxes = getLunchBoxes;
				vm.OpenAddDialog = OpenAddDialog;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'lunch_box_code'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/lunch-box/dialog/lunch-box-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'LunchBoxDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getLunchBoxes);
				 }


			
				
				

				
				function getLunchBoxes ()
				{
					$scope.promise = api.lunchbox.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.lunchboxes = r;
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
				    
				   getLunchBoxes();
				 });
			}
})();