(function () {

  angular
    .module('app')
    .config([ '$stateProvider', config ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.gsp', {
        data: {
          pageTitle: 'gsp'
        },
        templateUrl: 'components/gsp/gsp.getting-started.html',
        url: '/gsp-getting-started'
      });
  }

})();