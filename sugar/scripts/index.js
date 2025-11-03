// last updated
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var site_data = JSON.parse(this.responseText);
        var num_arr = site_data.info.views.toString().split("");
        var num_str = "";
        for (i = 0; i < num_arr.length; i++) {
            num_str += num_arr[i];
            if ((num_arr.length - 1 - i) % 3 == 0 && num_arr.length - 1 - i != 0) {
                num_str += ",";
            }
            var date_str = site_data.info.last_updated;
            var date_obj = new Date(site_data.info.last_updated);
            document.getElementById("lastupdate").innerHTML =
                date_obj.getMonth() + 1 + "-" + date_obj.getDate() + "-" + date_obj.getFullYear();
        }
        document.getElementById("hitcount").innerHTML = num_str;
    }
};
xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=sugarfantasies", true);
xhttp.send();

//lyrics

const textSelect = [
    "I never meant to hurt you / But somehow, I knew I would",
    "And darling, time may forgive me / But I wont",
    "Cause Id rather die / Than be anything but your girl",
    "That picture on the wall you're scared of looks just like you ",
    "To love me is to suffer me,",
    "Gardenias on the tile / Where it makes no difference who held back from who",
    "But when you / Said that you're in love / I never wondered if you're sure",
    "Grew up hard, fell off harder / cooking our brains, smoking that shit / Your daddy smoked in Vietnam",
    "Saying if you could, you'd leave it all",
    "I hate him for the time he's gone ",
    "Will I always be crying during sex with you?",
    "And if I'm crying, it's because I'm in love",
    "I can't let go when something's broken / It's all I know and it's all I want now",
    "If it's meant to be then it will be (oh, oh)",
    "But I always knew that in the end no one was coming to save me",
    "So I just prayed and I keep praying and praying and praying",
    "Heard you, saw you, felt you, love you",
    "Even the iron still fears the rot / Hiding from something I cannot stop",
    "I am the face of love's rage",
    "See it on your face, you won't ever change in your ways",
    "Every drop of blood is love I don't get back",
    "Bleeding out on your sleeve, you kill me any way but softly",
    "Nothing in my heart is hoping you'll come back",
];

function getRandomText() {
    const randomIndex = Math.floor(Math.random() * textSelect.length);
    return textSelect[randomIndex];
}

function loadText() {
    const quote = document.getElementById("lyric");
    quote.innerHTML = getRandomText();
}

window.onload = loadText;
//music
window.addEventListener("load", (event) => {
    // (A) PLAYER INIT
    // (A1) PLAYLIST - CHANGE TO YOUR OWN!
    let playlist = [
        { name: "Horses - Yung Lean", src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Horses.mp3" },
        {
            name: "Remember When - Faye Webster",
            src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Remember.mp3",
        },
        {
            name: "Roommates - Malcom Todd",
            src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Roommates.mp3",
        },
        { name: "Talk To Her - The Marías", src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Talk.mp3" },
        {
            name: "Thoroughfare  - Ethel Cain",
            src: "https://file.garden/Zj1sfPoh-G9Y8BHe/Thoroughfare.mp3",
        },
        {
            name: "Willoughby's Theme - Ethel Cain",
            src: "https://file.garden/Zj1sfPoh-G9Y8BHe/will.mp3",
        },
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
//cbox

    chattable.initialize({
        stylesheet: "/css/chattable.css"
    });
