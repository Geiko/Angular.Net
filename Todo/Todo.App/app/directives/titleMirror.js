angular.module('todomvc')
    .directive('titleMirror', function () {
        'use script';
        
        return {

            template: require('../templates/mirror.html'),
            controller: "TitleMirrorCtrl"   
            
        };
    });
