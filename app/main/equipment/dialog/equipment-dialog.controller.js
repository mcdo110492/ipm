(function () {
	'use strict';
		angular
			.module('app.equipment')
			.controller('EquipmentDialogController',EquipmentDialogController);

			/** @ngInject */
			function EquipmentDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						equipment_code:'',
						equipment_name:'',
						equipment_model:'',
						equipment_capacity:'',
		
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					

					function save ()
					{
						
						api.equipment.save(vm.data,success);
						function success(r)
						{
							if(r.stat == 200)
							{	
								$mdDialog.hide();
								toaster.pop('success','Successfully Saved.');

							}
							else
							{
								toaster.pop('error','Error','Something went wrong.');
							}
						}
					}

					

					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}
})();