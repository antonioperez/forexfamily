(function () {

  angular
    .module('app')
    .controller('ChatCtrl', [
      '$http',
      '$scope', '$timeout',
      Ctrl
    ]);

    function Ctrl ($http, $scope, $timeout) {
      var self = this;
      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      var database = firebase.database();
      
      self.currentUser = auth.currentUser;
      self.messages = {};
      
      var setMessage = function(data) {
        $timeout(function(){
          var val = data.val();
          var key = data.key;
          self.messages[key] = val;
        },0);
      }

      self.loadMessages = function() {
        // Reference to the /messages/ database path.
        var loadLimit = 12;
        this.messagesRef = database.ref('messages');
        this.messagesRef.off();
        // Loads the last x messages and listen for new/edited ones.
        this.messagesRef.limitToLast(loadLimit).on('child_added', setMessage);
        this.messagesRef.limitToLast(loadLimit).on('child_changed', setMessage);
        this.messagesRef.limitToLast(loadLimit).on('child_removed', setMessage);
      }

      self.loadMessages();

    }

})();