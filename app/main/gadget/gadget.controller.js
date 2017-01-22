(function () {
	'use strict';
		angular
			.module('app.gadget')
			.controller('GadgetController',GadgetController);

			/** @ngInject */
			function GadgetController ($scope,api,toaster,PluginConfig,$filter,$q)
			{
				var vm = this;
				var bookmark;
				
				vm.gadgets = [];
				vm.getgadgets = getgadgets;
				vm.checkName  = checkName;
				vm.checkData  = checkData;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'gadget_code'
				};

				
				 
				 function OpenAddDialog (ev)
				{
				 	var tmpUrl = 'app/main/gadget/dialog/gadget-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'GadgetDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getgadgets);
				}


				 function save(fieldname,value,id)
				 {
				 	
				 		var data = {'fieldname':fieldname,'value':value,'gadget_id':id};	
				 		
				 		
					 	api.gadget.update(data,success);
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
				 	
				 	
				 
				
				

				
				function getgadgets ()
				{
					$scope.promise = api.gadget.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.gadgets = r;
					}

				}


				function checkData(value)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else
				    {
				    	return true;
				    }
				}

				
				function checkName(value,field)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else {
				    	var d = $q.defer();
					    api.main.save({'table':'gadget','field':field,'value': value},success);
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
				    
				   getgadgets();
				 });
		    }
				
			
})();	