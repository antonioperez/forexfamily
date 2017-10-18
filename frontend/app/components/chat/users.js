(function () {
    
      angular
        .module('app')
        .controller('ChatUsersCtrl', [
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
        
          self.loadUsers();
    
        }
    
    })();