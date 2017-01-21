(function () {
	'use strict';
		angular
			.module('app.equipment')
			.controller('EquipmentController',EquipmentController);

			/** @ngInject */
			function EquipmentController ($scope,api,toaster,PluginConfig,$filter,$q)
			{
				var vm = this;
				var bookmark;
				
				vm.equipments = [];
				vm.getEquipments = getEquipments;
				vm.checkName  = checkName;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'equipment_code'
				};

				
				 
				 function OpenAddDialog (ev)
				{
				 	var tmpUrl = 'app/main/equipment/dialog/equipment-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'EquipmentDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getEquipments);
				}


				 function save(fieldname,value,id)
				 {
				 	
				 		var data = {'fieldname':fieldname,'value':value,'equipment_id':id};	
				 		
				 		
					 	api.equipment.update(data,success);
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
				 	
				 	
				 
				
				

				
				function getEquipments ()
				{
					$scope.promise = api.equipment.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.equipments = r;
					}

				}

				
				function checkName(value)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else {
				    	var d = $q.defer();
					    api.main.save({'table':'equipment','field':'equipment_code','value': value},success);
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
				    
				   getEquipments();
				 });
		    }
				
			
})();	