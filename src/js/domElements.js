//  Lazy Initialization

// Each getter function checks if the corresponding DOM element has already been queried. 
// If it has not, it queries the DOM and stores the reference. 
// If it has, it simply returns the stored reference.

let buttonContainer,
  audioElement,
  playButton,
  playIcon,
  pauseIcon,
  titleElement,
  artistElement,
  coverImage,
  durationElement,
  currentTimePlayer,
  progressBar,
  progressContainer;

const getButtonContainer = () =>
  buttonContainer ||
  (buttonContainer = document.querySelector(".player-controls"));
const getAudioElement = () =>
  audioElement || (audioElement = document.querySelector("audio"));
const getPlayButton = () =>
  playButton || (playButton = document.querySelector("button#play"));
const getPlayIcon = () =>
  playIcon || (playIcon = document.getElementById("playIcon"));
const getPauseIcon = () =>
  pauseIcon || (pauseIcon = document.getElementById("pauseIcon"));
const getTitleElement = () =>
  titleElement || (titleElement = document.querySelector("#music-title"));
const getArtistElement = () =>
  artistElement || (artistElement = document.querySelector("#music-author"));
const getCoverImage = () =>
  coverImage || (coverImage = document.querySelector("#cover-img"));
const getDurationElement = () =>
  durationElement || (durationElement = document.querySelector("#duration"));
const getCurrentTimeElement = () =>
    currentTimePlayer || (currentTimePlayer = document.querySelector("#current-time"));
const getProgressBar = () =>
    progressBar || (progressBar = document.querySelector("#progress"));
const getProgressContainer = () =>
    progressContainer || (progressContainer = document.querySelector("#progress-container"));

export {
  getButtonContainer,
  getAudioElement,
  getPlayButton,
  getPlayIcon,
  getPauseIcon,
  getTitleElement,
  getArtistElement,
  getCoverImage,
  getDurationElement,
  getCurrentTimeElement,
  getProgressBar,
  getProgressContainer,
};
