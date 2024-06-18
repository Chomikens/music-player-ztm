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
} from "./domElements.js";

function createMusicPlayer(songList) {
  const playButton = getPlayButton();
  const playIcon = getPlayIcon();
  const pauseIcon = getPauseIcon();
  const audioElement = getAudioElement();

  let currentSongIndex = 0;

  const titleElement = getTitleElement();
  const artistElement = getArtistElement();
  const coverImage = getCoverImage();
  const durationElement = getDurationElement();

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

  function showPlayButton() {
    playIcon.classList.replace("hidden", "shown");
    pauseIcon.classList.replace("shown", "hidden");

    playButton.dataset.musicState = "play";
    playButton.setAttribute("title", "Play song");
  }

  function showPauseButton() {
    playIcon.classList.replace("shown", "hidden");
    pauseIcon.classList.replace("hidden", "shown");

    playButton.dataset.musicState = "pause";
    playButton.setAttribute("title", "Pause song");
  }

  function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    console.log(duration, currentTime);
  }

  function playAudio() {
    audioElement.play();
    audioElement.addEventListener("timeupdate", updateProgressBar);
  }

  function pauseAudio() {
    audioElement.pause();
    audioElement.removeEventListener("timeupdate", updateProgressBar);
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    renderSong();
  }

  function playPreviousSong() {
    currentSongIndex =
      (currentSongIndex - 1 + songList.length) % songList.length;
    renderSong();
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

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

const musicPlayer = createMusicPlayer(songs);
musicPlayer.renderSong();

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

const buttonContainer = getButtonContainer();
buttonContainer.addEventListener("click", (e) => {
  handleControlButtons(e);
});
