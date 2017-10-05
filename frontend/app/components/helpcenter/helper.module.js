(function () {

  angular
    .module('app')
    .config([
      '$stateProvider',
      config
    ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.helpcenter', {
        controller: 'HelpCtrl',
        controllerAs: 'helper',
        url: "/helpcenter",
        templateUrl: "components/helpcenter/base.html",
        data: { 
          pageTitle: 'Help Center'
        }
      });
  }

})();