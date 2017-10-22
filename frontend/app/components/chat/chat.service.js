angular.module('app')
    .service('chatservice', function () {

        var self = this;
        //default to chat. Maybe cookie on reload
        var activeChat = 'Public';

        self.auth = firebase.auth();
        self.storageRef = firebase.storage().ref();
        self.database = firebase.database();

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.currentUser = user;
            }
          });
        

        self.getActiveChat = function () {
            return activeChat;
        }

        self.setActiveChat = function (value) {
            activeChat = value;
        }


        
    });