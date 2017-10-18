(function () {

    angular
        .module('app')
        .controller('AccountCtrl', [
            '$http',
            '$scope',
            '$location',
            '$state',
            '$cookies',
            Ctrl
        ]);

    function Ctrl($http, $scope, $location, $state, $cookies) {

        var auth = firebase.auth();
        var self = this;

        self.database = firebase.database();
        //demo info
        $scope.email = "user@forexfamily.com";
        $scope.password = "demo123";

        var sendEmailVerification = function () {
            auth.currentUser.sendEmailVerification().then(function () {
                console.log('Email Verification Sent!');
            });
        }

        var signin = function (email, password) {
            // Sign in with email and pass.
            $state.go('index.chat');
            auth.signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    $cookies.put('user', user);
                    console.log(user);
                    self.database.ref('user/' + user.uid).set({
                        online : true,
                    })
                    $state.go('index.chat');
                })
                .catch(function (error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        console.log('Wrong password.');
                    } else {
                        console.log(errorMessage);
                    }
                    $scope.errorMessage = errorMessage;
                });
        }

        var signup = function (email, password, username) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(function (user) {
                    sendEmailVerification();
                    $cookies.put('user', user);
                    user.updateProfile({
                        displayName : username
                    }) 
                    self.database.ref('user/' + user.uid).set({
                        online : true, 
                    }) 
                    $state.go('index.chat');
                })
                .catch(function (error) {
                    var errorMessage = error.message;
                    $scope.errorMessage = errorMessage;
                });
        }

        $scope.socialLogin = function(provider) {
            
            switch(provider) {
                case 'facebook':
                    provider = new firebase.auth.FacebookAuthProvider();
                    break;
                case 'google':
                    provider = new firebase.auth.GoogleAuthProvider();
                    break;
                case 'twitter':
                    provider = new firebase.auth.TwitterAuthProvider();
                    break;
            }

            auth.signInWithPopup(provider).then(function(user) {
                console.log("Logged in as: " + user.uid);
            }, function(error) {
                console.error("Login failed: " + error);
            });
        }


        function sendPasswordReset(email) {
            auth.sendPasswordResetEmail(email).then(function () {
                $scope.message = 'Password Reset Email Sent!';
            }).catch(function (error) {
                var errorMessage = error.message;
                $scope.errorMessage = errorMessage;
            });
        }

        $scope.sendPasswordReset = function () {
            sendPasswordReset($scope.email);
        };


        $scope.signIn = function () {

            if (auth.currentUser) {
                auth.signOut();
            }
            $scope.password = $scope.password.trim();
            $scope.email = $scope.email.trim();
            if ($scope.email.length < 1) {
                alert('Please enter an email address.');
                return;
            }
            if ($scope.password.length < 4) {
                alert('Your Password is too short');
                return;
            }

            // Sign in with email and pass.
            signin($scope.email, $scope.password);
        }

        $scope.signUp = function () {
            $scope.password = $scope.password.trim();
            $scope.email = $scope.email.trim();
            $scope.username = $scope.username.trim();
            if ($scope.email.length < 1) {
                alert('Please enter an email address.');
                return;
            }
            if ($scope.password.length < 1) {
                alert('Please enter a password.');
                return;
            }
            // Sign in with email and pass.
            signup($scope.email, $scope.password, $scope.username);
        }

        $scope.signOut = function () {
            console.log(auth.currentUser);

            if (auth.currentUser) {
                console.log(auth.currentUser);
                self.database.ref('user/' + auth.currentUser.uid).set({
                    online : false, 
                })
                auth.signOut();
                $cookies.remove('user');
                $state.go('login');
            }
            
        }

    }
})();