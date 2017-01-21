(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('FamilyController',FamilyController);


			/** @ngInject */

			function FamilyController(api,toaster,$stateParams)
			{
				var vm = this;

					vm.family = {
						spouse_name:'',
						spouse_address:'',
						spouse_occupation:'',
						father_name:'',
						father_address:'',
						father_occupation:'',
						mother_name:'',
						mother_address:'',
						mother_occupation:'',
						childrens:'',
						employee_id:$stateParams.id,
						employee_family_id:''
					};

					vm.saveChanges = saveChanges;
					vm.getFamily = getFamily;

					function getFamily()
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_family.get(datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.family = {
									spouse_name:r.data[0].spouse_name,
									spouse_address:r.data[0].spouse_address,
									spouse_occupation:r.data[0].spouse_occupation,
									father_name:r.data[0].father_name,
									father_address:r.data[0].father_address,
									father_occupation:r.data[0].father_occupation,
									mother_name:r.data[0].mother_name,
									mother_address:r.data[0].mother_address,
									mother_occupation:r.data[0].mother_occupation,
									childrens:r.data[0].childrens,
									employee_id:$stateParams.id,
									employee_family_id:r.data[0].employee_family_id
								};
							}

						}
					}


					function saveChanges ()
					{
						api.employee_family.save(vm.family,success);

						function success(r)
						{
							if(r.stat == 200)
							{
								toaster.pop('success','Changes has been saved.');
							}
							else
							{
								toaster.pop('error','Something went wrong.');
							}
						}
					}
			}
})();