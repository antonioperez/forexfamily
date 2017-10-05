(function () {

  angular
    .module('app')
    .config([
      '$stateProvider',
      config
    ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.uploads', {
        controller: 'UploadsCtrl',
        controllerAs: 'uploads',
        url: "/gsa-uploads",
        templateUrl: "components/filemanager/filemanager.html",
        data: {
          pageTitle: 'Uploads'
        }
      });
  }

})();