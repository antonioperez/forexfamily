(function () {

    angular
        .module('app')
        .controller('UploadsCtrl', [
            '$http',
            '$scope',
            'FileUploader',
            Ctrl
        ]);

    function Ctrl($http, $scope, FileUploader) {


        var uploader = $scope.uploader = new FileUploader();
        var auth = firebase.auth();
        var storageRef = firebase.storage().ref();
        var database = firebase.database();
        var user = auth.currentUser;
        var recentFilesRef = {};
        $scope.uploadedFiles = [];
        if (user) {
            recentFilesRef = database.ref('uploads/'+ user.uid).limitToLast(10);
            recentFilesRef.on('child_added', function (data) {
                var childData = data.val();
                $scope.uploadedFiles.push(childData);
                $scope.$apply();
            });
        }
       
        function writeUserData(userId, filename, size, downloadUrl, lastModified) {
            //fancy hashing algorithm goes here
            var encodedData = window.btoa(filename);
            var newRef = database.ref('uploads/' + userId).child(encodedData);
            newRef.set({
                name: filename,
                size: size,
                downloadUrl: downloadUrl,
                lastModified: lastModified
            });
        }

        uploader.uploadItem = function (value) {

            //HAD TO OVERWRITE EXISTING UPLOAD ITEM FUNCTION. 
            //BECAUSE IT IS SENDING TO A LOCAL PORT/URL. NEED TO SEND TO FIREBASE INSTEAD
            var self = this;
            var file = value._file;
            storageRef.child(user.uid + '/' + file.name).put(file).then(function (snapshot) {
                var downloadURL = snapshot.downloadURL;
                item.isSuccess = true;
                item.isCancel = false;
                item.isError = false;
                writeUserData(user.uid, file.name, file.size, downloadURL, file.lastModified);
                self._render();

            }, function (error) {
                // Handle unsuccessful uploads
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