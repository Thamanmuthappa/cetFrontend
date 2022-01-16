export const fullscreenWindow = () => {
	try {
		const elem = document.documentElement;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE11 */
			elem.msRequestFullscreen();
		}
	} catch (error) {
		// console.log(error);
	}
};

export const closeFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}
};

export const fullScreenListeners = (exitHandler) => {
	document.addEventListener("fullscreenchange", exitHandler, false);
	document.addEventListener("mozfullscreenchange", exitHandler, false);
	document.addEventListener("MSFullscreenChange", exitHandler, false);
	document.addEventListener("webkitfullscreenchange", exitHandler, false);
};

export const removeFullScreenListeners = (exitHandler) => {
	document.removeEventListener("fullscreenchange", exitHandler);
	document.removeEventListener("mozfullscreenchange", exitHandler);
	document.removeEventListener("MSFullscreenChange", exitHandler);
	document.removeEventListener("webkitfullscreenchange", exitHandler);
};