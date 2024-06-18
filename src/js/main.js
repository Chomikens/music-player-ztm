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
  getProgressContainer,
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
  const progressContainer = getProgressContainer();
  // Current song index
  let currentSongIndex = 0;
  // Cache for loaded songs
  const songCache = {};

  // Function to render a song
  function renderSong() {
    const currentSong = songList[currentSongIndex];

    // Check if the song is cached
    if (!songCache[currentSong.name]) {
      // Load and cache the song if not already cached
      const songUrl = `src/mp3/${currentSong.name}.mp3`;
      songCache[currentSong.name] = songUrl;
    }

    // Set the audio source
    audioElement.src = songCache[currentSong.name];

    // Update the UI elements
    coverImage.src = `src/img/${currentSong.name}.webp`;
    titleElement.textContent = currentSong.displayName;
    artistElement.textContent = currentSong.artist;

    coverImage.onload = function () {
      coverImage.setAttribute("height", coverImage.naturalHeight);
      coverImage.setAttribute("width", coverImage.naturalWidth);
    };

    audioElement.onloadedmetadata = function () {
      durationElement.textContent = formatTime(audioElement.duration);
    };

    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    currentTimePlayer.textContent = "0:00";

    // Remove previous event listeners to avoid memory leaks
    progressContainer.removeEventListener("click", updateDuration);
    audioElement.removeEventListener("timeupdate", updateProgressBar);

    progressContainer.addEventListener("click", updateDuration);
    audioElement.addEventListener("timeupdate", updateProgressBar);
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
    const progressPercent = Math.floor((currentTime / duration) * 100);

    if (currentTime) {
      currentTimePlayer.textContent = formatTime(currentTime);
      progressBar.style.width = `${progressPercent}%`;
      progressBar.setAttribute("aria-valuenow", `${progressPercent}%`);
    }

    if (progressPercent === 100) {
      playNextSong();
    }
  }

  // Manually update progressBar
  function updateDuration(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audioElement;
    audioElement.currentTime = (clickX / width) * duration;
    playAudio();
  }

  // Function to play audio
  function playAudio() {
    showPauseButton();
    audioElement.play();
  }

  // Function to pause audio
  function pauseAudio() {
    showPlayButton();
    audioElement.pause();
  }

  // Function to play the next song
  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    renderSong();
    playAudio();
  }

  // Function to play the previous song
  function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    renderSong();
    playAudio();
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
      musicPlayer.playAudio();
      break;
    case "pause":
      musicPlayer.pauseAudio();
      break;
    case "next":
      musicPlayer.playNextSong();
      break;
    case "prev":
      musicPlayer.playPreviousSong();
      break;
    default:
      console.error("Unknown action");
  }
}

// Add event listener to the button container
const buttonContainer = getButtonContainer();
buttonContainer.addEventListener("click", handleControlButtons);

// Add swipe detection to the player container
const playerContainer = document.querySelector('.player-container'); // Adjust this selector to your actual container
playerContainer.addEventListener('touchstart', handleTouchStart, false);
playerContainer.addEventListener('touchend', handleTouchEnd, false);

// Variables to store touch start coordinates and touch end coordinates
let touchstartX = 0;
let touchendX = 0;

// Function to handle touch start
function handleTouchStart(event) {
  touchstartX = event.changedTouches[0].screenX;
}

// Function to handle touch end
function handleTouchEnd(event) {
  touchendX = event.changedTouches[0].screenX;
  handleGesture();
}

// Function to determine swipe direction
function handleGesture() {
  if (touchendX < touchstartX) {
    // Swipe left
    musicPlayer.playNextSong();
  }
  if (touchendX > touchstartX) {
    // Swipe right
    musicPlayer.playPreviousSong();
  }
}
