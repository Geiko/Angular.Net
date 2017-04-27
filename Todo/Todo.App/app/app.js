/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

import '../Content/css/index.css';

angular.module('todomvc', ['ui.router', 'ngResource'])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('options', {
                url: '/',
                template: require('./templates/options.html')  
            })
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


            .state('todoLists', {
                url: '/todo-lists',
                template: require('./templates/todo-lists.html'),
                controller: 'TodoListsCtrl',
                resolve: {
                    store: ['todoListsStorage', function (todoListsStorage) {
                        todoListsStorage.get();
                        return todoListsStorage;
                    }]
                }
            })     
            .state('todoLists.todos', {
                url: 'todo-lists/:id/:status',
                template: require('./templates/todos.html'), 
                controller: 'TodoCtrl',
                resolve: {
                    store: ['todoStorage','$stateParams', function (todoStorage, $stateParams) {
                        return todoStorage.then(function (module) {
                            return module.get($stateParams.id).then(function (todoModule) {
                                return module;
                            });
                        });
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
    }]    ); 

require('./directives/todoEscape');
require('./directives/todoFocus');

require('./services/todoListsStorage');
require('./services/todoStorage');

require('./services/workListsStorage');
require('./services/workStorage');

require('./controllers/todoListsCtrl');
require('./controllers/todoCtrl');

require('./controllers/workListsCtrl');
require('./controllers/workCtrl');
