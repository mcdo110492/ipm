(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('EmployeeDetailsController',EmployeeDetailsController);


			/** @ngInject */

			function EmployeeDetailsController($stateParams,api)
			{
				var vm = this;
					vm.info = {
						employee_id:$stateParams.id,
						employee_no:'',
						firstname:'',
						middlename:'',
						lastname:'',
						dob:'',
						pob:'',
						height:'',
						weight:'',
						distinguishing_mark:'',
						blood:'',
						civil_status:'',
						citizenship:'',
						religion:''
					};
					vm.role_type = true;

				init();
				function init()
				{
					var role = localStorage.user_type;
					if(role==1 || role == 2)
					{
						vm.role_type = false;
					}

				}

				getPersonalInfo();
				function getPersonalInfo()
				{
					var datastring = {'employee_id':$stateParams.id};
					api.employee_info.get(datastring,success);

					function success(r)
					{
						if(r.stat == 200)
						{
							vm.info = {
								employee_id:$stateParams.id,
								employee_no:r.data[0].employee_no,
								firstname:r.data[0].firstname,
								middlename:r.data[0].middlename,
								lastname:r.data[0].lastname,
								dob: new Date(r.data[0].dob),
								pob:r.data[0].pob,
								height:r.data[0].height,
								weight:r.data[0].weight,
								distinguishing_mark:r.data[0].distinguishing_mark,
								blood:r.data[0].blood,
								civil_status:r.data[0].civil_status,
								citizenship:r.data[0].citizenship,
								religion:r.data[0].religion
							};
						}
					}
				}

			}
})();