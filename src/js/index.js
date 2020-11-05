const $video = document.getElementById('video');
const $seekbar = document.getElementById('seekbar');
const $progress = document.getElementById('progress');
const $buttons = document.getElementById('buttons');

let interval;

// TODO 1. rewind/forward +/- [1,2,3,4,5] seconds
// TODO 2. keyboard events left/right/space
// TODO 3. add 2nd video player

function toggleVideo() {
  if ($video.paused) {
    $video.play();
    interval = interval ?? setInterval(updateProgressBar, 1000 / 30);
  } else {
    $video.pause();
    clearInterval(interval);
    interval = null;
  }
  renderButtons();
}

function updateProgressBar() {
  const { currentTime, duration } = $video;
  const progress = (currentTime / duration) * 100;
  $progress.style.right = `${100 - progress}%`;
}

function renderButtons() {
  $buttons.innerHTML = `<button class="video-toggle">${$video.paused ? 'play' : 'pause'}</button>`;
}

renderButtons();

$seekbar.onclick = (e) => {
  const { width } = e.target.getBoundingClientRect();
  const { clientX } = e;

  const position = clientX / width; // 0 - 1
  const time = $video.duration * position;

  $video.currentTime = time;
  updateProgressBar();
}

document.body.addEventListener('click', (e) => {
  const videoToggle = e.target.classList.contains('video-toggle');
  if (videoToggle) {
    toggleVideo();
  }
});
