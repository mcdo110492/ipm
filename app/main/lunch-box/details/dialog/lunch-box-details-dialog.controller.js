(function () {
	'use strict';
		angular
			.module('app.lunch-box')
			.controller('LunchBoxDetailsDialogController',LunchBoxDetailsDialogController);

			/** @ngInject */
			function LunchBoxDetailsDialogController (api,$stateParams,PluginConfig,toaster,$mdDialog,data)
			{
				var vm = this;

					vm.data = {
						lunch_box_gadget_id:'',
						lunch_box_id:$stateParams.id,
						gadget_id:''
					};

					vm.gadgets = [];

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
							init();
						}
					}

					function init()
					{
						if(data!=null)
						{
							vm.data = {
								lunch_box_gadget_id:data.lunch_box_gadget_id,
								lunch_box_id:$stateParams.id,
								gadget_id:data.gadget_id
							};
						}
					}

					

					function save ()
					{
						if(data!=null)
						{
							api.lunchbox_gadgets.update(vm.data,success);
						}
						else
						{
							api.lunchbox_gadgets.save(vm.data,success);
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