(function () {
	'use strict';
		angular
			.module('app.employee-details')
			.controller('NteDialogController',NteDialogController);

			/** @ngInject */
			function NteDialogController (data,$mdDialog,toaster,PluginConfig,api,FileUploader)
			{

				var vm = this;

					
					vm.items = [];
					vm.closeDialog = closeDialog;

					vm.data = {
						employee_nte_id:data.employee_nte_id
					};

					var uploader = vm.uploader = new FileUploader({
			            url: api.baseUrl+'employee/uploadNte',
			            alias:'userfile',
			            queueLimit: 1,
			            headers:{
			            	'Authorization':'Bearer '+localStorage.token
			            },
			            method:'POST'
			        });

			        uploader.filters.push({
			            name: 'imageFilter',
			            fn: function(item /*{File|FileLikeObject}*/, options) {
			                var type = '|' + item.name.slice(item.name.lastIndexOf('.')+ 1) + '|';
			                return '|jpg|pdf|'.indexOf(type) !== -1;
			            }
			        });

			        // CALLBACKS

			        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
			            toaster.pop('warning','File Error','Acceptable file format jpg,pdf.');
			            
			        };
			        uploader.onBeforeUploadItem = function(item) {
			        	item.formData.push(vm.data);
			        
			        };
			        uploader.onSuccessItem = function(fileItem, response, status, headers) {
			 
			        	if(response.stat == 200)
			        	{
			        		toaster.pop('success','Succesfully Saved');
			       			
			        	}
			        	else
			        	{
			        		toaster.pop('error','Error','Something went wrong.');c
			        	}

			        	$mdDialog.hide();
			            
			            
			        };
			        uploader.onErrorItem = function(fileItem, response, status, headers) {
			        	toaster.pop('error','Error','Something went wrong.');
			            
			        };

				

					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}
})();