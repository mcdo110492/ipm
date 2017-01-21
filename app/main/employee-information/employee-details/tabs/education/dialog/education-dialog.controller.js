(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('EducationDialogController',EducationDialogController);

			/** @ngInject */
			function EducationDialogController($mdDialog,toaster,PluginConfig,api,data,employee_id)
			{
				var vm = this;

				
					vm.data = {
						school_name:'',
						school_address:'',
						school_year:'',
						degree:'',
						honors_awards:'',
						major:'',
						minor:'',
						employee_id:employee_id,
						employee_education_id:''
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					init();
					function init()
					{
						if(data != null)
						{

							vm.data = {
								school_name:data.school_name,
								school_address:data.school_address,
								school_year:data.school_year,
								degree:data.degree,
								honors_awards:data.honors_awards,
								major:data.major,
								minor:data.minor,
								employee_id:employee_id,
								employee_education_id:data.employee_education_id
							};

						}
						
					}
					

					function save ()
					{
						if(data == null)
						{
							api.employee_education.save(vm.data,success);
						}
						else
						{
							api.employee_education.update(vm.data,success);
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