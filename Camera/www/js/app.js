
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.getElementById("capturar").onclick = cameraApp;
    document.getElementById("mcapture").onclick = ImageCaptureApp;//mediaCaptureApp;

}

function cameraApp() {
    navigator.camera.getPicture(onPictureSuccess, onPictureFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        sourceType: Camera.PictureSourceType.CAMERA,
        cameraDirection: Camera.Direction.FRONT,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 200,
        targetHeight: 200,
    })
}

function onPictureSuccess(imageURI) {

    console.log("imageURI camera: ", imageURI);
    // document.getElementById('imagem').src = imageURI;
    // document.querySelector('url').innerHT = imageURI;

    window.resolveLocalFileSystemURL(imageURI, resolvePictureOnSuccess, resOnError)

}

function onPictureFail(message) {
    alert('Failed because: ' + message);
}

function resOnError(error) {
    alert('resOnError: ' + error.code);
}

function resolvePictureOnSuccess(entry) {

    console.log("entry camera: ", entry)

    entry.file(function (fileInput) {

        console.log("fileInput camera: ", fileInput)

        let reader = new FileReader();
        reader.onloadend = function (evt) {

            console.log("evt camera: ", evt)

            let base64 = evt.target.result;
            let imgBase64 = document.getElementById("imagem");
            imgBase64.src = base64;

            console.log("base64 camera: ", base64)

        };
        reader.readAsDataURL(fileInput);
    }, function () { alert('fail on trying to read the file.') });
}


let captureSuccess = function(mediaFiles) {
    let i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i++) {
        path = mediaFiles[i].fullPath;

        console.log("path media: ", path)

        window.resolveLocalFileSystemURL(path, resolveVideoOnSuccess, resOnError)
    }
}

let captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

function resolveVideoOnSuccess(entry) {

    console.log("entry media: ", entry)

    entry.file(function (fileInput) {

        console.log("fileInput media: ", fileInput)

        let reader = new FileReader();
        reader.onloadend = function (evt) {
            console.log("evt media: ", evt)
            let base64 = evt.target.result;
            let imgBase64 = document.getElementById("imagem");
            imgBase64.src = base64;

            console.log("base64 media: ", base64)
        };
        reader.readAsDataURL(fileInput);
    }, function () { alert('fail on trying to read the file.') });
}

function mediaCaptureApp() {
    navigator.device.capture.captureVideo(
        captureSuccess, captureError, { duration: 20 }
    );
}

function ImageCaptureApp() {
    navigator.device.capture.captureImage(
        captureSuccess, captureError
    );
}