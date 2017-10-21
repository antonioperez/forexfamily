(function () {
    
      angular
        .module('app')
        .controller('ChatRoomsCtrl', [
          '$http',
          '$scope', '$timeout',
          Ctrl
        ]);
    
        function Ctrl ($http, $scope, $timeout) {
          var self = this;
          var auth = firebase.auth();
          var database = firebase.database();
          
          self.currentUser = auth.currentUser;
          self.rooms = {};
          
          var setRooms = function(data) {
            $timeout(function(){
              var val = data.val();
              var key = data.key;
              self.rooms[key] = val;
              
            },0);
          }
    
          self.loadRooms = function() {
            // Reference to the /messages/ database path.
            var loadLimit = 12;
            this.roomsRef = database.ref('rooms');
            this.roomsRef.off();
            // Loads the last x messages and listen for new/edited ones.
            this.roomsRef.limitToLast(loadLimit).on('child_added', setRooms);
            this.roomsRef.limitToLast(loadLimit).on('child_changed', setRooms);
            this.roomsRef.limitToLast(loadLimit).on('child_removed', setRooms);
            
          }
    
          self.loadRooms();
    
        }
    
    })();