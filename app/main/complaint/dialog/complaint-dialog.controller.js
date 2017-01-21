(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('ComplaintDialogController',ComplaintDialogController);

			/** @ngInject */
			function ComplaintDialogController ($mdDialog,toaster,PluginConfig,api)
			{
				var vm = this;

					vm.data = {
						client_name:'',
						type_est_id:'',
						details:'',
						location:'',
						complaint_date:new Date()
					};

					vm.establishments = [];

					vm.closeDialog = closeDialog;
					vm.loadEstablishment = loadEstablishment;
					vm.save 	   = save;

					

					function save ()
					{
						var date = moment(vm.data.complaint_date).format('YYYY-MM-D');
						var list = {'client_name':vm.data.client_name,'type_est_id':vm.data.type_est_id,'details':vm.data.details,'location':vm.data.location,'complaint_date':date};
						api.complaint.save(list,success);
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

					function loadEstablishment ()
					{
						var query2 = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'type_est_name'
						};

						return vm.establishments.length ? null : api.establishment.get(query2,success);

						function success(r)
						{
							vm.establishments = r.data;
						}
					}

					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}

})();