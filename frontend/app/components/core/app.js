(function () {

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl() {
    
    var self = this;
    var auth = firebase.auth();

    self.currentUser = auth.currentUser;
       
  }

})();