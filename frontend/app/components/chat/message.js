(function () {
    
      angular
        .module('app')
        .controller('ChatMessageCtrl', [
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

          self.saveMessage = function() {
            var currentUser = self.currentUser;
            console.log(currentUser);
            
            var textfield = $('#summernote');
            messageInput = textfield.summernote('code');
            var plainText = $(messageInput).text();

            // Check that the user entered a message and is signed in.
            if (messageInput && currentUser && plainText.length > 0) {
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
                textfield.summernote("reset");
                // this.toggleButton();
              }).catch(function(error) {
                console.error('Error writing new message to Firebase Database', error);
              });
            }
          };
        }    
    })();