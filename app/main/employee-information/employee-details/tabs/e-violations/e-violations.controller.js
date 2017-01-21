(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('EViolationController',EViolationController);


			/** @ngInject */

			function EViolationController(api,toaster,PluginConfig,$stateParams)
			{
				var vm = this;

					vm.violations = [];
					vm.getViolation = getViolation;
					vm.OpenAddDialog = OpenAddDialog;
					vm.openUpload = openUpload;
					vm.openUpdate = openUpdate;
					vm.saveChanges = saveChanges;


					function getViolation(id)
					{
						vm.datastring = {'employee_id':$stateParams.id};
						api.employee_violation.get(vm.datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.violations = r.data;
							}

						}
					}


					function OpenAddDialog(ev)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/e-violations/dialog/e-violation-dialog.html';
					 	var localData = {'data':null,'employee_id':$stateParams.id};
					 	var ctrl = 'EViolationDialogController';
					 	var ctrlAs = 'vdcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getViolation);
					}


					function openUpdate(ev,credentials)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/e-violations/dialog/e-violation-dialog.html';
					 	var localData = {'data':credentials,'employee_id':$stateParams.id};
					 	var ctrl = 'EViolationDialogController';
					 	var ctrlAs = 'vdcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getViolation);
					}

					function openUpload(ev,credentials)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/e-violations/nte/nte-dialog.html';
					 	var localData = {'data':credentials,'employee_id':$stateParams.id};
					 	var ctrl = 'NteDialogController';
					 	var ctrlAs = 'ntecvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getViolation);
					}

					function saveChanges (credentials)
					{
						api.employee_violation.save(credentials,success);

						function success(r)
						{
							if(r.stat == 200)
							{
								toaster.pop('success','Changes has been saved.');
							}
							else
							{
								toaster.pop('error','Something went wrong.');
							}
						}
					}
			}
})();