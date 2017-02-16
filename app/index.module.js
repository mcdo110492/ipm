(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            'textAngular',
            'xeditable',
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
            'app.shift',
            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            'app.dispatching',
            'app.equipment',
            'app.gadget',
            'app.lunch-box',
            'app.dispatch-evaluation',
            'app.driver-equipment',
            'app.drivers-paleros'





            
            
        ]);
})();
