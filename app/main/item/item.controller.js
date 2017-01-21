(function () {
	'use strict';
		angular
			.module('app.item')
			.controller('ItemController',ItemController);

			/** @ngInject */
			function ItemController ($scope,api,toaster,PluginConfig,$filter,$q)
			{
				var vm = this;
				var bookmark;
				
				vm.items = [];
				vm.getItems = getItems;
				vm.checkName  = checkName;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'item_code'
				};

				
				 
				 function OpenAddDialog (ev)
				{
				 	var tmpUrl = 'app/main/item/dialog/item-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'ItemDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getItems);
				}


				 function save(fieldname,value,id)
				 {
				 	
				 		var data = {'fieldname':fieldname,'value':value,'item_id':id};	
				 		
				 		
					 	api.item.update(data,success);
					 	function success(r)
					 	{
					 		if(r.stat == 200)
					 		{
					 			
					 			toaster.pop('success','Successfully Saved.');
					 		}
					 		else
					 		{
					 			toaster.pop('error','Something Went Wrong.');
					 		}
					 	}

				 }
				 	
				 	
				 
				
				

				
				function getItems ()
				{
					$scope.promise = api.item.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.items = r;
					}

				}

				
				function checkName(value)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else {
				    	var d = $q.defer();
					    api.main.save({'table':'item','field':'item_code','value': value},success);
					    function success (res) {
					      res = res || {};
					      if(res.stat == 200) { 
					        d.resolve()
					      } else { 
					        d.resolve(res.msg)
					      }
					    }

					    return d.promise;
				    	
				    }
				   
   
				}

				$scope.$watch('vm.query.filter', function (newValue, oldValue) {
				    if(!oldValue) {
				      bookmark = vm.query.page;
				    }
				    
				    if(newValue !== oldValue) {
				      vm.query.page = 1;
				    }
				    
				    if(!newValue) {
				      vm.query.page = bookmark;
				    }
				    
				   getItems();
				 });
		    }
				
			
})();	