
console.log("HAI");

const $video = document.getElementById('video');
const $progress = document.getElementById('progress');
const $playButton = document.getElementById('play-button');
const $pauseButton = document.getElementById('pause-button');

let interval;

$playButton.onclick = (e) => {
  $video.play();
  if (!interval) {
    interval = setInterval(updateProgressBar, 1000 / 30);
  }
};

$pauseButton.onclick = (e) => {
  $video.pause();
  clearInterval(interval);
  interval = null;
};

$video.onloadedmetadata = (...args) => {
  console.log(...args);
}

// $video.ontimeupdate = (e) => updateProgressBar(e);

function updateProgressBar() {
  const { currentTime, duration } = $video;
  const progress = (currentTime / duration) * 100;
  $progress.style.right = `${100 - progress}%`;
};
