(function () {
	'use strict';
		angular
			.module('app.lunch-box')
			.controller('LunchBoxDialogController',LunchBoxDialogController);

			/** @ngInject */
			function LunchBoxDialogController (api,PluginConfig,toaster,$mdDialog,data)
			{
				var vm = this;

					vm.data = {
						lunch_box_code:'',
						gadgets:''
					};

					vm.gadgets = [];
					vm.url_path = api.baseUrl+'main/checkField';

					vm.closeDialog = closeDialog;

					vm.save 	   = save;

					getGadgets();
					function getGadgets()
					{
						var query = {
							order:'order',
							limit: 5,
							page: 1,
							filter:'All',
							field:'gadget_code'
						};
						api.gadget.get(query,success);
						function success(r)
						{
							vm.gadgets = r.data;
						
						}
					}

					

					function save ()
					{
						api.lunchbox.save(vm.data,success);
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