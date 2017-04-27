webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

﻿/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
    .controller('TodoCtrl', ['$scope', '$stateParams', '$filter','store', function ($scope, $stateParams, $filter, store) {
        'use strict';

        var todoList = $scope.todoList = store.todoList;

        $scope.newTodo = '';
        $scope.editedTodo = null;

        $scope.$watch('todoList.todos', function () {
            $scope.remainingCount = $filter('filter')(todoList.todos, { completed: false }).length;
            $scope.completedCount = todoList.todos.length - $scope.remainingCount;
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

        $scope.addTodo = function () {
            var newTodo = {
                todoListId: $stateParams.id,
                title: $scope.newTodo.trim(),
                completed: false
            };

            if (!newTodo.title) {
                return;
            }

            $scope.saving = true;
            store.insert(newTodo)
                .then(function success() {
                    $scope.newTodo = '';
                })
                .finally(function () {
                    $scope.saving = false;
                });
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.saveEdits = function (todo, event) {
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

            todo.title = todo.title.trim();

            if (todo.title === $scope.originalTodo.title) {
                $scope.editedTodo = null;
                return;
            }

            store[todo.title ? 'put' : 'delete'](todo)
                .then(function success() {
                }, function error() {
                    todo.title = $scope.originalTodo.title;
                })
                .finally(function () {
                    $scope.editedTodo = null;
                });
        };

        $scope.revertEdits = function (todo) {
            todoList.todos[todoList.todos.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.reverted = true;
        };

        $scope.removeTodo = function (todo) {
            store.delete(todo);
        };

        $scope.saveTodo = function (todo) {
            store.put(todo);
        };

        $scope.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }

            store.put(todo, todoList.todos.indexOf(todo))
                .then(function success() {
                }, function error() {
                    todo.completed = !todo.completed;
                });
        };

        $scope.clearCompletedTodos = function () {
            store.clearCompleted();
        };

        $scope.markAll = function (completed) {
            todoList.todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };
    }]);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

﻿/*global angular */

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

﻿angular.module('todomvc')
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
                console.log('start');

                store.put(work).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    work.completed = !work.completed;
                    console.log(error);
                })
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

﻿angular.module('todomvc')
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
            };/////////////////////

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
        }//////////////////////////////////////




        $scope.revertEdits = function (workList) {
            workLists[workLists.indexOf(workList)] = $scope.originalWorkList;
            $scope.editedWorkList = null;
            $scope.originalWorkList = null;
            $scope.reverted = true;
        }

        $scope.removeWorkList = function (workList) {
            store.delete(workList);
            $state.go('^');
        };

        $scope.saveWorkList = function (workList) {
            store.put(workLists);
        };

        $scope.clearCompletedWorks = function () {
            store.clearCompleted();
        };

    }]);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

﻿/*global angular */

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
angular.module('todomvc')
    .directive('todoEscape', [function () {
        'use strict';

        var ESCAPE_KEY = 27;

        return function (scope, elem, attrs) {
            elem.bind('keydown', function (event) {
                if (event.keyCode === ESCAPE_KEY) {
                    scope.$apply(attrs.todoEscape);
                }
            });

            scope.$on('$destroy', function () {
                elem.unbind('keydown');
            });
        };
    }]);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

﻿/*global angular */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
angular.module('todomvc')
    .directive('todoFocus', ['$timeout', function todoFocus($timeout) {
        'use strict';

        return function (scope, elem, attrs) {
            scope.$watch(attrs.todoFocus, function (newVal) {
                if (newVal) {
                    $timeout(function () {
                        elem[0].focus();
                    }, 0, false);
                }
            });
        };
    }]);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

﻿/*global angular */

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



