/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')


    .factory('todoStorage', ['$resource', function ($resource) {
        'use strict';


        var store = {
            todoList: {},

            api: $resource('/api/todos/:id', null,
                {
                    save: { method: 'POST' },
                    update: { method: 'PUT' },
                    delete: { method: 'DELETE' }
                }
            ),

            listApi: $resource('/api/todo-lists/:id', null,
                {
                    get: { method: 'GET' }
                }
            ),
            listClearCompletedApi: $resource('/api/todo-lists/:id/clear-completed', null,
                {
                    delete: { method: 'DELETE' }
                }
            ),

            clearCompleted: function () {
                var originalTodos = store.todoList.todos.slice(0);

                var incompleteTodos = store.todoList.todos.filter(function (todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, store.todoList.todos);

                return store.listClearCompletedApi.delete({ id: store.todoList.id },function () {
                }, function error() {
                    angular.copy(originalTodos, store.todoList.todos);
                });
            },

            delete: function (todo) {
                var originalTodos = store.todoList.todos.slice(0);

                store.todoList.todos.splice(store.todoList.todos.indexOf(todo), 1);
                return store.api.delete({ id: todo.id },
                    function () {
                    }, function error() {
                        angular.copy(originalTodos, store.todoList.todos);
                    });
            },

            get: function (id) {

                return store.listApi.get({ id: id },

                    function (resp) {
                        angular.copy(resp, store.todoList);
                    },

                    function (error) {
                        var x;
                    })

                    .$promise;
            },

            insert: function (todo) {
                var originalTodos = store.todoList.todos.slice(0);

                return store.api.save(todo,
                    function success(resp) {
                        todo.id = resp.id;
                        store.todoList.todos.push(todo);
                    }, function error() {
                        angular.copy(originalTodos, store.todoList.todos);
                    })
                    .$promise;
            },

            put: function (todo) {
                return store.api.update({ id: todo.id }, todo)
                    .$promise;
            }
        };

        var promise = new Promise(function (resolve, reject) {
            resolve(store);
        })
        return promise;
    }])

