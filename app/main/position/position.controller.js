(function () {
	'use strict';
		angular
			.module('app.position')
			.controller('PositionController',PositionController);

			/** @ngInject */
			function PositionController($scope,api,toaster,PluginConfig,$filter)
			{
				var vm = this;
				var bookmark;
				
				vm.positions = [];
				vm.departments	 = [];
				vm.loadDepartments = loadDepartments;
				vm.showDepartment = showDepartment;
				vm.getPositions = getPositions;
				vm.checkName  = checkName;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'position_name'
				};

				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/position/dialog/position-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'PositionDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getPositions);
				 }


				 function save(data,id)
				 {
				 	var data = {'position_name':data.position_name,'department_id':data.department_id,'position_id':id};
				 	api.position.update(data,success);
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
				
				

				
				function getPositions ()
				{
					$scope.promise = api.position.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.positions = r;
					}

				}

				function loadDepartments ()
				{
					vm.query2 = {
						order:'order',
						limit: 5,
						page: 1,
						filter:'All',
						field:'department_name'
					};

					return vm.departments.length ? null : api.department.get(vm.query2,success);

					function success(r)
					{
						vm.departments = r.data;
					}
				}

				function showDepartment(position) {

				    if(position.department_id && vm.departments.length) {
				      var selected = $filter('filter')(vm.departments, {department_id: position.department_id});
				      return selected.length ? selected[0].department_name : 'Not set';
				    } else {
				      return position.department_name || 'Not set';
				    }
				 }

				function checkName(value)
				{
					if (value === '') {
				      
				      return 'This is required';
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
				    
				   getPositions();
				 });
			}
})();