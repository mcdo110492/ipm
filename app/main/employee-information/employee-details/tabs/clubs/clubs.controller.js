(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('ClubController',ClubController);


			/** @ngInject */

			function ClubController(api,toaster,PluginConfig,$stateParams)
			{
				var vm = this;

					vm.clubs = [];
					vm.getClubs = getClubs;
					vm.OpenAddDialog = OpenAddDialog;
					vm.openUpdate = openUpdate;
					vm.saveChanges = saveChanges;


					function getClubs()
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_club.get(datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.clubs = r.data;
							}

						}
					}


					function OpenAddDialog(ev)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/clubs/dialog/clubs-dialog.html';
					 	var localData = {'data':null,'employee_id':$stateParams.id};
					 	var ctrl = 'ClubDialogController';
					 	var ctrlAs = 'cdcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getClubs);
					}


					function openUpdate(ev,credentials)
					{
						var tmpUrl = 'app/main/employee-information/employee-details/tabs/clubs/dialog/clubs-dialog.html';
					 	var localData = {'data':credentials,'employee_id':$stateParams.id};
					 	var ctrl = 'ClubDialogController';
					 	var ctrlAs = 'cdcvm';
					 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getClubs);
					}

					function saveChanges (credentials)
					{
						api.employee_club.save(credentials,success);

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