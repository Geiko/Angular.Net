/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

import '../Content/css/index.css';

angular.module('todomvc', ['ui.router', 'ngResource','work'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('options', {
                url: '/',
                template: require('./templates/options.html')
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
                    store: ['todoStorage', '$stateParams', function (todoStorage, $stateParams) {
                        return todoStorage.then(function (module) {
                            return module.get($stateParams.id).then(function (todoModule) {
                                return module;
                            });
                        });
                    }]
                }
            })

    }]);


require('./directives/todoEscape');
require('./directives/todoFocus');

require('./services/todoListsStorage');
require('./services/todoStorage');


require('./controllers/todoListsCtrl');
require('./controllers/todoCtrl');


require('./work');
require('./work/services/workListsStorage');
require('./work/services/workStorage');
require('./work/controllers/workListsCtrl');
require('./work/controllers/workCtrl');
require('./work/directives/titleMirror');
require('./work/services/mirrorComposer');
require('./work/controllers/titleMirrorCtrl');


