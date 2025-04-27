function decrypt(input, key) {
    let out = '';
    key = btoa(key).slice(0, 16);
    for (let i = 0; i < input.length; i++) {
      out += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return out;
  }
  
  (async () => {
    const secret = 'ultrasecurekey';
    const mpd  = decrypt(atob(localStorage.getItem('mpd')),  secret);
    const kid  = decrypt(atob(localStorage.getItem('keyid')), secret);
    const k    = decrypt(atob(localStorage.getItem('key')),   secret);
    if (!mpd || !kid || !k) {
      alert('Failed to load');
      return;
    }
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    player.configure({
      drm: {
        clearKeys: {
          [kid]: k
        },
        servers: {
          'com.widevine.alpha': ''
        }
      }
    });
    try {
      await player.load(mpd);
      localStorage.clear();
    } catch (e) {
      console.error(e);
      alert('Error: ' + e.message);
    }
  })();
  