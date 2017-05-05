angular.module('work')
    .factory('mirrorComposer', [function () {
        'use strict';
        
        var mirrorService = {
            getStr: function (str) {                                
                return str + ' ' + str;
            }            
        };

        return mirrorService;

    }])