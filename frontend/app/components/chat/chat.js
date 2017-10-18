(function () {

  angular
    .module('app')
    .controller('ChatCtrl', [
      '$http',
      '$scope', '$timeout',
      Ctrl
    ]);

    function Ctrl ($http, $scope, $timeout) {
      var vm = this;
      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      var database = firebase.database();
      
      vm.currentUser = auth.currentUser;
      vm.messages = {};
      
      var setMessage = function(data) {
        $timeout(function(){
          var val = data.val();
          var key = data.key;
          vm.messages[key] = val;
          console.log(vm.messages);
        },0);
      }

      vm.loadMessages = function() {
        // Reference to the /messages/ database path.
        var loadLimit = 12;
        this.messagesRef = database.ref('messages');
        this.messagesRef.off();
        // Loads the last x messages and listen for new/edited ones.
        this.messagesRef.limitToLast(loadLimit).on('child_added', setMessage);
        this.messagesRef.limitToLast(loadLimit).on('child_changed', setMessage);
        this.messagesRef.limitToLast(loadLimit).on('child_removed', setMessage);
      }

      vm.saveMessage = function(messageInput) {
        var currentUser = vm.currentUser;
        console.log(currentUser);
        // Check that the user entered a message and is signed in.
        if (messageInput && currentUser) {
          // Add a new message entry to the Firebase Database.
          //UTC
          var milliseconds = Math.floor((new Date()).getTime() / 1000)
          this.messagesRef = database.ref('messages');
          this.messagesRef.push({
            name: currentUser.email,
            text: messageInput,
            time: milliseconds,
            photoUrl: currentUser.photoURL || '/components/layout/logo.png'

          }).then(function() {
            // Clear message text field and SEND button state.
            // FriendlyChat.resetMaterialTextfield(this.messageInput);
            // this.toggleButton();
          }).catch(function(error) {
            console.error('Error writing new message to Firebase Database', error);
          });
        }
      };

      vm.loadMessages();

    }

})();