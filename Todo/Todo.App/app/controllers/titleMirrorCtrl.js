angular.module('todomvc')
    .controller('TitleMirrorCtrl', ['$scope', function ($scope) {

        //$scope.$watch(angular.bind(this, function () {
        //    return $scope.newWork;
        //}), function (newVal) {
        //    $scope.mirror = $scope.newWork;
        //});

        //$scope.$watch(angular.bind(this, function () {
        //    if ($scope.editedWork !== null) {
        //        return $scope.editedWork.title;
        //    }
        //}), function (newVal) {
        //    if ($scope.editedWork !== null) {
        //        $scope.mirror = $scope.editedWork.title;
        //    }
        //});

        $scope.mirror = 'ctrl: ' + $scope.mirrorString + '|';
    }]);
