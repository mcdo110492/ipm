(function () {
	'use strict';
		angular
			.module('app.drivers-paleros')
			.controller('DriversPalerosDetailsController',DriversPalerosDetailsController);

			/** @ngInject */
			function DriversPalerosDetailsController($stateParams,api,toaster,PluginConfig)
			{
				var vm = this;
				var bookmark;
				
				vm.paleros = [];
				vm.data = {
					employee_no:$stateParams.empNo,
					employee_name:$stateParams.empName
				};
				vm.OpenAddDialog = OpenAddDialog;
				vm.getPaleros = getPaleros;
				vm.changeStatus = changeStatus;
				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/drivers_paleros/details/dialog/drivers_paleros-details-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'DriversPalerosDetailsDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getPaleros);
				 }


				getPaleros();
				 function getPaleros()
				 {
				 	var query = {driver_id:$stateParams.id};
				 	api.paleros.get(query,success);
				 	function success(r)
				 	{
				 		vm.paleros = r.data;
				 	}
				 }


				 function changeStatus(id,status)
				 {
				 	var datastring = {driver_paleros_id:id,paleros_status:status};
				 	api.paleros.update(datastring,success);
				 	function success(r)
				 	{
				 		if(r.stat == 200)
				 		{
				 			toaster.pop('success','Status Changed.');
				 			getPaleros();
				 		}
				 		else
				 		{
				 			toaster.pop('success','Server Error.');
				 		}
				 	}
				 }
				
				

				
			}
})();