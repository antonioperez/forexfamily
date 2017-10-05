(function () {

  angular
    .module('app')
    .config([ '$stateProvider', config ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.gsa', {
        data: {
          pageTitle: 'GSA'
        },
        templateUrl: 'components/gsa/gsa.getting-started.html',
        url: '/gsa-getting-started'
      })
      .state('index.gsa-forms', {
        controller: 'GSACtrl',
        controllerAs: 'gsa',
        data: {
          pageTitle: 'GSA Forms'
        },
        templateUrl: 'components/gsa/gsa.question.html',
        url: '/gsa-forms'
      })
  }
})();