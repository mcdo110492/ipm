(function () {
	'use strict';
		angular
			.module('app.drivers-paleros')
			.controller('DriversPalerosDialogController',DriversPalerosDialogController);

			/** @ngInject */
			function DriversPalerosDialogController (api,PluginConfig,toaster,$mdDialog,data)
			{
				var vm = this;

					

					vm.driverPositions = [];
					vm.palerosPositions = [];
					vm.driverEmployees = [];
					vm.palerosEmployees = [];

					
					vm.closeDialog = closeDialog;

					vm.save 	   = save;

					vm.getPositions = getPositions;
					vm.getEmployees = getEmployees;
					
					

					function getPositions(type)
					{
						var query = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'position_name'
						};

						api.position.get(query,success);
						function success (r)
						{
							if(type==1)
							{
								vm.driverPositions = r.data;
							}
							else
							{
								vm.palerosPositions = r.data;
							}
						}

					}


					function getEmployees(type,id)
					{
						var query = {position_id:id};
						api.position_employees.get(query,success);
						function success(r)
						{
							if(type==1)
							{
								vm.driverEmployees = r.data;
							}
							else
							{
								vm.palerosEmployees = r.data;
							}
						}
					}

					

					function save (datastring)
					{
						api.drivers_paleros.save(datastring,success);
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