(function () {
	'use strict';
		angular
			.module('app.item')
			.controller('ItemDialogController',ItemDialogController);

			/** @ngInject */
			function ItemDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						item_code:'',
						item_name:'',
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					

					function save ()
					{
						
						api.item.save(vm.data,success);
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