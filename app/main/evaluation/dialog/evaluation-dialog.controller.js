(function () {
	'use strict';
		angular
			.module('app.dispatch-evaluation')
			.controller('EvaluationDialogController',EvaluationDialogController);

			/** @ngInject */
			function EvaluationDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						evaluation_code:'',
				
		
					};

					
					vm.equipments = [];
					vm.shifts = [];
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

					function save ()
					{
						
						api.dispatch_evaluation.save(vm.data,success);
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