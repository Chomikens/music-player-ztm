import songs from "./song.js";
import {
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
} from "./domElements.js";

// Function to create a music player
function createMusicPlayer(songList) {
  // DOM elements
  const playButton = getPlayButton();
  const playIcon = getPlayIcon();
  const pauseIcon = getPauseIcon();
  const audioElement = getAudioElement();
  const titleElement = getTitleElement();
  const artistElement = getArtistElement();
  const coverImage = getCoverImage();
  const durationElement = getDurationElement();
  const currentTimePlayer = getCurrentTimeElement();
  const progressBar = getProgressBar();

  // Current song index
  let currentSongIndex = 0;

  // Function to render a song
  function renderSong() {
    const currentSong = songList[currentSongIndex];
    coverImage.src = `src/img/${currentSong.name}.jpg`;
    titleElement.textContent = currentSong.displayName;
    artistElement.textContent = currentSong.artist;
    audioElement.src = `src/mp3/${currentSong.name}.mp3`;

    coverImage.onload = function () {
      coverImage.setAttribute("height", coverImage.naturalHeight);
      coverImage.setAttribute("width", coverImage.naturalWidth);
    };

    audioElement.onloadedmetadata = function () {
      durationElement.textContent = formatTime(audioElement.duration);
    };
  }

  // Function to show the play button
  function showPlayButton() {
    playIcon.classList.replace("hidden", "shown");
    pauseIcon.classList.replace("shown", "hidden");
    playButton.dataset.musicState = "play";
    playButton.setAttribute("title", "Play song");
  }

  // Function to show the pause button
  function showPauseButton() {
    playIcon.classList.replace("shown", "hidden");
    pauseIcon.classList.replace("hidden", "shown");
    playButton.dataset.musicState = "pause";
    playButton.setAttribute("title", "Pause song");
  }

  // Function to update the progress bar
  function updateProgressBar(e) {
    const { currentTime, duration } = e.srcElement;
    currentTimePlayer.textContent = formatTime(currentTime);
    const progressPercent = Math.floor((currentTime / duration) * 100);
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute("aria-valuenow", `${progressPercent}%`);
  }

  // Function to play audio
  function playAudio() {
    audioElement.play();
    audioElement.addEventListener("timeupdate", updateProgressBar);
  }

  // Function to pause audio
  function pauseAudio() {
    audioElement.pause();
    audioElement.removeEventListener("timeupdate", updateProgressBar);
  }

  // Function to play the next song
  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    renderSong();
  }

  // Function to play the previous song
  function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    renderSong();
  }

  // Function to format time in minutes and seconds
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Return the functions to control the music player
  return {
    renderSong,
    playNextSong,
    playPreviousSong,
    showPlayButton,
    showPauseButton,
    playAudio,
    pauseAudio,
  };
}

// Create a music player instance
const musicPlayer = createMusicPlayer(songs);
musicPlayer.renderSong();

// Function to handle control button clicks
function handleControlButtons(e) {
  const clickedButton = e.target.closest("button");
  if (!clickedButton) return;

  switch (clickedButton.dataset.musicState) {
    case "play":
      musicPlayer.showPauseButton();
      musicPlayer.playAudio();
      break;
    case "pause":
      musicPlayer.showPlayButton();
      musicPlayer.pauseAudio();
      break;
    case "next":
      musicPlayer.playNextSong();
      musicPlayer.playAudio();
      musicPlayer.showPauseButton();
      break;
    case "prev":
      musicPlayer.playPreviousSong();
      musicPlayer.playAudio();
      musicPlayer.showPauseButton();
      break;
    default:
      console.error("Unknown action");
  }
}

// Add event listener to the button container
const buttonContainer = getButtonContainer();
buttonContainer.addEventListener("click", handleControlButtons);
