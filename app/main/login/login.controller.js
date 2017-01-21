(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($location,api,toaster)
    {
        var vm = this;
        // Data

        // Methods
        vm.login = login;
        //////////


        function login (credentials)
        {
            api.login.save(credentials,success);

            function success(r)
            {
                if(r.stat==200)
                {
                    localStorage.setItem('token',r.token);
                    localStorage.setItem('profile_name',r.profile_name);
                    localStorage.setItem('user_type',r.role);
                    localStorage.setItem('profile_picture',r.profile_picture);
                    var role = r.role;
                        if(role == 1 || role ==2)
                        {
                            $location.url('/project');
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
                else if(r.stat == 403)
                {
                    toaster.pop('error','Invalid Credentials','Incorrect username or password.');
                }
            }
        }
    }
})();