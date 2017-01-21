(function ()
{
    'use strict';

    angular
        .module('app.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.login', {
            url      : '/',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/main/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login',
            resolve: { /* @ngInject */
                RoutesResolver:function($location){
                    var token = localStorage.token;
                    var role    = localStorage.user_type;
                    if(token)
                    {
                        if(role == 1 || role ==2)
                        {
                            $location.url('/department');
                        }
                        else if(role == 3)
                        {
                            $location.url('/employee-lists');
                        }
                        else if(role == 4)
                        {
                            $location.url('/gadget');
                        }
                        else if(role == 5)
                        {
                            $location.url('/dispatching');
                        }
                        else if(role == 6)
                        {
                            $location.url('/item');
                        }
                        else if(role == 7)
                        {
                            $location.url('/complaint');
                        }
                        
                    }
                }
            }

        });

      
    }

})();