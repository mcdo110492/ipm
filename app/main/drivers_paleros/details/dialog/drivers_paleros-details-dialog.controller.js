(function () {
	'use strict';
		angular
			.module('app.drivers-paleros')
			.controller('DriversPalerosDetailsDialogController',DriversPalerosDetailsDialogController);

			/** @ngInject */
			function DriversPalerosDetailsDialogController (api,PluginConfig,toaster,$mdDialog,$stateParams)
			{
				var vm = this;

					

					
					vm.palerosPositions = [];
					vm.palerosEmployees = [];

					
					vm.closeDialog = closeDialog;

					vm.save 	   = save;

					vm.getPositions = getPositions;
					vm.getEmployees = getEmployees;
					
					

					function getPositions()
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
							
							vm.palerosPositions = r.data;
							
						}

					}


					function getEmployees(id)
					{
						var query = {position_id:id};
						api.position_employees.get(query,success);
						function success(r)
						{
							
							vm.palerosEmployees = r.data;
							
						}
					}

					

					function save (datastring)
					{
						var data = {driver_id:$stateParams.id,paleros:datastring.paleros};
						api.paleros.save(data,success);
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