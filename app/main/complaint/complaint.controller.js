(function () {
	'use strict';
		angular
			.module('app.complaint')
			.controller('ComplaintController',ComplaintController);

			/** @ngInject */
			function ComplaintController ($scope,api,toaster,PluginConfig,$filter)
			{
				var vm = this;
				var bookmark;

				
				vm.role_type = true;
				vm.complaints = [];
				vm.establishments	 = [];
				vm.loadEstablishments = loadEstablishments;
				vm.showEstablishment = showEstablishment;
				vm.getComplaints = getComplaints;
				vm.checkName  = checkName;
				vm.OpenAddDialog = OpenAddDialog;
				vm.save         = save;
				vm.query = {
					order:'order',
					limit: 5,
					page: 1,
					filter:'',
					field:'client_name'
				};

				init();
				function init()
				{
					var role = localStorage.user_type;
					if(role==7 || role == 1)
					{
						vm.role_type = false;
					}

				}
				
				 
				 function OpenAddDialog (ev)
				 {
				 	var tmpUrl = 'app/main/complaint/dialog/complaint-dialog.html';
				 	var localData = {'data':null};
				 	var ctrl = 'ComplaintDialogController';
				 	var ctrlAs = 'ddcvm';
				 	PluginConfig.ModalDialog(tmpUrl,ev,localData,ctrl,ctrlAs).then(vm.getComplaints);
				 }


				 function save(fieldname,value,id)
				 {
				 	if(value === '')
				 	{
				 		return 'This is required.';
				 	}
				 	else
				 	{
				 		if(fieldname === 'complaint_date')
				 		{
				 			var date = moment(value).format('YYYY-MM-D hh:mm:ss');
				 			var data = {'fieldname':fieldname,'value':date,'complaint_id':id};	
				 		}
				 		else
				 		{
				 			var data = {'fieldname':fieldname,'value':value,'complaint_id':id};	
				 		}
				 		
					 	api.complaint.update(data,success);
					 	function success(r)
					 	{
					 		if(r.stat == 200)
					 		{
					 			if(fieldname === 'status')
					 			{
					 				getComplaints();
					 			}
					 			toaster.pop('success','Successfully Saved.');
					 		}
					 		else
					 		{
					 			toaster.pop('error','Something Went Wrong.');
					 		}
					 	}

				 	}
				 	
				 	
				 }
				
				

				
				function getComplaints ()
				{
					$scope.promise = api.complaint.get(vm.query,success).$promise;
					
					

					function success(r){
						
						vm.complaints = r;
					}

				}

				function loadEstablishments ()
				{
					vm.query2 = {
						order:'order',
						limit: 5,
						page: 1,
						filter:'All',
						field:'type_est_name'
					};

					return vm.establishments.length ? null : api.establishment.get(vm.query2,success);

					function success(r)
					{
						vm.establishments = r.data;
					}
				}

				function showEstablishment(complaint) {

				    if(complaint.type_est_id && vm.establishments.length) {
				      var selected = $filter('filter')(vm.establishments, {type_est_id: complaint.type_est_id});
				      return selected.length ? selected[0].type_est_name : 'Not set';
				    } else {
				      return complaint.type_est_name || 'Not set';
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
				    
				   getComplaints();
				 });
				
			}
})();