(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('LicensesDialogController',LicensesDialogController);

			/** @ngInject */
			function LicensesDialogController($mdDialog,toaster,PluginConfig,api,data,employee_id)
			{
				var vm = this;
				var currentDate = new Date();
				
					vm.data = {
						license_no:'',
						license_type:'',
						date_issued:currentDate,
						date_expired:currentDate,
						employee_id:employee_id,
						employee_license_id:''
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					init();
					function init()
					{
						if(data != null)
						{

							vm.data = {
								license_no:data.license_no,
								license_type:data.license_type,
								date_issued:new Date(data.date_issued),
								date_expired:new Date(data.date_expired),
								employee_id:employee_id,
								employee_license_id:data.employee_license_id
							};

						}
						
					}
					

					function save ()
					{
						if(data == null)
						{
							api.employee_licenses.save(vm.data,success);
						}
						else
						{
							api.employee_licenses.update(vm.data,success);
						}
						
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