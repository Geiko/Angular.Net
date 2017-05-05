angular.module('work')
    .controller('WorkListsCtrl', [
        '$scope', '$stateParams', '$state', '$filter', 'store',
        function ($scope, $stateParams, $state, $filter, store) {

            'use strict';

            var workLists = $scope.workLists = store.workLists;

            $scope.newWorkList = [];
            $scope.editedWorkList = null;

            $scope.addWorkList = function () {
                var newWorkList = {
                    title: $scope.newWorkList.trim()
                };

                if (!newWorkList.title) {
                    return;
                }

                $scope.saving = true;
                store.insert(newWorkList)
                    .then(function success() {
                        $scope.newWorkList = '';
                    })
                    .finally(function () {
                        $scope.saving = false;
                    });
            };

            $scope.editedWorkList = function (workList) {
                $scope.editedWorkList = workList;
                // Clone the original todo to restore it on demand.
                $scope.originalWorkList = angular.extend({}, workList);
            };

            $scope.savedEdits = function (workList, event) {
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
            }

            workList.title = workList.title.trim;

            if (workList.title === $scope.originalWorkList.title) {
                $scope.editedWorkList = null;
                return;
            }

            store[workList.title ? 'put' : 'delete'](workList)
                .then(function success() { },
                function error() {
                    workList.title = $scope.editedWorkList.title;
                })
                .finally(function () {
                    $scope.editedWorkList = null;
                });
        }

        $scope.revertEdits = function (workList) {
            workLists[workLists.indexOf(workList)] = $scope.originalWorkList;
            $scope.editedWorkList = null;
            $scope.originalWorkList = null;
            $scope.reverted = true;
        }

        $scope.removeWorkList = function (workList) {
            store.delete(workList);
            //$state.go('^');
        };

        $scope.saveWorkList = function (workList) {
            store.put(workLists);
        };

        $scope.clearCompletedWorks = function () {
            store.clearCompleted();
        };

    }]);