/***/ }),
/* 7 */
/***/ (function(module, exports) {

﻿/*global angular */

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



/***/ }),
/* 8 */
/***/ (function(module, exports) {

﻿angular.module('todomvc')
              
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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

﻿/*global angular */

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

            api: $resource('/api/workitems/:id', null,
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

                return store.listApi.get({ id: id },
                    
                    function (resp) {
                        angular.copy(resp, store.workList);
                    },

                    function (error) {
                        var x;
                    })

                    .$promise;
            },

            insert: function (work) {
                var originalWorks = store.workList.works.slice(0);

                var temp =  store.api.save(work,
                    function success(resp) {
                        work.id = resp.id;
                        store.workList.works.push(work);
                    }, function error() {
                        angular.copy(originalWorks, store.workList.works);
                    })
                    .$promise;

                
                return temp;
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



/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "\r\n<ol>\r\n    <li>\r\n        <!--<p><a href=\"#!/todo-lists\">Todo Lists</a></p>-->\r\n        <p><a ui-sref=\"todoLists\">Todo Lists</a></p>\r\n        \r\n    </li>\r\n    <li>\r\n        <!--<p><a href=\"#!/work-lists\">Work Lists</a></p>-->\r\n        <p><a ui-sref=\"workLists\">Work Lists</a></p>\r\n    </li>\r\n</ol>"

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<section class=\"todoapp todo-lists\">\r\n    <header class=\"header\">\r\n        <h1>todo lists</h1>\r\n        <form class=\"todo-form\" ng-submit=\"addTodoList()\">\r\n            <input class=\"new-todo\" placeholder=\"How todo list should be named?\" ng-model=\"newTodoList\" ng-disabled=\"saving\" autofocus>\r\n        </form>\r\n    </header>\r\n    <section class=\"main\" ng-show=\"todoLists.length\" ng-cloak>\r\n        <ul class=\"todo-list\">\r\n            <li ui-sref-active=\"active\" ng-repeat=\"todoList in todoLists | filter:statusFilter track by $index\" ng-class=\"{ editing: todoList == editedTodoList}\">\r\n                <!--<a ui-sref=\"todoLists.todos({id:todoList.id})\">\r\n                    <label ng-dblclick=\"editTodoList(todoList)\">{{todoList.title}}</label>\r\n                </a>-->\r\n                <div class=\"view\" ui-sref=\"todoLists.todos({id:todoList.id})\">\r\n                    <label ng-dblclick=\"editTodoList(todoList)\">{{todoList.title}}</label>\r\n                    <button class=\"destroy\" ng-click=\"removeTodoList(todoList)\"></button>\r\n                </div>\r\n                <form ng-submit=\"saveEdits(todoList, 'submit')\">\r\n                    <input class=\"edit\" ng-trim=\"false\" ng-model=\"todoList.title\" todo-escape=\"revertEdits(todoList)\" ng-blur=\"saveEdits(todoList, 'blur')\"\r\n                           todo-focus=\"todoList == editedTodoList\">\r\n                </form>\r\n            </li>\r\n        </ul>\r\n    </section>\r\n</section>\r\n\r\n<div ui-view=\"\" class=\"todos\"></div>"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "\r\n    <section class=\"todoapp\">\r\n        <header class=\"header\">\r\n            <h1>todos</h1>\r\n            <form class=\"todo-form\" ng-submit=\"addTodo()\">\r\n                <input class=\"new-todo\" placeholder=\"What needs to be done?\" ng-model=\"newTodo\" ng-disabled=\"saving\" autofocus>\r\n            </form>\r\n        </header>\r\n        <section class=\"main\" ng-show=\"todoList.todos.length\" ng-cloak>\r\n            <input class=\"toggle-all\" type=\"checkbox\" ng-model=\"allChecked\" ng-click=\"markAll(allChecked)\">\r\n            <label for=\"toggle-all\">Mark all as complete</label>\r\n            <ul class=\"todo-list\">\r\n                <li ng-repeat=\"todo in todoList.todos | filter:statusFilter track by $index\" ng-class=\"{completed: todo.completed, editing: todo == editedTodo}\">\r\n                    <div class=\"view\">\r\n                        <input class=\"toggle\" type=\"checkbox\" ng-model=\"todo.completed\" ng-change=\"toggleCompleted(todo)\">\r\n                        <label ng-dblclick=\"editTodo(todo)\">{{todo.title}}</label>\r\n                        <button class=\"destroy\" ng-click=\"removeTodo(todo)\"></button>\r\n                    </div>\r\n                    <form ng-submit=\"saveEdits(todo, 'submit')\">\r\n                        <input class=\"edit\" ng-trim=\"false\" ng-model=\"todo.title\" todo-escape=\"revertEdits(todo)\" ng-blur=\"saveEdits(todo, 'blur')\"\r\n                               todo-focus=\"todo == editedTodo\">\r\n                    </form>\r\n                </li>\r\n            </ul>\r\n        </section>\r\n        <footer class=\"footer\" ng-show=\"todoList.todos.length\" ng-cloak>\r\n            <span class=\"todo-count\">\r\n                <strong>{{remainingCount}}</strong>\r\n                <ng-pluralize count=\"remainingCount\" when=\"{ one: 'item left', other: 'items left' }\"></ng-pluralize>\r\n            </span>\r\n            <ul class=\"filters\">\r\n                <li>\r\n                    <a ng-class=\"{selected: status == ''} \" ui-sref=\"todoLists.todos({id:todoList.id, status: null})\" >All</a>\r\n                </li>\r\n                <li>\r\n                    <a ng-class=\"{selected: status == 'active'}\" ui-sref=\"todoLists.todos({id:todoList.id, status: 'active'})\" >Active</a>\r\n                </li>\r\n                <li>\r\n                    <a ng-class=\"{selected: status == 'completed'}\" ui-sref=\"todoLists.todos({id:todoList.id, status: 'completed'})\">Completed</a>\r\n                </li>\r\n            </ul>\r\n            <button class=\"clear-completed\" ng-click=\"clearCompletedTodos()\" ng-show=\"completedCount\">Clear completed</button>\r\n        </footer>\r\n    </section>"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<section class=\"todoapp todo-lists\">\r\n\r\n    <header class=\"header\">\r\n        <h1>work lists</h1>\r\n        <form class=\"todo-form\" ng-submit=\"addWorkList()\">\r\n            <input class=\"new-todo\" placeholder=\"How work list should be named?\" ng-model=\"newWorkList\" ng-disabled=\"saving\" autofocus>\r\n        </form>\r\n    </header>\r\n\r\n    <section class=\"main\" ng-show=\"workLists.length\" ng-cloak>\r\n        <ul class=\"todo-list\">\r\n            <li ui-sref-active=\"active\" ng-repeat=\"workList in workLists | filter:statusFilter track by $index\" ng-class=\"{ editing: workList == editedWorkList}\"> \r\n\r\n\r\n                <div class=\"view\" ui-sref=\"workLists.works({id:workList.id})\">\r\n                    <label ng-dblclick=\"editWorkList(workList)\">{{workList.title}}</label>\r\n                    <button class=\"destroy\" ng-click=\"removeWorkList(workList)\"></button>\r\n                </div>\r\n\r\n                <form ng-submit=\"saveEdits(workList, 'submit')\">\r\n                    <input class=\"edit\" ng-trim=\"false\" ng-model=\"workList.title\" work-escape=\"revertEdits(workList)\" ng-blur=\"saveEdits(workList, 'blur')\"\r\n                           work-focus=\"workList == editedWorkList\">\r\n                </form>\r\n            </li>\r\n        </ul>\r\n    </section>\r\n\r\n</section>\r\n\r\n<div ui-view=\"\" class=\"todos\"></div>"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "\r\n<section class=\"todoapp\">\r\n    <header class=\"header\">\r\n        <h1>works</h1>\r\n        <form class=\"todo-form\" ng-submit=\"addWork()\">\r\n            <input class=\"new-todo\" placeholder=\"What needs to be done?\" ng-model=\"newWork\" ng-disabled=\"saving\" autofocus>\r\n        </form>\r\n    </header>\r\n    <section class=\"main\" ng-show=\"workList.works.length\" ng-cloak>\r\n\r\n        <input class=\"toggle-all\" type=\"checkbox\" ng-model=\"allChecked\" ng-click=\"markAll(allChecked)\">\r\n\r\n        <label for=\"toggle-all\">Mark all as complete</label>\r\n\r\n        <ul class=\"todo-list\">\r\n\r\n            <li ng-repeat=\"work in workList.works | filter:statusFilter track by $index\" ng-class=\"{completed: work.completed, editing: work == editedWork}\">\r\n\r\n                <div class=\"view\">\r\n                    <input class=\"toggle\" type=\"checkbox\" ng-model=\"work.completed\" ng-change=\"toggleCompleted(work)\">\r\n                    <label ng-dblclick=\"editWork(work)\">{{work.title}}</label>\r\n                    <button class=\"destroy\" ng-click=\"removeWork(work)\"></button>\r\n                </div>\r\n\r\n                <form ng-submit=\"saveEdits(work, 'submit')\">\r\n                    <input class=\"edit\" ng-trim=\"false\" ng-model=\"work.title\" work-escape=\"revertEdits(work)\" ng-blur=\"saveEdits(work, 'blur')\"\r\n                           work-focus=\"work == editedWork\">\r\n                </form>\r\n            </li>\r\n        </ul>\r\n    </section>\r\n    <footer class=\"footer\" ng-show=\"workList.works.length\" ng-cloak>\r\n        <span class=\"todo-count\">\r\n            <strong>{{remainingCount}}</strong>\r\n            <ng-pluralize count=\"remainingCount\" when=\"{ one: 'item left', other: 'items left' }\"></ng-pluralize>\r\n        </span>\r\n        <ul class=\"filters\">\r\n            <li>\r\n                <a ng-class=\"{selected: status == ''} \" ui-sref=\"workLists.works({id:workList.id, status: null})\">All</a>\r\n            </li>\r\n            <li>\r\n                <a ng-class=\"{selected: status == 'active'}\" ui-sref=\"workLists.works({id:workList.id, status: 'active'})\">Active</a>\r\n            </li>\r\n            <li>\r\n                <a ng-class=\"{selected: status == 'completed'}\" ui-sref=\"workLists.works({id:workList.id, status: 'completed'})\">Completed</a>\r\n            </li>\r\n        </ul>\r\n        <button class=\"clear-completed\" ng-click=\"clearCompletedWorks()\" ng-show=\"completedCount\">Clear completed</button>\r\n    </footer>\r\n</section>"

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Content_css_index_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Content_css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Content_css_index_css__);
﻿/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */



angular.module('todomvc', ['ui.router', 'ngResource'])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('options', {
                url: '/',
                template: __webpack_require__(14)  
            })
            .state('workLists', {
                url: '/work-lists',
                template: __webpack_require__(17),
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
                template: __webpack_require__(15),
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
                template: __webpack_require__(16), 
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
                template: __webpack_require__(18),
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

__webpack_require__(4);
__webpack_require__(5);

__webpack_require__(6);
__webpack_require__(7);

__webpack_require__(8);
__webpack_require__(9);

__webpack_require__(1);
__webpack_require__(0);

__webpack_require__(3);
__webpack_require__(2);


/***/ })
],[19]);
//# sourceMappingURL=app.bundle.js.map