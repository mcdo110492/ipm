(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('DispatchComplaintDetailsDialogController',DispatchComplaintDetailsDialogController);

			/** @ngInject */
			function DispatchComplaintDetailsDialogController (data,PluginConfig)
			{
				var vm = this;
				
					vm.details = {
						trip_ticket_code:data.trip_ticket_code,
						dispatch_date:data.dispatch_date,
						dispatch_time:data.dispatch_time,
						shift:data.shift
					};
					vm.closeDialog = closeDialog;


					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}
})();