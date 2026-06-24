// cursor
            var colour = "#ff68a9";
            var sparkles = 50;

            var x = ox = 400;
            var y = oy = 300;
            var swide = 800;
            var shigh = 600;
            var sleft = sdown = 0;
            var tiny = [], star = [], starv = [], starx = [], stary = [], tinyx = [], tinyy = [], tinyv = [];

            window.onload = function () {
                if (!document.getElementById) return;
                for (var i = 0; i < sparkles; i++) {
                    var rats = createDiv(3, 3);
                    rats.style.visibility = "hidden";
                    rats.style.zIndex = "999";
                    document.body.appendChild(tiny[i] = rats);
                    starv[i] = tinyv[i] = 0;

                    rats = createDiv(5, 5);
                    rats.style.backgroundColor = "transparent";
                    rats.style.visibility = "hidden";
                    rats.style.zIndex = "999";
                    var rlef = createDiv(1, 5);
                    var rdow = createDiv(5, 1);
                    rats.appendChild(rlef);
                    rats.appendChild(rdow);
                    rlef.style.top = "2px"; rlef.style.left = "0px";
                    rdow.style.top = "0px"; rdow.style.left = "2px";
                    document.body.appendChild(star[i] = rats);
                }
                set_width();
                sparkle();
            };

            function sparkle() {
                if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
                    ox = x; oy = y;
                    for (var c = 0; c < sparkles; c++) {
                        if (!starv[c]) {
                            star[c].style.left = (starx[c] = x) + "px";
                            star[c].style.top = (stary[c] = y + 1) + "px";
                            star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                            star[c].childNodes[0].style.backgroundColor =
                            star[c].childNodes[1].style.backgroundColor =
                                colour === "random" ? newColour() : colour;
                            star[c].style.visibility = "visible";
                            starv[c] = 50;
                            break;
                        }
                    }
                }
                for (var c = 0; c < sparkles; c++) {
                    if (starv[c]) update_star(c);
                    if (tinyv[c]) update_tiny(c);
                }
                setTimeout(sparkle, 40);
            }

            function update_star(i) {
                if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
                if (starv[i]) {
                    stary[i] += 1 + Math.random() * 3;
                    starx[i] += (i % 5 - 2) / 5;
                    if (stary[i] < shigh + sdown) {
                        star[i].style.top  = stary[i] + "px";
                        star[i].style.left = starx[i] + "px";
                    } else {
                        star[i].style.visibility = "hidden";
                        starv[i] = 0;
                    }
                } else {
                    tinyv[i] = 50;
                    tiny[i].style.top  = (tinyy[i] = stary[i]) + "px";
                    tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
                    tiny[i].style.width = "2px";
                    tiny[i].style.height = "2px";
                    tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
                    star[i].style.visibility = "hidden";
                    tiny[i].style.visibility = "visible";
                }
            }

            function update_tiny(i) {
                if (--tinyv[i] == 25) {
                    tiny[i].style.width = "1px";
                    tiny[i].style.height = "1px";
                }
                if (tinyv[i]) {
                    tinyy[i] += 1 + Math.random() * 3;
                    tinyx[i] += (i % 5 - 2) / 5;
                    if (tinyy[i] < shigh + sdown) {
                        tiny[i].style.top  = tinyy[i] + "px";
                        tiny[i].style.left = tinyx[i] + "px";
                    } else {
                        tiny[i].style.visibility = "hidden";
                        tinyv[i] = 0;
                    }
                } else {
                    tiny[i].style.visibility = "hidden";
                }
            }

            document.onmousemove = function (e) {
                if (e) {
                    y = e.pageY;
                    x = e.pageX;
                } else {
                    set_scroll();
                    y = event.y + sdown;
                    x = event.x + sleft;
                }
            };

            window.onscroll = set_scroll;
            function set_scroll() {
                if (typeof self.pageYOffset === "number") {
                    sdown = self.pageYOffset;
                    sleft = self.pageXOffset;
                } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
                    sdown = document.body.scrollTop;
                    sleft = document.body.scrollLeft;
                } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
                    sleft = document.documentElement.scrollLeft;
                    sdown = document.documentElement.scrollTop;
                } else {
                    sdown = sleft = 0;
                }
            }

            window.onresize = set_width;
            function set_width() {
                var sw = 999999, sh = 999999;
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth > 0)  sw = document.documentElement.clientWidth;
                    if (document.documentElement.clientHeight > 0) sh = document.documentElement.clientHeight;
                }
                if (typeof self.innerWidth === "number" && self.innerWidth) {
                    if (self.innerWidth  > 0 && self.innerWidth  < sw) sw = self.innerWidth;
                    if (self.innerHeight > 0 && self.innerHeight < sh) sh = self.innerHeight;
                }
                if (document.body.clientWidth) {
                    if (document.body.clientWidth  > 0 && document.body.clientWidth  < sw) sw = document.body.clientWidth;
                    if (document.body.clientHeight > 0 && document.body.clientHeight < sh) sh = document.body.clientHeight;
                }
                swide = (sw === 999999) ? 800 : sw;
                shigh = (sh === 999999) ? 600 : sh;
            }

            function createDiv(height, width) {
                var div = document.createElement("div");
                div.style.position = "absolute";
                div.style.height = height + "px";
                div.style.width  = width  + "px";
                div.style.overflow = "hidden";
                return div;
            }

            function newColour() {
                var c = [255, Math.floor(Math.random() * 256), 0];
                c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
                c.sort(function () { return 0.5 - Math.random(); });
                return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
            }
// clock

            function showTime() {
                var date = new Date();
                var h = String(date.getHours()).padStart(2, "0");
                var m = String(date.getMinutes()).padStart(2, "0");
                var s = String(date.getSeconds()).padStart(2, "0");
                document.getElementById("clock").textContent = h + ":" + m + ":" + s;
                setTimeout(showTime, 1000);
            }
            showTime();
// music

            var playBtn = document.querySelector(".play");
            var audio = document.getElementById("player");
            var music = document.querySelector(".music");
            var isPlaying = false;

            audio.volume = 0.8;

            playBtn.addEventListener("click", function () {
                if (isPlaying) {
                    audio.pause();
                    playBtn.textContent = "▶";
                } else {
                    audio.play();
                    playBtn.textContent = "⏸︎";
                }
                isPlaying = !isPlaying;
                music.classList.toggle("playing", isPlaying);
            });
// last fm

            var lastfmData = {
                baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
                user: "aliawalia",
                api_key: "4f9b192a761908e1ad7c834d252a2b56",
                additional: "&format=json&limit=1",
            };

            function getSetLastFM() {
                $.ajax({
                    type: "GET",
                    url: lastfmData.baseURL + lastfmData.user + "&api_key=" + lastfmData.api_key + lastfmData.additional,
                    dataType: "json",
                    success: function (resp) {
                        var recentTrack = resp.recenttracks.track[0];
                        $("a#tracktitle")
                            .html(recentTrack.name)
                            .attr("href", recentTrack.url)
                            .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
                            .attr("target", "_blank");
                        $("a#trackartist")
                            .html(recentTrack.artist["#text"])
                            .attr("title", "Artist : " + recentTrack.artist["#text"]);
                        $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
                    },
                    error: function () {
                        $("a#tracktitle").html("error");
                        $("img#trackart").attr("src", "#");
                        $("a#trackartist").html(":(").attr("href", "https://www.prashant.me/");
                    },
                });
            }

            getSetLastFM();
            setInterval(getSetLastFM, 10000);
