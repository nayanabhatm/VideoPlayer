const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const video = document.getElementById('video');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const videoFile = document.getElementById('video-file');
const fileName = document.getElementById('file-name');

console.log(video.src);

// functions

function toggleVideoPlayStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//update progress bar and timestamp
function updateProgess() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = `0${secs}`;
  }

  timestamp.innerText = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function playNewVideo() {
  if (videoFile.files.length > 0) {
    const file = videoFile.files[0];
    updateFileName(file.name);
    video.src = URL.createObjectURL(file);
    video.play();
  }
}

function updateFileName(name) {
  fileName.innerText = name;
}

// Event listeners
video.addEventListener('click', toggleVideoPlayStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgess);

playBtn.addEventListener('click', toggleVideoPlayStatus);

stopBtn.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

// File upload event listener
videoFile.addEventListener('change', playNewVideo);
