(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('TrainingController',TrainingController);


			/** @ngInject */

			function TrainingController(api,toaster,PluginConfig,$stateParams)
			{
				var vm = this;

					vm.trainings = [];
					vm.getTrainings = getTrainings;
					vm.OpenAddDialog = OpenAddDialog;
					vm.openUpdate = openUpdate;
					vm.saveChanges = saveChanges;


					function getTrainings()
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_training.get(datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.trainings = r.data;
							}

						}
					}


					function OpenAddDialog(ev)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/trainings-seminars/dialog/trainings-seminars-dialog.html';
					 	var localData = {'data':null,'employee_id':$stateParams.id};
					 	var ctrl = 'TrainingDialogController';
					 	var ctrlAs = 'tdcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getTrainings);
					}


					function openUpdate(ev,credentials)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/trainings-seminars/dialog/trainings-seminars-dialog.html';
					 	var localData = {'data':credentials,'employee_id':$stateParams.id};
					 	var ctrl = 'TrainingDialogController';
					 	var ctrlAs = 'tdcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getTrainings);
					}

					function saveChanges (credentials)
					{
						api.employee_training.save(credentials,success);

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