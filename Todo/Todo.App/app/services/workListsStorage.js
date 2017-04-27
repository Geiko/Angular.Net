angular.module('todomvc')
              
    .factory('workListsStorage', ['$resource', function ($resource) {

        'use strict';

        var store = {

            workLists: [],

            api: $resource('/api/work-lists/:id', null,
                {
                    get: { method: 'GET' },
                    save: { method: 'POST' },
                    update: { method: 'PUT' },
                    delete: { method: 'DELETE' }
                }
            ),
                        
            get: function () {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.workLists);
                });
            },



            insert: function (workList) {
                var originalWorkLists = store.workLists.slice(0);

                return store.api.save(workList,
                    function success(resp) {
                        workList.id = resp.id;
                        store.workLists.push(workList);
                    }, function error() {
                        angular.copy(originalWorkLists, store.workLists);
                    })
                    .$promise;
            },

            delete: function (workList) {
                var originalWorkList = store.workLists.slice(0);

                store.workLists.splice(store.workLists.indexOf(workList), 1);
                return store.api.delete({ id: workList.id },
                    function () { },
                    function error() {
                        angular.copy(originalWorkList, store.workLists);
                    });
            },




            put: function (workList) {
                return store.api.update({ id: workList.id }, workList)
                    .$promise;
            }

        };

        return store;
    }])