
            (() => {
                const API_URL = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aliawalia&api_key=4f9b192a761908e1ad7c834d252a2b56&format=json&limit=1';

                const albumArt     = document.getElementById('albumArt');
                const trackLink    = document.getElementById('trackLink');
                const trackWrapper = document.getElementById('trackWrapper');
                const statusText   = document.getElementById('statusText');

                let fetchId = null;

                async function fetchRecentTrack() {
                    try {
                        const res  = await fetch(`${API_URL}&_=${Date.now()}`);
                        const data = await res.json();
                        const track = data?.recenttracks?.track?.[0];
                        if (!track) return;

                        const artist = track.artist['#text'];
                        const name   = track.name;

                        trackLink.textContent = `♪ ${artist} - ${name}`;
                        trackLink.href        = track.url || '#';
                        trackLink.title       = `${name} by ${artist}`;
                        albumArt.src          = track.image?.[3]?.['#text'] ?? '';
                        trackWrapper.style.display = 'block';

                        statusText.textContent = track['@attr']?.nowplaying === 'true'
                            ? 'Listening to...'
                            : 'Recently played...';
                    } catch {
                    }
                }

                fetchRecentTrack();
                fetchId = setInterval(fetchRecentTrack, 30_000);

                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        clearInterval(fetchId);
                    } else {
                        fetchRecentTrack();
                        fetchId = setInterval(fetchRecentTrack, 30_000);
                    }
                });
            })();
