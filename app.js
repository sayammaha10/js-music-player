const backgroundImage = document.getElementById("bg-img");
const coverElement = document.getElementById("cover");
const musicTitle = document.getElementById("music-title");
const musicArtist = document.getElementById("music-artist");
const playerProgress = document.getElementById("player-progress");
const progress = document.getElementById("progress");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playBtn = document.getElementById("play-btn");

const music = new Audio();

const songs = [
  {
    path: "./songs/song-1.mp3",
    displayName: "The Charmer's Call",
    cover: "./images/cover-1.jpg",
    artist: "Hanu Dixit",
  },
  {
    path: "./songs/song-2.mp3",
    displayName: "You Will Never See Me Coming",
    cover: "./images/cover-2.jpg",
    artist: "NEFFEX",
  },
  {
    path: "./songs/song-3.mp3",
    displayName: "Intellect",
    cover: "./images/cover-3.jpg",
    artist: "Yung Logos",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // change play button to pause button
  playBtn.classList.replace("fa-play", "fa-pause");
  // set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // change pause button to play button
  playBtn.classList.replace("fa-pause", "fa-play");
  // set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  musicTitle.textContent = song.displayName;
  musicArtist.textContent = song.artist;
  coverElement.src = song.cover;
  backgroundImage.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationElement.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeElement.textContent = `${formatTime(
    currentTime / 60
  )}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
