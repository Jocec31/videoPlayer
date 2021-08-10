const video = document.querySelector("#myVideo");
const playPause = document.querySelector("#play-pause img");
const timer = document.querySelector("span");
const timerWrapper = document.querySelector(".orange-bar");
const timerBar = document.querySelector(".juice");
const mute = document.querySelector("#mute");
const muteIcon = document.querySelector("#mute img");
const fullScreen = document.querySelector("#full-screen");
const volumeSlider = document.getElementById("volume-slider");
const volumeLevel = document.querySelector(".volume-level");

// ---------------------------------------------
// FONCTIONS
// ---------------------------------------------

// 1 - lancer la vidéo
function playPauseVideo() {
	if (video.paused) {
		playPause.src = "./ressources/pause.svg";
		video.play();
	} else if (video.played) {
		playPause.src = "./ressources/play.svg";
		video.pause();
	}
}
playPause.addEventListener("click", playPauseVideo);
video.addEventListener("click", playPauseVideo);

// 2 - Gestion du temps écoulé

function setTime() {
	var minutes = Math.floor(video.currentTime / 60);
	var seconds = Math.floor(video.currentTime - minutes * 60);
	var minuteValue;
	var secondValue;

	if (minutes < 10) {
		minuteValue = "0" + minutes;
	} else {
		minuteValue = minutes;
	}

	if (seconds < 10) {
		secondValue = "0" + seconds;
	} else {
		secondValue = seconds;
	}

	var mediaTime = minuteValue + ":" + secondValue;
	timer.textContent = mediaTime;

	var barLength =
		timerWrapper.clientWidth * (video.currentTime / video.duration);
	timerBar.style.width = barLength + "px";

	if (video.ended) {
		playPause.src = "./ressources/play.svg";
	}
}
video.addEventListener("timeupdate", setTime);

// 3 - Cliquer sur la barre orange pour se déplacer dans la vidéo

function navigateInVideo(e) {
	// récupérer les dimensions de la barre
	let rect = timerWrapper.getBoundingClientRect();
	// console.log(rect);
	let largeur = rect.width;

	// position en pixels de notre clic sur la barre
	// rect.left = différence entre le bord gauche de la fenêtre et notre lecteur
	// clientX  = la posotion où je clique
	let x = e.clientX - rect.left;
	//console.log(x);

	// je transforme la largeur en %
	let widthPercent = (x * 100) / largeur;
	//console.log(widthPercent);

	// on récupère la durée totale de la vidéo
	let videoDuration = video.duration;

	// on calcule en pourcentage à quel endroit de la vidéo nous sommes au clic
	// cela nous donne la position en secondes par rappot au %
	video.currentTime = videoDuration * (widthPercent / 100);
	//console.log(video.currentTime);
}
timerWrapper.addEventListener("click", navigateInVideo);

//  il faut gérer également le resize de la fenêtre en mettant à jour les valeurs pour le calcul
window.addEventListener("resize", () => {
	// récupérer les dimensions de la barre
	let rect = timerWrapper.getBoundingClientRect();
	// console.log(rect);
	let largeur = rect.width;
});

// 4 - Gestion du MUTE
function mutingVideo() {
	if (video.muted === true) {
		muteIcon.src = "./ressources/mute.svg";
		video.muted = false;
	} else {
		video.muted = true;
		muteIcon.src = "./ressources/volume.svg";
	}
}
mute.addEventListener("click", mutingVideo);

// 5 - Gestion du volume
function changeVolume() {
	video.volume = volumeSlider.value / 100;
	console.log(video.volume);
	volumeLevel.innerText = `${video.volume * 100}%`;
}
volumeSlider.addEventListener("change", changeVolume);

// 6 - Gestion du FULLSCREEN
function toggleFullScreen() {
	if (!document.fullscreenElement) {
		video.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			video.exitFullscreen();
		}
	}
}

fullScreen.addEventListener("click", toggleFullScreen);

// passer en plein écran au doucle clic sur la video
video.addEventListener("dblclick", toggleFullScreen);
