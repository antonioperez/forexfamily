(function () {

  angular
    .module('app')
    .controller('DashboardCtrl', [
      '$http',
      Ctrl
    ]);

    function Ctrl ($http) {
      var vm = this;

      function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
      }

    }

})();