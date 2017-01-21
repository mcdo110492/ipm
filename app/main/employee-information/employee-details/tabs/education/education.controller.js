(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('EducationController',EducationController);


			/** @ngInject */

			function EducationController(api,toaster,PluginConfig,$stateParams)
			{
				var vm = this;

					vm.educations = [];
					vm.getEducation = getEducation;
					vm.OpenAddDialog = OpenAddDialog;
					vm.openUpdate = openUpdate;
					vm.saveChanges = saveChanges;


					function getEducation(id)
					{
						vm.datastring = {'employee_id':$stateParams.id};
						api.employee_education.get(vm.datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.educations = r.data;
							}

						}
					}


					function OpenAddDialog(ev,emp_id)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/education/dialog/education-dialog.html';
					 	var localData = {'data':null,'employee_id':emp_id};
					 	var ctrl = 'EducationDialogController';
					 	var ctrlAs = 'ddcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEducation);
					}


					function openUpdate(ev,credentials,emp_id)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/education/dialog/education-dialog.html';
					 	var localData = {'data':credentials,'employee_id':emp_id};
					 	var ctrl = 'EducationDialogController';
					 	var ctrlAs = 'ddcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEducation);
					}

					function saveChanges (credentials)
					{
						api.employee_info.save(credentials,success);

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