(function () {
	'use strict';
		angular
			.module('app.geofence')
			.controller('ChangeRputeController',ChangeRputeController);

			/** @ngInject */
			function ChangeRputeController ($mdDialog,toaster,api,FileUploader,id)
			{

				var vm = this;

					vm.closeDialog = closeDialog;
					vm.data = {
						geofence_id:id
					};

					var uploader = vm.uploader = new FileUploader({
			            url: api.baseUrl+'geofence/change_route',
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
			                return '|jpeg|jpg|'.indexOf(type) !== -1;

			            }
			        });

			        // CALLBACKS

			        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
			            toaster.pop('warning','kmz or kml file type only.');
			            
			        };
			        uploader.onBeforeUploadItem = function(item) {
			        	item.formData.push(vm.data);
			        
			        };
			        uploader.onSuccessItem = function(fileItem, response, status, headers) {
			 
			        	if(response.status == 200)
			        	{
			        		toaster.pop('success','Geofence Route Changed.');
			       			
			        	}
			        	else
			        	{
			        		toaster.pop('error','Error','Something went wrong.');
			        	}

			        	$mdDialog.hide();
			            
			            
			        };
			        uploader.onErrorItem = function(fileItem, response, status, headers) {
			        	toaster.pop('error','Error','Something went wrong.');
			            
			        };


				
				
					function closeDialog ()
					{
						$mdDialog.cancel();
					}
			}
})();