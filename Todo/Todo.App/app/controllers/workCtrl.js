angular.module('todomvc')
    .controller('WorkCtrl', [
        '$scope', '$stateParams', '$state', '$filter', 'store',
        function ($scope, $stateParams, $state, $filter, store) {

            'use strict';

            var workList = $scope.workList = store.workList;

            $scope.newWork = '';
            $scope.editedWork = null;

            $scope.$watch('workList.works', function () {
                $scope.remainingCount = $filter('filter')(workList.works, { completed: false }).length;
                $scope.completedCount = workList.works.length - $scope.remainingCount;
                $scope.allChecked = !$scope.remainingCount;
            }, true);

            // Monitor the current route for changes and adjust the filter accordingly.
            $scope.$on('$stateChangeSuccess', function () {
                var status = $scope.status = $stateParams.status || '';

                if (status === 'active') {
                    $scope.statusFilter = { completed: false };
                }
                else if (status === 'completed') {
                    $scope.statusFilter = { completed: true };
                }
                else {
                    $scope.statusFilter = {};
                }
            });

            $scope.addWork = function () {
                var newWork = {
                    workListId: $stateParams.id,
                    title: $scope.newWork.trim(),
                    completed: false
                };

                if (!newWork.title) {
                    return;
                }

                $scope.saving = true;
                store.insert(newWork)
                    .then(function success() {
                        $scope.newWork = '';
                    })
                    .finally(function () {
                        $scope.saving = false;
                    });
            };

            $scope.editWork = function (work) {
                $scope.editedWork = work;
                // Clone the original work to restore it on demand.
                $scope.originalWork = angular.extend({}, work);
            };

            $scope.saveEdits = function (work, event) {
                // Blur events are automatically triggered after the form submit event.
                // This does some unfortunate logic handling to prevent saving twice.
                if (event === 'blur' && $scope.saveEvent === 'submit') {
                    $scope.saveEvent = null;
                    return;
                }

                $scope.saveEvent = event;

                if ($scope.reverted) {
                    // Work edits were reverted-- don't save.
                    $scope.reverted = null;
                    return;
                }

                work.title = work.title.trim();

                if (work.title === $scope.originalWork.title) {
                    $scope.editedWork = null;
                    return;
                }

                store[work.title ? 'put' : 'delete'](work)
                    .then(function success() {
                    }, function error() {
                        work.title = $scope.originalWork.title;
                    })
                    .finally(function () {
                        $scope.editedWork = null;
                    });
            };

            $scope.revertEdits = function (work) {
                workList.works[workList.works.indexOf(work)] = $scope.originalWork;
                $scope.editedWork = null;
                $scope.originalWork = null;
                $scope.reverted = true;
            };

            $scope.removeWork = function (work) {
                store.delete(work);
            };

            $scope.saveWork = function (work) {
                store.put(work);
            };

            $scope.toggleCompleted = function (work, completed) {
                if (angular.isDefined(completed)) {
                    work.completed = completed;
                }

                store.put(work)
                    .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    work.completed = !work.completed;
                    console.log(error);
                });
            };

            $scope.clearCompletedWorks = function () {
                store.clearCompleted();
            };

            $scope.markAll = function (completed) {
                workList.works.forEach(function (work) {
                    if (work.completed !== completed) {
                        $scope.toggleCompleted(work, completed);
                    }
                });
            };
        }]);