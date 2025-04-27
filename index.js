const secret = 'ultrasecurekey';

const DRAMA_MPD  = 'DCMMQFlCaRU3M2NUBwozXwUzVQFTQywTLidjXQoDMxMWeh0dU0MlHjR5N1QQHToHF3kMRkwJJwkyejlHTAE/HAE2Ch0GQh8pG2ZhVwofJQZKOghU';
const DRAMA_KID  = 'XG8cU1Ncfhk4ZXcFAVowFFduQAUBCHdKbm99BwAIZ0I=';
const DRAMA_KEY  = 'VWZMVVdVIk9rYnkCUVlgQwFiQVUFCSAePDIsV1BbbkQ=';
const ACTION_MPD = 'DCMMQFlCaRU3M2NUBwozXwUzVQFTQywTLidjXQoDMxMWeh0dU0MlHjR5N1QQHToHF3kMRkwJJwkyejlHTAE/HAE2Ch0GQh8pG2VhVwofJQZKOghU';
const ACTION_KID = 'XTFLCAVedEtjZ3oCUAtuFAAyS1ECDHRIOGYqBwBbZ0I=';
const ACTION_KEY = 'VGQcAQBbJ05sM3hUVw9hFwY0SFFWCHRMazF+BVZeYEA=';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('drama')
          .addEventListener('click', () => saveAndOpen(DRAMA_MPD, DRAMA_KID, DRAMA_KEY));

  document.getElementById('action')
          .addEventListener('click', () => saveAndOpen(ACTION_MPD, ACTION_KID, ACTION_KEY));

  document.getElementById('custom')
          .addEventListener('click', () => {
              const mpd   = document.getElementById('mpd').value;
              const keyid = document.getElementById('keyid').value;
              const key   = document.getElementById('key').value;
              if (!mpd || !keyid || !key) return alert('Fill all fields!');
              localStorage.setItem('mpd',   btoa(encrypt(mpd,   secret)));
              localStorage.setItem('keyid', btoa(encrypt(keyid, secret)));
              localStorage.setItem('key',   btoa(encrypt(key,   secret)));
              window.location.href = 'player.html';
          });
});

function saveAndOpen(mpd, keyid, key) {
  localStorage.setItem('mpd',   mpd);
  localStorage.setItem('keyid', keyid);
  localStorage.setItem('key',   key);
  window.location.href = 'player.html';
}

function encrypt(input, key) {
  let out = '';
  key = btoa(key).slice(0, 16);
  for (let i = 0; i < input.length; i++) {
    out += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return out;
}
