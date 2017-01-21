(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, editableThemes,editableOptions,api)
    {
        // 3rd Party Dependencies
        editableThemes.default.submitTpl = '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>';
        editableThemes.default.cancelTpl = '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';
        editableThemes.default.formTpl = '<form class="editable-wrap"></form>';
        editableThemes.default.errorTpl = '<div ng-messages="{message: $error}" role="alert"><div class="editable-error" ng-message="message">{{$error}}</div></div>';
        editableThemes.default.controlsTpl ='<md-input-container class="editable-controls" ng-class="{\'md-input-invalid\': $error}"></md-input-container>';
        editableThemes.default.inputTpl    = '';

        editableOptions.theme = 'angular-material';

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options)
        {
            $rootScope.loadingProgress = true;
            var loginState = toState.name;


            //Check every routes changes to the server
            if(loginState!='app.login')
            {
                api.checkRoutes.get();
            }
            
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();