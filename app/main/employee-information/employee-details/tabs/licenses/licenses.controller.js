(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('LicensesController',LicensesController);


			/** @ngInject */

			function LicensesController(api,toaster,PluginConfig,$stateParams)
			{
				var vm = this;

					vm.licenses = [];
					vm.getLicenses = getLicenses;
					vm.OpenAddDialog = OpenAddDialog;
					vm.openUpdate = openUpdate;


					function getLicenses(id)
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_licenses.get(datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.licenses = r.data;
							}

						}
					}


					function OpenAddDialog(ev,emp_id)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/licenses/dialog/licenses-dialog.html';
					 	var localData = {'data':null,'employee_id':emp_id};
					 	var ctrl = 'LicensesDialogController';
					 	var ctrlAs = 'ddcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getLicenses);
					}


					function openUpdate(ev,credentials,emp_id)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/licenses/dialog/licenses-dialog.html';
					 	var localData = {'data':credentials,'employee_id':emp_id};
					 	var ctrl = 'LicensesDialogController';
					 	var ctrlAs = 'ddcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getLicenses);
					}

					
			}
})();