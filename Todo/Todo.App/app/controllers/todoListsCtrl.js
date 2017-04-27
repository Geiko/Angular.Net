/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
    .controller('TodoListsCtrl', [
                '$scope', '$stateParams', '$state', '$filter', 'store',
                function ($scope, $stateParams, $state, $filter, store) {

        'use strict';

        var todoLists = $scope.todoLists = store.todoLists;

        $scope.newTodoList = '';
        $scope.editedTodoList = null;

        $scope.addTodoList = function () {
            var newTodoList = {
                title: $scope.newTodoList.trim(),
            };

            if (!newTodoList.title) {
                return;
            }

            $scope.saving = true;
            store.insert(newTodoList)
                .then(function success() {
                    $scope.newTodoList = '';
                })
                .finally(function () {
                    $scope.saving = false;
                });
        };

        $scope.editTodoList = function (todoList) {
            $scope.editedTodoList = todoList;
            // Clone the original todo to restore it on demand.
            $scope.originalTodoList = angular.extend({}, todoList);
        };

        $scope.saveEdits = function (todoList, event) {
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $scope.saveEvent === 'submit') {
                $scope.saveEvent = null;
                return;
            }

            $scope.saveEvent = event;

            if ($scope.reverted) {
                // Todo edits were reverted-- don't save.
                $scope.reverted = null;
                return;
            }

            todoList.title = todoList.title.trim();

            if (todoList.title === $scope.originalTodoList.title) {
                $scope.editedTodoList = null;
                return;
            }

            store[todoList.title ? 'put' : 'delete'](todoList)
                .then(function success() {
                }, function error() {
                    todoList.title = $scope.originalTodoList.title;
                })
                .finally(function () {
                    $scope.editedTodoList = null;
                });
        };

        $scope.revertEdits = function (todoList) {
            todoLists[todoLists.indexOf(todoList)] = $scope.originalTodoList;
            $scope.editedTodoList = null;
            $scope.originalTodoList = null;
            $scope.reverted = true;
        };

        $scope.removeTodoList = function (todoList) {
            store.delete(todoList);
            $state.go('^');
        };

        $scope.saveTodoList = function (todoList) {
            store.put(todoLists);
        };


        $scope.clearCompletedTodos = function () {
            store.clearCompleted();
        };

    }]);
