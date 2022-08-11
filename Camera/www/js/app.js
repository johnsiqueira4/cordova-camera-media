
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.getElementById("capturar").onclick = cameraApp;
    document.getElementById("mcapture").onclick = mediaCaptureApp;

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

    alert("imageData " + imageURI);
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
    entry.file(function (fileInput) {
        let reader = new FileReader();
        reader.onloadend = function (evt) {
            let base64 = evt.target.result;
            let imgBase64 = document.getElementById("imagem");
            imgBase64.src = base64;
        };
        reader.readAsDataURL(fileInput);
    }, function () { alert('fail on trying to read the file.') });
}


let captureSuccess = function(mediaFiles) {
    let i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i++) {
        path = mediaFiles[i].fullPath;
        window.resolveLocalFileSystemURL(path, resolveVideoOnSuccess, resOnError)
    }
}

let captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

function resolveVideoOnSuccess(entry) {
    entry.file(function (fileInput) {
        let reader = new FileReader();
        reader.onloadend = function (evt) {
            let base64 = evt.target.result;
            alert("base64 " + base64);
        };
        reader.readAsDataURL(fileInput);
    }, function () { alert('fail on trying to read the file.') });
}

function mediaCaptureApp() {
    navigator.device.capture.captureVideo(
        captureSuccess, captureError, { duration: 20 }
    );
}