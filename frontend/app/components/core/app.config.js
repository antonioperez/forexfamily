(function () {

  angular
    .module('app')
    .config([ '$stateProvider', '$urlRouterProvider', config ])
    .run([ '$rootScope', '$state', function($rootScope, $state) {
      $rootScope.$state = $state;
    }])
    .run(['$rootScope', '$state', '$cookies', statesConfig]);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "components/layout/content.html",
      })
  }

  function statesConfig ($rootScope, $state, $cookies) {
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams) {
      var fUser = firebase.auth().currentUser;
      

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          

        } else {
          if (toState.name !== 'login' && toState.name !== 'register') {
            evt.preventDefault();
            $state.go('login');
          }
        }
      });

    });
  }

})();