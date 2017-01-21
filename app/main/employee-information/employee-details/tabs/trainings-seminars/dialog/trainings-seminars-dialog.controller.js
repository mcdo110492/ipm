(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('TrainingDialogController',TrainingDialogController);

			/** @ngInject */
			function TrainingDialogController($mdDialog,toaster,PluginConfig,api,data,employee_id)
			{
				var vm = this;

				
					vm.data = {
						training_title:'',
						training_nature:'',
						training_period:'',
						employee_id:employee_id,
						employee_trainings_id:''
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					init();
					function init()
					{
						if(data != null)
						{

							vm.data = {
								training_title:data.training_title,
								training_nature:data.training_nature,
								training_period:data.training_period,
								employee_id:employee_id,
								employee_trainings_id:data.employee_trainings_id
							};

		
						}
						
					}
					

					function save ()
					{
						if(data == null)
						{
							api.employee_training.save(vm.data,success);
						}
						else
						{
							api.employee_training.update(vm.data,success);
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