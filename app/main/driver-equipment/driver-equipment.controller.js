(function () {
	'use strict';
		angular
			.module('app.driver-equipment')
			.controller('DriverEquipmentController',DriverEquipmentController);

			/** @ngInject */
			function DriverEquipmentController ($scope,api,toaster,PluginConfig,$filter,$q)
			{
				var vm = this;
				var bookmark;
				
				vm.driver_equipments = [];
				vm.getDriverEquipments = getDriverEquipments;
				vm.checkName  = checkName;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'equipment_id'
				};

				
				 
				 function OpenAddDialog (ev)
				{
				 	var tmpUrl = 'app/main/driver-equipment/dialog/driver-equipment-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'DriverEquipmentDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getDriverEquipments);
				}


				 function save(fieldname,value,id)
				 {
				 	
				 		var data = {'fieldname':fieldname,'value':value,'driver_equipment_id':id};	
				 		
				 		
					 	api.driver_equipment.update(data,success);
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
				 	
				 	
				 
				
				

				
				function getDriverEquipments ()
				{
					$scope.promise = api.driver_equipment.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.driver_equipments = r;
					}

				}

				
				function checkName(value)
				{
					if (value === '') {
				      
				      return 'This is required';
				    }
				    else {
				    	var d = $q.defer();
					    api.main.save({'table':'driver_equipment','field':'driver_equipment_id','value': value},success);
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
				    
				   getDriverEquipments();
				 });
		    }
				
			
})();	