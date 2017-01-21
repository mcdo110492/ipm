(function () {
	'use strict';
		angular
			.module('app.dispatching')
			.controller('DispatchingDialogController',DispatchingDialogController);

			/** @ngInject */
			function DispatchingDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						trip_ticket_code:'',
						dispatch_time:'',
						dispatch_date:new Date(),
						shift:'',
						item_id:'',
						equipment_id:'',
						gadget_id:'',
						geofence_id:'',
						driver:'',
						garbage_collectors:'',
						dispatcher:'',
						
					};

					
					vm.items = [];
					vm.equipments = [];
					vm.gadgets = [];
					vm.geofences = [];
					vm.employees = [];
					vm.closeDialog = closeDialog;
					
					vm.save 	   = save;

					loadItems();
					function loadItems ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'item_id'
						};

						api.item.get(query2,success);

						function success(r)
						{
							vm.items = r.data;
						}
					}

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
					loadGadgets();
					function loadGadgets ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'gadget_id'
						};

						api.gadget.get(query2,success);

						function success(r)
						{
							vm.gadgets = r.data;
						}
					}

					loadGeofences();
					function loadGeofences ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'geofence_id'
						};

						api.geofence.get(query2,success);

						function success(r)
						{
							vm.geofences = r.data;
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
						
						api.dispatching.save(vm.data,success);
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