angular.module('work')
    .controller('TitleMirrorCtrl', ['$scope', 'mirrorComposer', function ($scope, mirrorComposer) {
        
        $scope.$watch(angular.bind(this, function () {
            return $scope.newWork;
        }), function (newVal) {
            $scope.mirror = mirrorComposer.getStr($scope.newWork);
        });

        $scope.$watch(angular.bind(this, function () {
            if ($scope.editedWork !== null) {
                return $scope.editedWork.title;
            }
        }), function (newVal) {
            if ($scope.editedWork !== null) {
                $scope.mirror = mirrorComposer.getStr($scope.editedWork.title);
            }
        });
    }]);
