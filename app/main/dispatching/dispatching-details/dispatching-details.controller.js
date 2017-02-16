(function () {
	'use  strict';
		angular
			.module('app.dispatching-details')
			.controller('DispatchingDetailsController',DispatchingDetailsController);


			/** @ngInject */

			function DispatchingDetailsController($stateParams,api)
			{
				var vm = this;
					vm.info = {
						trip_ticket_id:$stateParams.id,
						trip_ticket_code:'',
						dispatch_time:'',
						dispatch_date:new Date(),
						shift_id:'',
						lunch_box_id:'',
						equipment_id:'',
						employee_id:'',
						geofence_id:'',
					
					};
					vm.equipments = [];
					vm.gadgets = [];
					vm.geofences = [];
					vm.employees = [];
					vm.shifts = [];

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

				getDispatchingInfo();
				function getDispatchingInfo()
				{
					var datastring = {'trip_ticket_id':$stateParams.id};
					api.dispatching_info.get(datastring,success);

					function success(r)
					{
						if(r.stat == 200)
						{
							vm.info = {
								trip_ticket_id:$stateParams.id,
								trip_ticket_code:r.data[0].trip_ticket_code,
								dispatch_time:r.data[0].dispatch_time,
								dispatch_date:r.data[0].dispatch_date,
								shift_name:r.data[0].shift_name,
								equipment_name:r.data[0].equipment_name,
								lunch_box_code:r.data[0].lunch_box_code,
								brgy:r.data[0].brgy,
								location:r.data[0].location,
								employee_no:r.data[0].employee_no,
								firstname:r.data[0].firstname,
								lastname:r.data[0].lastname,


							};
						}
					}
				}
				
				
			}
})();