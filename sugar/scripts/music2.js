window.addEventListener("load", (event) => {
    // (A) PLAYER INIT
    // (A1) PLAYLIST - CHANGE TO YOUR OWN!
    let playlist = [
        { name: "Laura Palmers Theme - Angelo Badalamenti", src: "https://file.garden/Zj1sfPoh-G9Y8BHe/theme.mp3" },
        { name: "Onanist - Ethel Cain", src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Onanist.mp3" },
        { name: "Etienne - Ethel Cain", src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Etienne.mp3" },
        { name: "Housofpsychoticwomn - Ethel Cain", src: "https://file.garden/Zj1sfPoh-G9Y8BHe/house.mp3" },
    ];

    // (A2) AUDIO PLAYER & GET HTML CONTROLS
    const audio = new Audio(),
        aPlay = document.getElementById("aPlay"),
        aPlayIco = document.getElementById("aPlayIco"),
        aNow = document.getElementById("aNow"),
        aTime = document.getElementById("aTime"),
        aSeek = document.getElementById("aSeek"),
        //  aVolume = document.getElementById("aVolume"),
        // aVolIco = document.getElementById("aVolIco"),
        aList = document.getElementById("aList");

    // (A3) BUILD PLAYLIST
    for (let i in playlist) {
        let row = document.createElement("div");
        row.className = "aRow";
        row.innerHTML = playlist[i]["name"];
        row.addEventListener("click", () => audPlay(i));
        playlist[i]["row"] = row;
        aList.appendChild(row);
    }

    // (B) PLAY MECHANISM
    // (B1) FLAGS
    var audNow = 0, // current song
        audStart = false, // auto start next song
        // (B2) PLAY SELECTED SONG
        audPlay = (idx, nostart) => {
            audNow = idx;
            audStart = nostart ? false : true;
            audio.src = encodeURI(playlist[idx]["src"]);
            for (let i in playlist) {
                if (i == idx) {
                    playlist[i]["row"].classList.add("now");
                } else {
                    playlist[i]["row"].classList.remove("now");
                }
            }
        };

    // (B3) AUTO START WHEN SUFFICIENTLY BUFFERED
    audio.addEventListener("canplay", () => {
        if (audStart) {
            audio.play();
            audStart = false;
        }
    });

    // (B4) AUTOPLAY NEXT SONG IN THE PLAYLIST
    audio.addEventListener("ended", () => {
        audNow++;
        if (audNow >= playlist.length) {
            audNow = 0;
        }
        audPlay(audNow);
    });

    // (B5) INIT SET FIRST SONG
    audPlay(0, true);

    // (C) PLAY/PAUSE BUTTON
    // (C1) AUTO SET PLAY/PAUSE TEXT
    audio.addEventListener("play", () => (aPlayIco.innerHTML = "pause"));
    audio.addEventListener("pause", () => (aPlayIco.innerHTML = "play_arrow"));

    // (C2) CLICK TO PLAY/PAUSE
    aPlay.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // (D) TRACK PROGRESS
    // (D1) SUPPORT FUNCTION - FORMAT HH:MM:SS
    var timeString = (secs) => {
        // (D1-1) HOURS, MINUTES, SECONDS
        let ss = Math.floor(secs),
            hh = Math.floor(ss / 3600),
            mm = Math.floor((ss - hh * 3600) / 60);
        ss = ss - hh * 3600 - mm * 60;

        // (D1-2) RETURN FORMATTED TIME
        if (hh > 0) {
            mm = mm < 10 ? "0" + mm : mm;
        }
        ss = ss < 10 ? "0" + ss : ss;
        return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
    };

    // (D2) INIT SET TRACK TIME
    audio.addEventListener("loadedmetadata", () => {
        aNow.innerHTML = timeString(0);
        aTime.innerHTML = timeString(audio.duration);
    });

    // (D3) UPDATE TIME ON PLAYING
    audio.addEventListener("timeupdate", () => (aNow.innerHTML = timeString(audio.currentTime)));

    // (E) SEEK BAR
    audio.addEventListener("loadedmetadata", () => {
        // (E1) SET SEEK BAR MAX TIME
        aSeek.max = Math.floor(audio.duration);

        // (E2) USER CHANGE SEEK BAR TIME
        var aSeeking = false; // user is now changing time
        aSeek.addEventListener("input", () => (aSeeking = true)); // prevents clash with (e3)
        aSeek.addEventListener("change", () => {
            audio.currentTime = aSeek.value;
            if (!audio.paused) {
                audio.play();
            }
            aSeeking = false;
        });

        // (E3) UPDATE SEEK BAR ON PLAYING
        audio.addEventListener("timeupdate", () => {
            if (!aSeeking) {
                aSeek.value = Math.floor(audio.currentTime);
            }
        });
    });

    // (G) ENABLE/DISABLE CONTROLS
    audio.addEventListener("canplay", () => {
        aPlay.disabled = false;

        aSeek.disabled = false;
    });
    audio.addEventListener("waiting", () => {
        aPlay.disabled = true;

        aSeek.disabled = true;
    });
});

// (F) NEXT/BACK
function backnext(n) {
    if (n) {
        audNow++;
    } else {
        audNow--;
    }
    if (audNow >= playlist.length) {
        audNow = 0;
    }
    if (audNow < 0) {
        audNow = playlist.length - 1;
    }
    audPlay(audNow);
}

//christmas
/**
 * Take an RFC 3339 or ISO 8601 date and returns
 * the date in human readable form.
 *
 * Will return undefined if lacks browser support
 * or it cannot parse the date.
 *
 * @param  {string} time
 * @param  {object} [lang] Optional language object
 * @return {string|undefined}
 * @license MIT
 * @author Sam Clarke <sam@samclarke.com>
 */
function timeToWords(time, lang) {
    lang = lang || {
        postfixes: {
            "<": " ago",
            ">": " from now",
        },
        1000: {
            singular: "a few moments",
            plural: "a few moments",
        },
        60000: {
            singular: "about a minute",
            plural: "# minutes",
        },
        3600000: {
            singular: "about an hour",
            plural: "# hours",
        },
        86400000: {
            singular: "a day",
            plural: "# days",
        },
        31540000000: {
            singular: "a year",
            plural: "# years",
        },
    };

    var timespans = [1000, 60000, 3600000, 86400000, 31540000000];
    var parsedTime = Date.parse(time.replace(/\-00:?00$/, ""));

    if (parsedTime && Date.now) {
        var timeAgo = parsedTime - Date.now();
        var diff = Math.abs(timeAgo);
        var postfix = lang.postfixes[timeAgo < 0 ? "<" : ">"];
        var timespan = timespans[0];

        for (var i = 1; i < timespans.length; i++) {
            if (diff > timespans[i]) {
                timespan = timespans[i];
            }
        }

        var n = Math.round(diff / timespan);

        return lang[timespan][n > 1 ? "plural" : "singular"].replace("#", n) + postfix;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var elements = document.getElementsByTagName("time");
    for (var i = 0; i < elements.length; i++) {
        var time = elements[i];
        // The date should be either in the datetime attribute
        // or in the text contents if no datetime attribute
        var date = time.getAttribute("datetime") || time.textContent;

        var dateInWords = timeToWords(date);
        if (dateInWords) {
            time.textContent = dateInWords;
        }
    }
});
