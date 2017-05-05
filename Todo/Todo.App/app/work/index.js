(function () {
    'use strict';

    angular.module('work', ['ui.router', 'ngResource'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('workLists', {
                url: '/work-lists',
                template: require('./templates/work-lists.html'),
                controller: 'WorkListsCtrl',
                resolve: {
                    store: ['workListsStorage', function (workListsStorage) {
                        workListsStorage.get();
                        return workListsStorage;
                    }]
                }
            })
            .state('workLists.works', {
                url: 'work-lists/:id/:status',
                template: require('./templates/works.html'),
                controller: 'WorkCtrl',
                resolve: {
                    store: ['workStorage', '$stateParams', function (workStorage, $stateParams) {
                        return workStorage.then(function (module) {
                            return module.get($stateParams.id).then(function (workModule) {
                                return module;
                            });
                        });
                    }]
                }
            })
    }]);
})();