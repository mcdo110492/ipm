(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('GovernmentController',GovernmentController);


			/** @ngInject */

			function GovernmentController(api,toaster,$stateParams)
			{
				var vm = this;

					vm.government = {
						sss:'',
						pag_ibig:'',
						tin:'',
						philhealth:'',
						employee_id:$stateParams.id,
						govt_issued_id:''
					};

					vm.saveChanges = saveChanges;
					vm.getGovernment = getGovernment;

					function getGovernment()
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_government.get(datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.government = {
									sss:r.data[0].sss,
									pag_ibig:r.data[0].pag_ibig,
									tin:r.data[0].tin,
									philhealth:r.data[0].philhealth,
									employee_id:$stateParams.id,
									govt_issued_id:r.data[0].govt_issued_id
								};
							}

						}
					}


					function saveChanges ()
					{
						api.employee_government.save(vm.government,success);

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