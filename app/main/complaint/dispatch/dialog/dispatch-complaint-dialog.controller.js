(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('DispatchComplaintDialogController',DispatchComplaintDialogController);

			/** @ngInject */
			function DispatchComplaintDialogController ($mdDialog,toaster,PluginConfig,api,data,$q)
			{
				var vm = this;
					vm.trip_tickets = '';
					vm.data = {
						details:data.details,
						location:data.location,
						complaint_no:data.complaint_no,
						complaint_dispatcher_id:data.complaint_dispatcher_id,
						dispatcher_status:data.dispatcher_status,
						trip_ticket_id:data.trip_ticket_id,
						dispatcher_remarks:data.dispatcher_remarks
						
					};

					vm.routes = [];
					vm.searchTripTickets = data.trip_ticket_code;

					vm.closeDialog = closeDialog;
					vm.save 	   = save;
					vm.querySearchTripTickets = querySearchTripTickets;
					vm.selectTripTicket  	 = selectTripTicket;

					

					

					function save ()
					{
						api.complaint_dispatch.update(vm.data,success);
						
						
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

					function querySearchTripTickets(searchText)
					{
						var deferred = $q.defer();
						var query = {
							order:'order',
							limit: 20,
							page: 1,
							filter:searchText,
							field:'trip_ticket_code'
						};
						 api.dispatching.get(query,success);


						function success(r){
							
							deferred.resolve(r.data);
						}

						return deferred.promise;
					}

					function selectTripTicket(trip)
					{
						if(trip!=undefined)
						{
							vm.data.trip_ticket_id = trip.trip_ticket_id;
						}
						
					}

					
					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}

					
			}

})();