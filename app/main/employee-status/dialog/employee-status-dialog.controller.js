(function () {
	'use strict';
		angular
			.module('app.employee-status')
			.controller('EmployeeStatusDialogController',EmployeeStatusDialogController);

			/** @ngInject */
			function EmployeeStatusDialogController (api,PluginConfig,toaster,$mdDialog)
			{
				var vm = this;

					vm.data = {
						employee_status_type_id:'',
						type:''
					};

					vm.closeDialog = closeDialog;

					vm.save 	   = save;


					function save ()
					{
						api.employee_status.save(vm.data,success);
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