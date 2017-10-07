(function () {

  angular
    .module('app')
    .controller('ChatCtrl', [
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