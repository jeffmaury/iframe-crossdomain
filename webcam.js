/*global console */

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || undefined;

function initializeWebcamSwiper() {
	if (navigator.getUserMedia === undefined) {
		if (console !== undefined) {
			console.log("Browser doesn't support getUserMedia");
			return;
		}
	}

	navigator.getUserMedia({video: true}, function (stream) {
		window.webcamSwiperStream = stream;

		// Create a video element and set its source to the stream from the webcam
		var videoElement = document.createElement("video");
		//videoElement.style.display = "none";
		videoElement.autoplay = true;
		if (window.URL === undefined) {
			window.URL = window.webkitURL;
		}
		videoElement.src = window.URL.createObjectURL(stream);
		alert(videoElement.src);
		document.getElementsByTagName("body")[0].appendChild(videoElement);

		// Wait for the video element to initialize
		});
}

function destroyWebcamSwiper() {
	if (window.webcamSwiperInterval !== undefined) {
		clearInterval(window.webcamSwiperInterval);
		window.webcamSwiperInterval = undefined;
	}
	if (window.webcamSwiperStream !== undefined) {
		window.webcamSwiperStream.stop();
		window.webcamSwiperStream = undefined;
	}
}
