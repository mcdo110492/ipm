(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            'ngMap',
            'textAngular',
            'xeditable',
            'datatables',
            'md.data.table',
            'toaster',
            'mdPickers',
            'angularFileUpload',
            // Core
            'app.core',

            'app.login',
            'app.department',
            'app.position',
            'app.establishment',
            'app.complaint',
            'app.item',
            'app.employment-status',
            'app.employee-status',
            'app.violation',
            'app.geofence',
            'app.employee-information',
            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            'app.dispatching',
            'app.equipment',
            'app.gadget',
            'app.lunch-box'




            
            
        ]);
})();
