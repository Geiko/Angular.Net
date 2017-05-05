angular.module('work')
    .directive('titleMirror', [function () {
        'use script';
        
        return {
            template: require('../templates/mirror.html'),
            controller: "TitleMirrorCtrl",
            resolve: {
                store: ['mirrorComposer', function (mirrorComposer) {
                    mirrorComposer.getStr();
                    return mirrorComposer;
                }]
            }            
        };
    }]);
