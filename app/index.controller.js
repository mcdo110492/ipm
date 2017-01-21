(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming,msNavigationService)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //////////

        msNavigationService.saveItem('apps', {
            title : 'HR MODULE',
            group : true,
            weight: 1
        });

        msNavigationService.saveItem('apps.project', {
            title : 'PROJECT',
            icon : 'icon-book',
            weight: 1,
            state:'app.project'
        });

        msNavigationService.saveItem('apps.position', {
            title : 'POSITION',
            icon : 'icon-book',
            weight: 2,
            state:'app.position'
        });

        msNavigationService.saveItem('apps.employment-status', {
            title : 'EMPLOYMENT STATUS',
            icon : 'icon-book',
            weight: 3,
            state:'app.employment-status'
        });

        msNavigationService.saveItem('apps.employee-status', {
            title : 'EMPLOYEE STATUS',
            icon : 'icon-book',
            weight: 4,
            state:'app.employee-status'
        });

        msNavigationService.saveItem('apps.violation', {
            title : 'VIOLATION',
            icon : 'icon-book',
            weight: 5,
            state:'app.violation'
        });

        msNavigationService.saveItem('apps.employee-lists', {
            title : 'EMPLOYEE LISTS',
            icon : 'icon-account-multiple',
            weight: 6,
            state:'app.employee-lists'
        });

        msNavigationService.saveItem('csr', {
            title : 'CSR MODULE',
            group : true,
            weight: 2
        });

        msNavigationService.saveItem('csr.establishment', {
            title : 'ESTABLISHMENT',
            icon : 'icon-book',
            weight: 1,
            state:'app.establishment'
        });

        msNavigationService.saveItem('csr.complaint', {
            title : 'COMPLAINTS',
            icon : 'icon-bullhorn',
            weight: 2,
            state:'app.complaint'
        });

        msNavigationService.saveItem('it', {
            title : 'IT MODULE',
            group : true,
            weight: 3
        });

        msNavigationService.saveItem('it.gadget', {
            title : 'GADGET',
            icon : 'icon-tablet-android',
            weight: 1,
            state:'app.gadget'
        });

        msNavigationService.saveItem('it.lunch-box', {
            title : 'LUNCH BOX',
            icon : 'icon-wallet-travel',
            weight: 2,
            state:'app.lunch-box'
        });

        msNavigationService.saveItem('it.geofence', {
            title : 'GEOFENCE',
            icon : 'icon-routes',
            weight: 3,
            state:'app.geofence'
        });

        msNavigationService.saveItem('it.it-complaint', {
            title : 'IT COMPLAINTS',
            icon : 'icon-bullhorn',
            weight: 4,
            state:'app.it-complaint'
        });


        msNavigationService.saveItem('dispatch', {
            title : 'DISPATCHING MODULE',
            group : true,
            weight: 4
        });

        msNavigationService.saveItem('dispatch.shift', {
            title : 'SHIFT',
            icon : 'icon-book',
            weight: 1,
            state:'app.shift'
        });

        msNavigationService.saveItem('dispatch.driver-paleros', {
            title : "DRIVER' S PALEROS ",
            icon : 'icon-book',
            weight: 2,
            state:'app.driver-paleros'
        });

        msNavigationService.saveItem('dispatch.dispatching', {
            title : 'TRIP TICKET',
            icon : 'icon-book',
            weight: 3,
            state:'app.dispatching'
        });

        msNavigationService.saveItem('dispatch.dispatch-complaint', {
            title : 'DIPATCH COMPLAINTS',
            icon : 'icon-bullhorn',
            weight: 4,
            state:'app.dispatch-complaint'
        });

        msNavigationService.saveItem('warehouse', {
            title : 'WAREHOUSE MODULE',
            group : true,
            weight: 5
        });

        msNavigationService.saveItem('warehouse.equipment', {
            title : 'EQUIPMENTS',
            icon : 'icon-truck',
            weight: 1,
            state:'app.equipment'
        });

        msNavigationService.saveItem('warehouse.item', {
            title : 'ITEMS',
            icon : 'icon-gavel',
            weight: 2,
            state:'app.item'
        });


        msNavigationService.saveItem('warehouse.driver-equipment', {
            title : "DRIVER' S EQUIPMENT",
            icon : 'icon-truck',
            weight: 3,
            state:'app.driver-equipment'
        });



    }
})();