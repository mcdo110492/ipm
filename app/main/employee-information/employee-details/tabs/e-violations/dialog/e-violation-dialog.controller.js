(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('EViolationDialogController',EViolationDialogController);

			/** @ngInject */
			function EViolationDialogController($mdDialog,toaster,PluginConfig,api,data,employee_id)
			{
				var vm = this;

					vm.violations = [];
					
					vm.data = {
						violation_id:'',
						date_committed:'',
						remarks:'',
						employee_id:employee_id,
						employee_violation_id:''
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					getViolations();
					init();
					function init()
					{
						if(data != null)
						{

							vm.data = {
								violation_id:data.violation_id,
								date_committed:new Date(data.date_committed),
								remarks:data.remarks,
								employee_id:employee_id,
								employee_violation_id:data.employee_violation_id
							};

						}
						
					}

					function getViolations ()
					{
						var query = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'violation_type'
						};
						api.violation.get(query,success);
						
						

						function success(r){
							
							vm.violations = r.data;
							
						}

					}
					

					function save ()
					{
						if(data == null)
						{
							api.employee_violation.save(vm.data,success);
						}
						else
						{
							api.employee_violation.update(vm.data,success);
						}
						
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