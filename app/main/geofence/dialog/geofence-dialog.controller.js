(function () {
	'use strict';
		angular
			.module('app.geofence')
			.controller('GeofenceDialogController',GeofenceDialogController);

			/** @ngInject */
			function GeofenceDialogController (data,$mdDialog,toaster,PluginConfig,api,FileUploader)
			{

				var vm = this;

					vm.currentDate = new Date();
					vm.closeDialog = closeDialog;
					vm.update 		= update;
					vm.data = {
						brgy:'',
						location:'',
						route_file:'',
						geofence_id:'',
						sector:'',
						route_file_name:''
					};

					var uploader = vm.uploader = new FileUploader({
			            url: api.baseUrl+'geofence/geofence',
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
			                return '|jpg|jpeg|'.indexOf(type) !== -1;

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
			 
			        	if(response.stat == 200)
			        	{
			        		toaster.pop('success','Succesfully Saved');
			       			
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

			        init();
			        function init()
			        {
			        	if(data!=null)
			        	{
			        		vm.data = {
								brgy:data.brgy,
								location:data.location,
								route_file:data.route_file,
								geofence_id:data.geofence_id,
								sector:data.sector,
								route_file_name:data.route_file_name
							};
			        	}
			        }

				

					function update(data)
					{
						api.geofence.update(data,success);

						function success(r)
						{
							if(r.status === 200)
							{
								$mdDialog.hide();
							}
							else
							{
								toaster.pop('error','Something went wrong.');
							}
						}
					}


					function closeDialog ()
					{
						PluginConfig.CancelDialog();
					}
			}
})();