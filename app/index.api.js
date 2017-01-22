(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource)
    {
        /**
         * You can use this service to define your API urls. The "api" service
         * is designed to work in parallel with "apiResolver" service which you can
         * find in the "app/core/services/api-resolver.service.js" file.
         *
         * You can structure your API urls whatever the way you want to structure them.
         * You can either use very simple definitions, or you can use multi-dimensional
         * objects.
         *
         * Here's a very simple API url definition example:
         *
         *      api.getBlogList = $resource('http://api.example.com/getBlogList');
         *
         * While this is a perfectly valid $resource definition, most of the time you will
         * find yourself in a more complex situation where you want url parameters:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'});
         *
         * You can also define your custom methods. Custom method definitions allow you to
         * add hardcoded parameters to your API calls that you want to sent every time you
         * make that API call:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'}, {
         *         'getFromHomeCategory' : {method: 'GET', params: {blogCategory: 'home'}}
         *      });
         *
         * In addition to these definitions, you can also create multi-dimensional objects.
         * They are nothing to do with the $resource object, it's just a more convenient
         * way that we have created for you to packing your related API urls together:
         *
         *      api.blog = {
         *                   list     : $resource('http://api.example.com/blog'),
         *                   getById  : $resource('http://api.example.com/blog/:id', {id: '@id'}),
         *                   getByDate: $resource('http://api.example.com/blog/:date', {id: '@date'}, {
         *                       get: {
         *                            method: 'GET',
         *                            params: {
         *                                getByDate: true
         *                            }
         *                       }
         *                   })
         *       }
         *
         * If you look at the last example from above, we overrode the 'get' method to put a
         * hardcoded parameter. Now every time we make the "getByDate" call, the {getByDate: true}
         * object will also be sent along with whatever data we are sending.
         *
         * All the above methods are using standard $resource service. You can learn more about
         * it at: https://docs.angularjs.org/api/ngResource/service/$resource
         *
         * -----
         *
         * After you defined your API urls, you can use them in Controllers, Services and even
         * in the UIRouter state definitions.
         *
         * If we use the last example from above, you can do an API call in your Controllers and
         * Services like this:
         *
         *      function MyController (api)
         *      {
         *          // Get the blog list
         *          api.blog.list.get({},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the id of 3
         *          var id = 3;
         *          api.blog.getById.get({'id': id},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the date by using custom defined method
         *          var date = 112314232132;
         *          api.blog.getByDate.get({'date': date},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *      }
         *
         * Because we are directly using $resource service, all your API calls will return a
         * $promise object.
         *
         * --
         *
         * If you want to do the same calls in your UI Router state definitions, you need to use
         * "apiResolver" service we have prepared for you:
         *
         *      $stateProvider.state('app.blog', {
         *          url      : '/blog',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver)
         *              {
         *                  return apiResolver.resolve('blog.list@get');
         *              }
         *          }
         *      });
         *
         *  You can even use parameters with apiResolver service:
         *
         *      $stateProvider.state('app.blog.show', {
         *          url      : '/blog/:id',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver, $stateParams)
         *              {
         *                  return apiResolver.resolve('blog.getById@get', {'id': $stateParams.id);
         *              }
         *          }
         *      });
         *
         *  And the "Blog" object will be available in your BlogController:
         *
         *      function BlogController(Blog)
         *      {
         *          var vm = this;
         *
         *          // Data
         *          vm.blog = Blog;
         *
         *          ...
         *      }
         */

        var api = {};

        // Base Url
        //api.baseUrl = 'http://ipm.pillarsweb.com/ipmservices/index.php/';
        api.baseUrl = 'http://localhost/ipmservices/index.php/';

        /**
         * Here you can find all the definitions that the Demo Project requires
         *
         * If you wish to use this method, you can create your API definitions
         * in a similar way.
         */

          api.checkRoutes = $resource(api.baseUrl+'routes/routes/:id');

         api.login = $resource(api.baseUrl+'login/login');

         api.main = $resource(api.baseUrl+'main/checkField/:id', null, {'update':{'method':'PUT'}});

         api.department = $resource(api.baseUrl+'department/department/:id',null,{'update':{'method':'PUT'}});

         api.position = $resource(api.baseUrl+'position/position/:id', null, {'update':{'method':'PUT'}});

         api.establishment = $resource(api.baseUrl+'establishment/establishment/:id', null, {'update':{'method':'PUT'}});

         api.complaint = $resource(api.baseUrl+'complaint/complaint/:id', null, {'update':{'method':'PUT'}});

         api.item = $resource(api.baseUrl+'item/item/:id', null, {'update':{'method':'PUT'}});


         api.geofence = $resource(api.baseUrl+'geofence/geofence/:id', null, {'update':{'method':'PUT'}});
         api.geofence_change_status = $resource(api.baseUrl+'geofence/change_status/:id', null, {'update':{'method':'PUT'}})

         api.violation = $resource(api.baseUrl+'violation/violation/:id', null, {'update':{'method':'PUT'}});

         api.employment_status = $resource(api.baseUrl+'employment_status/employment_status/:id', null, {'update':{'method':'PUT'}});

         api.employee_status = $resource(api.baseUrl+'employee_status/employee_status/:id', null, {'update':{'method':'PUT'}});

         api.employee = $resource(api.baseUrl+'employee/employee/:id', null, {'update':{'method':'PUT'}});

         api.employee_info = $resource(api.baseUrl+'employee/personalInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_education = $resource(api.baseUrl+'employee/educationInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_government = $resource(api.baseUrl+'employee/governmentInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_contact = $resource(api.baseUrl+'employee/contactInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_family = $resource(api.baseUrl+'employee/familyInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_employment = $resource(api.baseUrl+'employee/employmentInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_training = $resource(api.baseUrl+'employee/trainingInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_club = $resource(api.baseUrl+'employee/clubInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_violation = $resource(api.baseUrl+'employee/violationInfo/:id', null, {'update':{'method':'PUT'}});

         api.employee_licenses = $resource(api.baseUrl+'employee/licensesInfo/:id', null, {'update':{'method':'PUT'}});

         api.lunchbox = $resource(api.baseUrl+'lunchbox/lunchbox/:id', null, {'update':{'method':'PUT'}});

         api.lunchbox_gadgets = $resource(api.baseUrl+'lunchbox/lunchboxGadgets/:id', null, {'update':{'method':'PUT'}});

         

         /** 
            Kay MAk

         */
            //for equipment
         api.equipment = $resource(api.baseUrl+'equipment/equipment/:id', null, {'update':{'method':'PUT'}});
         //for gadgets
         api.gadget = $resource(api.baseUrl+'gadget/gadget/:id', null, {'update':{'method':'PUT'}});
         //for trip ticket
         api.dispatching = $resource(api.baseUrl+'dispatching/dispatching/:id', null, {'update':{'method':'PUT'}});
         //for trip ticket details
         api.dispatching_info = $resource(api.baseUrl+'dispatching/dispatchingInfo/:id', null, {'update':{'method':'PUT'}});

         /** /Kay MAk*/
        /*
         api.dashboard = {
         project  : $resource(api.baseUrl + 'dashboard/project/data.json'),
         server   : $resource(api.baseUrl + 'dashboard/server/data.json'),
         analytics: $resource(api.baseUrl + 'dashboard/analytics/data.json')
         };

         api.cards = $resource(api.baseUrl + 'cards/cards.json');

         api.fileManager = {
         documents: $resource(api.baseUrl + 'file-manager/documents.json')
         };

         api.ganttChart = {
         tasks: $resource(api.baseUrl + 'gantt-chart/tasks.json'),
         timespans : $resource(api.baseUrl + 'gantt-chart/timespans.json')
         };

         api.icons = $resource('assets/icons/selection.json');

         api.invoice = $resource(api.baseUrl + 'invoice/invoice.json');

         api.mail = {
         inbox: $resource(api.baseUrl + 'mail/inbox.json')
         };

         api.profile = {
         timeline    : $resource(api.baseUrl + 'profile/timeline.json'),
         about       : $resource(api.baseUrl + 'profile/about.json'),
         photosVideos: $resource(api.baseUrl + 'profile/photos-videos.json')
         };

         api.quickPanel = {
         activities: $resource(api.baseUrl + 'quick-panel/activities.json'),
         contacts  : $resource(api.baseUrl + 'quick-panel/contacts.json'),
         events    : $resource(api.baseUrl + 'quick-panel/events.json'),
         notes     : $resource(api.baseUrl + 'quick-panel/notes.json')
         };

         api.search = {
         classic : $resource(api.baseUrl + 'search/classic.json'),
         mails   : $resource(api.baseUrl + 'search/mails.json'),
         users   : $resource(api.baseUrl + 'search/users.json'),
         contacts: $resource(api.baseUrl + 'search/contacts.json')
         };

         api.scrumboard = {
         boardList: $resource(api.baseUrl + 'scrumboard/boardList.json'),
         board    : $resource(api.baseUrl + 'scrumboard/boards/:id.json')
         };

         api.tables = {
         employees   : $resource(api.baseUrl + 'tables/employees.json'),
         employees100: $resource(api.baseUrl + 'tables/employees100.json')
         };

         api.timeline = {
         page1: $resource(api.baseUrl + 'timeline/page-1.json'),
         page2: $resource(api.baseUrl + 'timeline/page-2.json'),
         page3: $resource(api.baseUrl + 'timeline/page-3.json')
         };

         api.todo = {
         tasks: $resource(api.baseUrl + 'todo/tasks.json'),
         tags : $resource(api.baseUrl + 'todo/tags.json')
         };
         */

        return api;
    }

})();