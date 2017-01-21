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
						shift:'',
						item_name:'',
						equipment_id:'',
						gadget_id:'',
						geofence_id:'',
						driver:'',
						garbage_collectors:'',
						dispatcher:'',
					};

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
								shift:r.data[0].shift,
								dispatch_date: new Date(r.data[0].dispatch_date),
								dispatch_time:r.data[0].dispatch_time,
								item_name:r.data[0].item_name,
								equipment_id:r.data[0].equipment_id,
								gadget_id:r.data[0].gadget_id,
								geofence_id:r.data[0].geofence_id,
								driver:r.data[0].driver,
								garbage_collectors:r.data[0].garbage_collectors,
								dispatcher:r.data[0].dispatcher
							};
						}
					}
				}
				
				
			}
})();