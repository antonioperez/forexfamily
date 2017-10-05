(function () {

    angular
        .module('app')
        .controller('HelpCtrl', [
            '$http',
            '$scope',
            Ctrl
        ]);

    function Ctrl($http, $scope) {

        $scope.section = 'base';

    }
})();