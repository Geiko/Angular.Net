angular.module('todomvc')
    .directive('titleMirror', function () {
        'use script';
        
        return  {

            template: "<span> {{newWork}} {{editedWork.title}} </span>"                         

        };
    });