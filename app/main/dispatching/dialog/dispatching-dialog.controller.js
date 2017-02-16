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
						shift_id:'',
						lunch_box_id:'',
						equipment_id:'',
						geofence_id:'',
						employee_id:'',
					
						
					};

					
		
					vm.equipments = [];
					vm.gadgets = [];
					vm.geofences = [];
					vm.employees = [];
					vm.shifts = [];
					vm.closeDialog = closeDialog;
					
					vm.save 	   = save;

					
					loadShifts();
					function loadShifts ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'shift_id'
						};

						api.shift.get(query2,success);

						function success(r)
						{
							vm.shifts = r.data;
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

					loadLunchboxes();
					function loadLunchboxes ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'lunch_box_id'
						};

						api.lunchbox.get(query2,success);

						function success(r)
						{
							vm.lunchboxes = r.data;
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