import './js/gallery.js'
import './js/player.js'
import './js/ripple.js'
import './js/modal.js'
import './js/burger.js'
import './js/youtube.js'
import './js/explore-slider.js'
import './js/buy-tickets.js'
import './js/map.js'

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  touchEventsTarget: 'container',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    bulletActiveClass: 'active',
    bulletElement: 'li',
    clickable: true
  },
  navigation: {
    nextEl: '.slider nav .arrow-right',
    prevEl: '.slider nav .arrow-left',
  },
  on: {
    slideChange: function () {
      document.querySelector('.slider .counters .number').textContent = '0' + (this.realIndex + 1);
    },
  },
});

// video player

const player = document.querySelector('.player');
let playerVideo = player.querySelector('.player-active-video');
let playerContent = player.querySelector('.player .content');
let playerTimerId;
let speedTimerId;
let defaultVolumeLevel = 1;
let volumeLevel;
let progressMousedown = false;

const playerControls = {
  'play': player.querySelector('.play'),
  'playLarge': player.querySelector('.play-large'),
  'volumeLevel': player.querySelector('.progress.volume'),
  'volume': player.querySelector('button.volume'),
  'position': player.querySelector('.progress.position'),
  'fullscreen': player.querySelector('.fullscreen'),
}

function stopPlayerVideo() {
  playerVideo.pause();
  playerVideo.currentTime = 0;
  playerVideo.load();
  setProgressPosition(0);
  player.classList.remove('playing');
  clearInterval(playerTimerId);
  handleVolumeUpdate(null, defaultVolumeLevel);
  setVolumePosition(defaultVolumeLevel);
}

function togglePlay() {
  if (playerVideo.paused) {
    stopAllPlayers();
    playerVideo.play();
    player.classList.add('playing');
    playerTimerId = setInterval(() => {
      updateProgress();
    }, 10);
  } else {
    playerVideo.pause();
    player.classList.remove('playing');
    clearInterval(playerTimerId);
  }
}

function toggleVolume() {
  if (!playerVideo.volume) {
    handleVolumeUpdate(null, volumeLevel || defaultVolumeLevel);
    setVolumePosition(volumeLevel || defaultVolumeLevel);
  } else {
    volumeLevel = playerVideo.volume;
    handleVolumeUpdate(null, 0);
    setVolumePosition(0);
  }
}

function handleVolumeUpdate(event, value) {
  if (typeof value !== 'undefined') {
    playerVideo.volume = value;
  } else {
    playerVideo.volume = this.value;
  }
  if (!playerVideo.volume) {
    player.classList.add('muted');
  } else {
    player.classList.remove('muted');
  }
}

function handlePositionUpdate(event) {
  if (event.type === 'mousemove' && progressMousedown || event.type !== 'mousemove') {
    playerVideo.currentTime = this.value * playerVideo.duration;
  }
}

function setProgressPosition(value) {
  playerControls.position.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  playerControls.position.value = value / 100;
}

function updateProgress() {
  if (!progressMousedown) {
    let progress = playerVideo.currentTime * 100 / playerVideo.duration || 0;
    setProgressPosition(progress);
    if (playerVideo.currentTime >= playerVideo.duration) {
      clearInterval(playerTimerId);
      player.classList.remove('playing');
    }
  }
}

function changeSpeed(direction) {
  const changeValue = 0.1;
  if (direction === 'up' && playerVideo.playbackRate < 2) {
    playerVideo.playbackRate += changeValue;
  }

  if (direction === 'down' && playerVideo.playbackRate >= 0.2) {
    playerVideo.playbackRate -= changeValue;
  }

  const playbackRateContainer = player.querySelector('.playback-rate');
  playbackRateContainer.textContent = 'x' + playerVideo.playbackRate.toFixed(2);
  playbackRateContainer.hidden = false;
  clearTimeout(speedTimerId);
  speedTimerId = setTimeout(() => {
    playbackRateContainer.hidden = true
  }, 1000);
}

