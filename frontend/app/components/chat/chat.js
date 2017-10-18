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
      self.users = {};
      
      var setMessage = function(data) {
        $timeout(function(){
          var val = data.val();
          var key = data.key;
          self.messages[key] = val;
        },0);
      }

      var setUsers = function(data) {
        $timeout(function(){
          var val = data.val();
          var key = data.key;
          self.users[key] = val;
        },0);
      }

      self.loadUsers = function() {
        // Reference to the /messages/ database path.
        var loadLimit = 25;
        this.messagesRef = database.ref('user');
        this.messagesRef.off();
        // Loads the last x messages and listen for new/edited ones.
        this.messagesRef.limitToLast(loadLimit).on('child_added', setUsers);
        this.messagesRef.limitToLast(loadLimit).on('child_changed', setUsers);
        this.messagesRef.limitToLast(loadLimit).on('child_removed', setUsers);
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

      self.saveMessage = function(messageInput) {
        var currentUser = self.currentUser;
        console.log(currentUser);
        // Check that the user entered a message and is signed in.
        if (messageInput && currentUser) {
          // Add a new message entry to the Firebase Database.
          //UTC
          var milliseconds = Math.floor((new Date()).getTime() / 1000)
          this.messagesRef = database.ref('messages');
          this.messagesRef.push({
            userid : currentUser.uid,
            name: currentUser.displayName,
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

      self.loadMessages();
      self.loadUsers();

    }

})();