(function () {
	'use strict';
		angular
			.module('app.employment-status')
			.controller('EmploymentStatusDialogController',EmploymentStatusDialogController);

			/** @ngInject */
			function EmploymentStatusDialogController (api,PluginConfig,toaster,$mdDialog)
			{
				var vm = this;

					vm.data = {
						status_id:'',
						status_type:''
					};

					vm.closeDialog = closeDialog;

					vm.save 	   = save;


					function save ()
					{
						api.employment_status.save(vm.data,success);
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