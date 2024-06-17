import songs from "./song.js";

const buttonContainer = document.querySelector(".player-controls");
const audio = document.querySelector("audio"); 

function handleSong(song) {
const playButton = document.querySelector("button#play")
  const playIcon = document.getElementById("playIcon");
  const stopIcon = document.getElementById("stopIcon");

  const nextButton = document.querySelector("button#next")
  const prevtButton = document.querySelector("button#prev")

  let currentIndex = 0; 
  
  const title = document.querySelector("#music-title");
  const artist = document.querySelector("#music-author");
  const img = document.querySelector("#cover-img");

  function renderSong() {
    img.src = `src/img/${song[currentIndex].name}.jpg`;
    title.textContent = song[currentIndex].displayName;
    artist.textContent = song[currentIndex].artist;
    audio.src = `src/mp3/${song[currentIndex].name}.mp3`;
    img.onload = function() {
      img.setAttribute("height", img.naturalHeight);
      img.setAttribute("width", img.naturalWidth);
    };
    
  }

  function stopMusicButton() {

    playIcon.classList.replace("hidden", "shown");
    stopIcon.classList.replace("shown", "hidden");
  
    playButton.dataset.musicState = "play";
    playButton.setAttribute("title", "Play song");
  
  }

  function playMusicButton()  {
    playIcon.classList.replace("shown", "hidden");
    stopIcon.classList.replace("hidden", "shown");
  
    playButton.dataset.musicState = "stop";
    playButton.setAttribute("title", "Pause");
  }
  
  function playAudio() {
    audio.play()
  }

  function stopAudio() {
    audio.pause()
  }

  function nextSong() {
    currentIndex = (currentIndex + 1) % song.length;
    renderSong()
  }

  
  function prevSong() {
    currentIndex = (currentIndex - 1 + song.length) % song.length;
    renderSong()
  }

  return {
    renderSong,
    nextSong,
    prevSong,
    playMusicButton,
    stopMusicButton,
    playAudio,
    stopAudio,
  };
}

const player = handleSong(songs);
player.renderSong();


function controlsMusic(e) {
  const playButton = e.target.closest("button");

  if (!playButton) return;

  switch (playButton.dataset.musicState) {
    case "play":
      player.playMusicButton();
      player.playAudio();
      break;

    case "stop":
      player.stopMusicButton();
      player.stopAudio();
      break;

    case "next":
      player.stopMusicButton()
      player.nextSong()
      break;

    case "prev":
      player.stopMusicButton()
      player.prevSong()
      break;

    default:
      console.error("Something goes wrong")
  }
}

buttonContainer.addEventListener("click", (e) => {
  controlsMusic(e);
});
