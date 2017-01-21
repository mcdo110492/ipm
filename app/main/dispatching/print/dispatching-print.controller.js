(function () {
	'use strict';
		angular
			.module('app.dispatching')
			.controller('DispatchingPrintController',DispatchingPrintController);

			/** @ngInject */
			function DispatchingPrintController($scope,api,$stateParams,$timeout)
			{
				var vm = this;
				var data_id = $stateParams.id;
				vm.trip_ticket_code = '';
				vm.dispatch_time = new Date();
				vm.dispatch_time = '';
				vm.query = {
						order:'order',
						limit: 1,
						page: 1,
						filter:data_id,
						field:'trip_ticket_id'
					};

				vm.dispatching = [];
				
				getDispatchings();
				function getDispatchings ()
				{
					api.dispatching.get(vm.query,success);
						
						
					function success(r){
							
						vm.dispatching  = r.data;
						$timeout(function(){
							initPDF();
						},800);
						
					}

				}

				

				function initPDF()
				{	
					// PDF Functions
					var getElem = document.getElementById('print-area');
			        var wrapElem = angular.element(getElem);
					var pdf = new jsPDF('p', 'pt', 'letter');
			        var canvas = pdf.canvas;
			        canvas.height = 72 * 11;
			        canvas.width=72 * 8.5;;
			        

			        // var width = 400;
			        html2pdf(wrapElem, pdf, function(pdf) {
			                var iframe = document.createElement('iframe');
			                iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:100%');
			                document.body.appendChild(iframe);
			                iframe.src = pdf.output('datauristring');

			               //var div = document.createElement('pre');
			               //div.innerText=pdf.output();
			               //document.body.appendChild(div);
			            }
			        );

			        pdf.autoPrint();

				}
				
			}
})();