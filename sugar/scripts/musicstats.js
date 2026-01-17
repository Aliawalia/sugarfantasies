const API_KEY = "4f9b192a761908e1ad7c834d252a2b56";
const USERNAME = "aliawalia";

function urlencode(obj) {
    const str = [];
    for (const p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
}

document.addEventListener("DOMContentLoaded", () => {
    const musicContainer = document.getElementById("lastfm-top");
    const listeningTo = document.getElementById("listening-to");
    const currentlyPlaying = document.getElementById("currently-playing");

    function displayMusic() {
        musicContainer.style.display = "block";
    }

    function lastfmRequest(method, params) {
        params["api_key"] = API_KEY;
        params["format"] = "json";

        const url = "https://ws.audioscrobbler.com/2.0/?method=" + method + "&" + urlencode(params) + "&format=json";

        return fetch(url).then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
        });
    }

    function getImage(trackinfo) {
        return lastfmRequest("track.getInfo", {
            autocorrect: 1,
            track: trackinfo["name"],
            artist: trackinfo["artist"]["name"],
        }).then((data) => {
            try {
                return data.track.album.image[1]["#text"];
            } catch (e) {
                throw new Error("No image found");
            }
        });
    }

    lastfmRequest("user.gettoptracks", {
        user: USERNAME,
        limit: "8",
        period: "7day",
    }).then((data) => {
        let html = "";

        data.toptracks.track.forEach((item) => {
            const itemid = item.mbid || (item.name + "-" + item.artist.name).replace(/\s+/g, "-");
            const imgSrc = item.image?.[1]?.["#text"] || "";

            html += `<div class="music-row">`;
            html += `<img class="track-art" id="${itemid}" src="${imgSrc}" alt="Album Art">`;
            html += `<div class="track-info">`;
            html += `<div class="track-title"><a href="${item.url}" target="_blank">${item.name}</a></div>`;
            html += `<div class="track-artist">${item.artist.name}</div>`;
            html += `</div></div>`;

            getImage(item)
                .then((img) => {
                    const imgElement = document.getElementById(itemid);
                    if (imgElement) imgElement.src = img;
                })
                .catch(console.warn);
        });

        displayMusic();
        listeningTo.insertAdjacentHTML("beforeend", html);
    });
});

var serviceHost = "https://meowe.feitanportal.workers.dev";
var spotifyUser = "Alia Walia";

var songData, progressSeconds, totalSeconds, progressInterval;

function updatePlayer() {
    fetch(`${serviceHost}/get-now-playing`)
        .then((response) => response.json())
        .then((data) => {
            if (data.hasOwnProperty("ERROR")) {
                document.getElementById("player-song").innerHTML =
                    `${spotifyUser} isn't listening to anything right now!`;
                document.getElementById("player-artist").innerHTML = "Nothing";
                return;
            }
            songData = data;
            document.getElementById("player-song").innerHTML = data.item.name;
            document.getElementById("player-artist").innerHTML = data.item.artists[0].name;
            document.getElementById("player-status").innerHTML = data.is_playing
                ? `${spotifyUser} is now listening to...`
                : `${spotifyUser} has paused.`;
            document.getElementById("player-album-art").setAttribute("src", data.item.album.images[1].url);
            document
                .getElementById("player-progress")
                .setAttribute(
                    "style",
                    document.getElementById("player-progress").getAttribute("style") +
                        `width: ${(data.progress_ms * 100) / data.item.duration_ms}%`
                );
            document.getElementById("player-song-link").setAttribute("href", data.item.external_urls.spotify);
            document
                .getElementById("player-artist-link")
                .setAttribute("href", data.item.artists[0].external_urls.spotify);
            document.getElementById("player-album-link").setAttribute("href", data.item.album.external_urls.spotify);
            document.getElementById("player-mp3-link").setAttribute("href", data.item.preview_url);

            if (data.item.preview_url == null) {
                document.getElementById("player-mp3-link").setAttribute("style", "display: none;");
            }

            progressSeconds = Math.ceil(songData.progress_ms / 1000);
            totalSeconds = Math.ceil(songData.item.duration_ms / 1000);
            if (songData.is_playing) {
                progressInterval = setInterval(setProgress, 1000);
            } else {
                setProgress();
            }
        });
}

function setProgress() {
    if (progressSeconds > totalSeconds) {
        clearInterval(progressInterval);
        updatePlayer();
        return;
    }
    ++progressSeconds;
    var totalLabel = pad(parseInt(totalSeconds / 60)) + ":" + pad(totalSeconds % 60);
    var progressLabel = pad(parseInt(progressSeconds / 60)) + ":" + pad(progressSeconds % 60);
    document.getElementById("player-time").innerHTML = progressLabel + " / " + totalLabel;
    document.getElementById("player-progress").style.width = `${(progressSeconds * 100) / totalSeconds}%`;
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// pls work
updatePlayer();
