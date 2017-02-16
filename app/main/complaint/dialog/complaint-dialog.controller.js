(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('ComplaintDialogController',ComplaintDialogController);

			/** @ngInject */
			function ComplaintDialogController ($mdDialog,toaster,PluginConfig,api,data)
			{
				var vm = this;

					vm.data = {
						complaint_id:'',
						client_name:'',
						client_type:'',
						contact_no:'',
						type_est_id:'',
						details:'',
						location:'',
						complaint_date:new Date()
					};

					vm.establishments = [];

					vm.closeDialog = closeDialog;
					vm.save 	   = save;


					init();
					function init()
					{
						if(data!=null)
						{
							vm.data = {
								complaint_id:data.complaint_id,
								client_name:data.client_name,
								client_type:data.client_type,
								contact_no:data.contact_no,
								type_est_id:'',
								details:data.details,
								location:data.location,
								complaint_date:new Date(data.complaint_date)
							};
						}
					}

					

					function save ()
					{
						if(data!=null)
						{
							api.complaint.update(vm.data,success);
						}
						else
						{
							api.complaint.save(vm.data,success);
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
					
					loadEstablishment();
					function loadEstablishment ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'type_est_name'
						};

						api.establishment.get(query2,success);

						function success(r)
						{
							vm.establishments = r.data;
							vm.data.type_est_id = data.type_est_id;
						}
					}

					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}

})();