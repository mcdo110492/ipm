(function () {
	'use  strict';
		angular
			.module('app.employee-details')
			.controller('PersonalController',PersonalController);


			/** @ngInject */

			function PersonalController(api,toaster)
			{
				var vm = this;

					vm.saveChanges = saveChanges;


					function saveChanges (credentials)
					{
						api.employee_info.save(credentials,success);

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