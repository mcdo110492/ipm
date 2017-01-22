(function () {
	'use strict';
		angular
			.module('app.lunch-box')
			.controller('LunchBoxDetailsController',LunchBoxDetailsController);

			/** @ngInject */
			function LunchBoxDetailsController($stateParams,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.gadgets = [];
				vm.lunchboxName = $stateParams.lunchboxName;
				vm.getGadgets = getGadgets;
				vm.OpenAddDialog = OpenAddDialog;
				vm.update 		= update;
				

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/lunch-box/details/dialog/lunch-box-details-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'LunchBoxDetailsDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGadgets);
				 }


				 function update (ev,data)
				 {
				 	var tmpUrl = 'app/main/lunch-box/details/dialog/lunch-box-details-dialog.html';
				 	var localData = {'data':data};
				 	var ctrl = 'LunchBoxDetailsDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getGadgets);
				 }
				
				

				getGadgets();
				function getGadgets ()
				{
					var query = {
						lunch_box_id:$stateParams.id
					};
					api.lunchbox_gadgets.get(query,success);
					
					

					function success(r){
						
						vm.gadgets = r.data;
					}

				}

				

				
			}
})();