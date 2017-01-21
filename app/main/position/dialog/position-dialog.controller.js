(function () {
	'use strict';
		angular
			.module('app.position')
			.controller('PositionDialogController',PositionDialogController);

			/** @ngInject */
			function PositionDialogController($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						department_id:'',
						department_name:''
					};

					vm.departments = [];

					vm.closeDialog = closeDialog;
					vm.loadDepartments = loadDepartments;
					vm.save 	   = save;

					

					function save ()
					{
						api.position.save(vm.data,success);
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

					function loadDepartments ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'department_name'
						};

						return vm.departments.length ? null : api.department.get(query2,success);

						function success(r)
						{
							vm.departments = r.data;
						}
					}

					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}


			}
})();