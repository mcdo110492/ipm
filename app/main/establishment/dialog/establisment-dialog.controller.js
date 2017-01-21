(function () {
	'use strict';
		angular
			.module('app.establishment')
			.controller('EstablishmentDialogController',EstablishmentDialogController);

			/** @ngInject */
			function EstablishmentDialogController($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						type_est_name:''
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					

					function save ()
					{
						api.establishment.save(vm.data,success);
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