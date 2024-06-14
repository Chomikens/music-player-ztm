const buttonContainer = document.querySelector(".player-controls");

function controlsMusic(e) {
  const playButton = e.target.closest("button#play");
  const playIcon = playButton.querySelector("#playIcon");
  const stopIcon = playButton.querySelector("#stopIcon");
  if (!playButton) {
    return;
  }

  if (playButton.dataset.musicState === "play") {
    playIcon.classList.replace("shown", "hidden");
    stopIcon.classList.replace("hidden", "shown");
    playButton.dataset.musicState = "stop";
  } else {
    playIcon.classList.replace("hidden", "shown");
    stopIcon.classList.replace("shown", "hidden");
    playButton.dataset.musicState = "play";
  }
}

buttonContainer.addEventListener("click", (e) => {
  controlsMusic(e);
});
