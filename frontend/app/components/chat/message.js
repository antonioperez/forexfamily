(function () {

  angular
    .module('app')
    .controller('ChatMessageCtrl', [
      '$http',
      '$timeout',
      'FileUploader',
      Ctrl
    ]);

  function Ctrl($http, $timeout, FileUploader) {
    var self = this;

    self.uploader = new FileUploader();
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();
    var database = firebase.database();
    self.currentUser = auth.currentUser;

    self.saveMessage = function (message) {

      var currentUser = self.currentUser;
      console.log(currentUser);

      var textfield = $('#summernote');
      messageInput = textfield.summernote('code');
      var plainText = $(messageInput).text();

      if (message) {
        messageInput = message;
      }

      // Check that the user entered a message and is signed in.
      if (messageInput && currentUser && plainText.length > 0) {
        // Add a new message entry to the Firebase Database.
        //UTC
        var milliseconds = Math.floor((new Date()).getTime() / 1000)
        this.messagesRef = database.ref('messages');
        this.messagesRef.push({
          userid: currentUser.uid,
          name: currentUser.displayName,
          text: messageInput,
          time: milliseconds,
          photoUrl: currentUser.photoURL || '/components/layout/logo.png'

        }).then(function () {
          // Clear message text field and SEND button state.
          textfield.summernote("reset");
          // this.toggleButton();
        }).catch(function (error) {
          console.error('Error writing new message to Firebase Database', error);
        });
      }
    };

    function writeUserData(userId, filename, size, downloadUrl, lastModified) {
      //fancy hashing algorithm goes here for name
      var encodedData = window.btoa(filename);
      var newRef = database.ref('uploads/' + userId).child(encodedData);
      newRef.set({
        name: filename,
        size: size,
        downloadUrl: downloadUrl,
        lastModified: lastModified
      });
      self.saveMessage(downloadUrl);
      console.log(downloadUrl);
    }

    self.uploader.uploadItem = function (value) {

      //HAD TO OVERWRITE EXISTING UPLOAD ITEM FUNCTION. 
      //BECAUSE IT IS SENDING TO A LOCAL PORT/URL. NEED TO SEND TO FIREBASE INSTEAD
      var self = this;
      var file = value._file;
      console.log("hello");
      
      storageRef.child(user.uid + '/' + file.name).put(file).then(function (snapshot) {
        console.log("upload");
        var downloadURL = snapshot.downloadURL;
        item.isSuccess = true;
        item.isCancel = false;
        item.isError = false;
        writeUserData(user.uid, file.name, file.size, downloadURL, file.lastModified);
        self._render();

      }, function (error) {
        
        console.log(error);
      });


      var index = this.getIndexOfItem(value);
      var item = this.queue[index];
      var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

      item._prepareToUploading();
      if (this.isUploading) return;

      this._onBeforeUploadItem(item);
      if (item.isCancel) return;

      item.isUploading = true;
      this.isUploading = true;
      this[transport](item);
      this._render();
    };
  }
})();