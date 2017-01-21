(function () {
	'use strict';
		angular
			.module('app.gadget')
			.controller('GadgetDialogController',GadgetDialogController);

			/** @ngInject */
			function GadgetDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						gadget_code:'',
						gadget_name:'',
						gadget_model:'',
						gadget_type:'',
						date_added:new Date()
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					

					function save ()
					{
						
						api.gadget.save(vm.data,success);
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