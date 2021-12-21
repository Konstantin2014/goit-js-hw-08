import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframePlayer = document.querySelector('iframe#vimeo-player');
const player = new Player(iframePlayer);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(savePlayTime, 1000));

function savePlayTime({ seconds }) {
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
}

if (LOCALSTORAGE_KEY) {
  player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));
}