function setVolumePosition(value) {
  playerControls.volumeLevel.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #c4c4c4 ${value * 100}%, #c4c4c4 100%)`;
  playerControls.volumeLevel.value = value;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
    player.classList.remove('fullscreen');
  } else {
    player.requestFullscreen()
    player.classList.add('fullscreen');
  };
}

function handleVideoHotkeys(event) {
  if (document.body.classList.contains('modal-opened')) {
    return false;
  }

  let rect = player.getBoundingClientRect();
  let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  if (rect.bottom > 0 && rect.top - viewHeight <= 0) {
    if (event.code === 'Space') {
      event.preventDefault();
      togglePlay();
    }

    if (event.shiftKey && event.code === 'Comma') {
      event.preventDefault();
      changeSpeed('down');
    }

    if (event.shiftKey && event.code === 'Period') {
      event.preventDefault();
      changeSpeed('up');
    }

    switch (event.key) {
      case 'm':
      case 'ь':
        event.preventDefault();
        toggleVolume();
        break;
      case 'f':
      case 'а':
        event.preventDefault();
        toggleFullscreen();
        break;
    }
  }
}


const videoSwiper = new Swiper('.video-swiper', {
  direction: 'horizontal',
  loop: true,
  touchEventsTarget: 'container',
  slidesPerView: 3,
  spaceBetween: 40,
  pagination: {
    el: '.video-swiper-pagination',
    type: 'bullets',
    bulletActiveClass: 'active',
    bulletElement: 'li',
    clickable: true
  },
  navigation: {
    nextEl: '.video nav .arrow-right',
    prevEl: '.video nav .arrow-left',
  },
  on: {
    slideChange: function () {
      stopAllPlayers();
      stopPlayerVideo();
      document.querySelectorAll('.video .player video').forEach((el, index) => {
        if (index !== this.realIndex) {
          el.classList.remove('player-active-video');
        } else {
          el.classList.add('player-active-video');
        }
        playerVideo = player.querySelector('.player-active-video');
      });
    },
  },
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var activeYTPlayer;
var YTPlayers = [];

function onYouTubeIframeAPIReady() {
  document.body.querySelectorAll('.youtube-video').forEach(el => el.onclick = function (e) {
    stopVideo();

    let player = new YT.Player(this, {
      height: '360',
      width: '640',
      videoId: this.dataset.id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    YTPlayers.push(player);
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  activeYTPlayer = event.target;
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    stopAllPlayers(event.target);
    stopPlayerVideo();
  }
}

function stopVideo() {
  if (activeYTPlayer) {
    activeYTPlayer.stopVideo();
  }
}

function stopAllPlayers(current = null) {
  if (YTPlayers) {
    YTPlayers.forEach(el => {
      if (el !== current) {
        el.stopVideo()
      }
    });
  }
}

onYouTubeIframeAPIReady();


playerContent.addEventListener('click', togglePlay);
playerControls.play.addEventListener('click', togglePlay);
playerControls.playLarge.addEventListener('click', togglePlay);
playerControls.volume.addEventListener('click', toggleVolume);
playerControls.fullscreen.addEventListener('click', toggleFullscreen);
playerControls.volumeLevel.addEventListener('change', handleVolumeUpdate);
playerControls.volumeLevel.addEventListener('mousemove', handleVolumeUpdate);
playerControls.position.addEventListener('change', handlePositionUpdate);
document.addEventListener('keydown', handleVideoHotkeys);



// playerControls.position.addEventListener('click', handlePositionUpdate);
playerControls.position.addEventListener('mousedown', () => progressMousedown = true);
playerControls.position.addEventListener('mouseup', () => progressMousedown = false);
playerControls.position.addEventListener('mousemove', handlePositionUpdate);
//playerControls.position.addEventListener('mousemove', (event) => progressMousedown && handlePositionUpdate(event));

// ----------

// back to top
const toTopButton = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 700) {
    toTopButton.classList.add('active');
  } else {
    toTopButton.classList.remove('active');
  }
});