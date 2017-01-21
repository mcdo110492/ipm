(function () {
	'use strict';
		angular
			.module('app.department')
			.controller('DepartmentDialogController',DepartmentDialogController);

			/** @ngInject */
			function DepartmentDialogController (api,PluginConfig,toaster,$mdDialog)
			{
				var vm = this;

					vm.data = {
						department_id:'',
						department_name:''
					};

					vm.closeDialog = closeDialog;

					vm.save 	   = save;


					function save ()
					{
						api.department.save(vm.data,success);
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