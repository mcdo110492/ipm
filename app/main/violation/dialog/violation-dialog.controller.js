(function () {
	'use strict';
		angular
			.module('app.violation')
			.controller('ViolationDialogController',ViolationDialogController);

			/** @ngInject */
			function ViolationDialogController (api,PluginConfig,toaster,$mdDialog)
			{
				var vm = this;

					vm.data = {
						violation_id:'',
						violation_type:''
					};

					vm.closeDialog = closeDialog;

					vm.save 	   = save;


					function save ()
					{
						api.violation.save(vm.data,success);
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