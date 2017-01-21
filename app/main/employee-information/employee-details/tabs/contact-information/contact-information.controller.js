(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('ContactController',ContactController);


			/** @ngInject */

			function ContactController(api,toaster,$stateParams)
			{
				var vm = this;

					vm.contact = {
						present_address:'',
						provincial_address:'',
						tel_no:'',
						cel_no:'',
						employee_id:$stateParams.id,
						employee_contact_id:''
					};

					vm.saveChanges = saveChanges;
					vm.getContact = getContact;

					function getContact()
					{
						var datastring = {'employee_id':$stateParams.id};
						api.employee_contact.get(datastring,success);

						function success(r)
						{
							if(r.stat === 200)
							{
								vm.contact = {
									present_address:r.data[0].present_address,
									provincial_address:r.data[0].provincial_address,
									tel_no:r.data[0].tel_no,
									cel_no:r.data[0].cel_no,
									employee_id:$stateParams.id,
									employee_contact_id:r.data[0].employee_contact_id
								};
							}

						}
					}


					function saveChanges ()
					{
						api.employee_contact.save(vm.contact,success);

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