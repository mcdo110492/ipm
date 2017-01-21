(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('ClubDialogController',ClubDialogController);

			/** @ngInject */
			function ClubDialogController($mdDialog,toaster,PluginConfig,api,data,employee_id)
			{
				var vm = this;

				
					vm.data = {
						club_name:'',
						club_position:'',
						club_membership:'',
						employee_id:employee_id,
						employee_club_id:''
					};

					

					vm.closeDialog = closeDialog;
					vm.save 	   = save;

					init();
					function init()
					{
						if(data != null)
						{

							vm.data = {
								club_name:data.club_name,
								club_position:data.club_position,
								club_membership:data.club_membership,
								employee_id:employee_id,
								employee_club_id:data.employee_club_id
							};

		
						}
						
					}
					

					function save ()
					{
						if(data == null)
						{
							api.employee_club.save(vm.data,success);
						}
						else
						{
							api.employee_club.update(vm.data,success);
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