(function () {
	'use strict';
		angular
			.module('app.shift')
			.controller('ShiftDialogController',ShiftDialogController);

			/** @ngInject */
			function ShiftDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
					
						shift_name:'',
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					

					function save ()
					{
						
						api.shift.save(vm.data,success);
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