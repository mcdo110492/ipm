(function () {
	'use strict';
		angular
			.module('app.driver-equipment')
			.controller('DriverEquipmentDialogController',DriverEquipmentDialogController);

			/** @ngInject */
			function DriverEquipmentDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						equipment_id:'',
						employee_id:'',
					
					};

					
					vm.equipments = [];
					vm.employees = [];
					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					
					loadEquipments();
					function loadEquipments ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'equipment_id'
						};

						api.equipment.get(query2,success);

						function success(r)
						{
							vm.equipments = r.data;
						}
					}

					
					loadEmployees();
					function loadEmployees ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'employee_id'
						};

						api.employee.get(query2,success);

						function success(r)
						{
							vm.employees = r.data;
						}
					}
					function save ()
					{
						
						api.driver_equipment.save(vm.data,success);
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