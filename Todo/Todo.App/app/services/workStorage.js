/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')


    .factory('workStorage', ['$resource', function ($resource) {
        'use strict';


        var store = {
            workList: {},

            api: $resource('/api/works/:id', null,
                {
                    save: { method: 'POST' },
                    update: { method: 'PUT' },
                    delete: { method: 'DELETE' }
                }
            ),

            listApi: $resource('/api/work-lists/:id', null,
                {
                    get: { method: 'GET' }
                }
            ),
            listClearCompletedApi: $resource('/api/work-lists/:id/clear-completed', null,
                {
                    delete: { method: 'DELETE' }
                }
            ),

            clearCompleted: function () {
                var originalWorks = store.workList.works.slice(0);

                var incompleteWorks = store.workList.works.filter(function (work) {
                    return !work.completed;
                });

                angular.copy(incompleteWorks, store.workList.works);

                return store.listClearCompletedApi.delete({ id: store.workList.id }, function () {
                }, function error() {
                    angular.copy(originalWorks, store.workList.works);
                });
            },

            delete: function (work) {
                var originalWorks = store.workList.works.slice(0);

                store.workList.works.splice(store.workList.works.indexOf(work), 1);
                return store.api.delete({ id: work.id },
                    function () {
                    }, function error() {
                        angular.copy(originalWorks, store.workList.works);
                    });
            },

            get: function (id) {
                return store.listApi.get({ id: id }, function (resp) {
                    angular.copy(resp, store.workList);
                },
                function (error) { })
                .$promise;
            },

            insert: function (work) {
                var originalWorks = store.workList.works.slice(0);

                return store.api.save(work,
                    function success(resp) {
                        work.id = resp.id;
                        store.workList.works.push(work);
                    }, function error() {
                        angular.copy(originalWorks, store.workList.works);
                    })
                    .$promise;
            },

            put: function (work) {
                return store.api.update({ id: work.id }, work)
                    .$promise;
            }
        };

        var promise = new Promise(function (resolve, reject) {
            resolve(store);
        })
        return promise;
    }])

