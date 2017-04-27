/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.dfsdfsd
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')

    .factory('todoListsStorage', ['$resource', function ($resource) {
        'use strict';

        var store = {
            todoLists: [],

            api: $resource('/api/todo-lists/:id', null,
                {
                    get: { method: 'GET' },
                    save: { method: 'POST' },
                    update: { method: 'PUT' },
                    delete: { method: 'DELETE' }
                }
            ),  

            clearCompleted: function () {
                var originalTodos = store.todoLists.slice(0);

                var incompleteTodos = store.todoLists.filter(function (todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, store.todoLists);

                return store.api.delete(function () {
                }, function error() {
                    angular.copy(originalTodos, store.todos);
                });
            },

            delete: function (todoList) {
                var originalTodoLists = store.todoLists.slice(0);

                store.todoLists.splice(store.todoLists.indexOf(todoList), 1);
                return store.api.delete({ id: todoList.id },
                    function () {
                    }, function error() {
                        angular.copy(originalTodoLists, store.todoLists);
                    });
            },

            get: function () {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.todoLists);
                });
            },

            insert: function (todoList) {
                var originalTodoLists = store.todoLists.slice(0);

                return store.api.save(todoList,
                    function success(resp) {
                        todoList.id = resp.id;
                        store.todoLists.push(todoList);
                    }, function error() {
                        angular.copy(originalTodoLists, store.todoLists);
                    })
                    .$promise;
            },

            put: function (todoList) {
                return store.api.update({ id: todoList.id }, todoList)
                    .$promise;
            }
        };

        return store;
    }])

