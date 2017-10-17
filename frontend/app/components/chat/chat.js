(function () {

  angular
    .module('app')
    .controller('ChatCtrl', [
      '$http',
      '$scope',
      Ctrl
    ]);

    function Ctrl ($http, $scope) {
      var vm = this;
      var database = firebase.database();
      
      vm.loadMessages = function() {
        // Reference to the /messages/ database path.
        this.messagesRef = database.ref('messages');
        // Make sure we remove all previous listeners.
        this.messagesRef.off();
      
        // Loads the last 12 messages and listen for new ones.
        var setMessage = function(data) {
          var val = data.val();
          console.log(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
        }.bind(this);
        this.messagesRef.limitToLast(12).on('child_added', setMessage);
        this.messagesRef.limitToLast(12).on('child_changed', setMessage);
      }

      vm.saveMessage = function(e) {
        e.preventDefault();
        // Check that the user entered a message and is signed in.
        if (this.messageInput.value && this.checkSignedInWithMessage()) {
          var currentUser = this.auth.currentUser;
          // Add a new message entry to the Firebase Database.
          this.messagesRef.push({
            name: currentUser.displayName,
            text: this.messageInput.value,
            photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
          }).then(function() {
            // Clear message text field and SEND button state.
            FriendlyChat.resetMaterialTextfield(this.messageInput);
            this.toggleButton();
          }.bind(this)).catch(function(error) {
            console.error('Error writing new message to Firebase Database', error);
          });
        }
      };

      vm.loadMessages();

    }

})();