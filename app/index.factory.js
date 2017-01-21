(function () {
	'use strict';
		angular
			.module('fuse')
			.factory('Interceptor',Interceptor)
			.factory('LoaderService',LoaderService)
			.factory('PluginConfig',PluginConfig);


			/** @ngInject */
			function Interceptor ($q,$location,toaster)
			{
				return{
					'request': request,
					'responseError': responseError
				};


				function request (config)
				{
					var token = localStorage.token;
						config.headers = config.headers || {};
						if(token)
						{
							config.headers.Authorization = 'Bearer '+ token;
						}

						return config;
				}

				function responseError (response)
				{
					var status = response.status;

					if(status === 500)
					{
						
						toaster.pop('error','Something Went Wrong in the server.');
					}
					else if(status === 400)
					{
						localStorage.removeItem('profile_name');
			            localStorage.removeItem('profile_picture');
			            localStorage.removeItem('token');
			            localStorage.removeItem('user_type');
						$location.url('/');
					}


					return $q.reject(status);

				}
			}

			/** @ngInject */
			function LoaderService($mdDialog)
			{
				var service = [];
					service.loaderShow = loaderShow;
					service.loaderHide = loaderHide;
					return service;

					function loaderShow()
					{

					    return $mdDialog.show({
					   				parent:angular.element(document.body),
					   				template:
					   				'<div layout="row" layout-align="start center">'
					   				+'<md-progress-linear class="md-accent" md-mode="indeterminate" md-diameter="40"></md-progress-linear>'
					   				+'</div>',
					   				escapeToClose: false,
					   				ariaLabel: 'loader'
					   			});
					    
					}

					function loaderHide (){
						return $mdDialog.hide();
					}
			}



			/** @ngInject */
			function PluginConfig($mdDialog)
			{
				var config = [];
					config.ModalDialog = ModalDialog;
					config.CancelDialog = CancelDialog;
					config.CloseDialog = CloseDialog;
					return config;

					
				

					function ModalDialog(tempUrl,ev,localData,ctrl,ctrlAs)
					{
						return $mdDialog.show({
								parent: 		angular.element(document.body),
								templateUrl: 	tempUrl,
								controller: 	ctrl,
								controllerAs: 	ctrlAs,
								targetEvent: 	ev,
								locals: 		localData
								});
					}

					function CancelDialog()
					{
						$mdDialog.cancel();
					}

					function CloseDialog ()
					{
						return $mdDialog.hide();
					}
			}



})();