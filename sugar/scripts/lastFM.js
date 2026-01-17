var lastfmData = {
    baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
    user: "aliawalia",
    // API
    api_key: "4f9b192a761908e1ad7c834d252a2b56",
    additional: "&format=json&limit=1",
};

var getSetLastFM = function () {
    $.ajax({
        type: "GET",
        url: lastfmData.baseURL + lastfmData.user + "&api_key=" + lastfmData.api_key + lastfmData.additional,
        dataType: "json",
        success: function (resp) {
            var recentTrack = resp.recenttracks.track[0];
            var formatted = "" + recentTrack.name;
            $("a#tracktitle")
                .html(formatted)
                .attr("href", recentTrack.url)
                .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
                .attr("target", "_blank");

            var artistFormatted = "" + recentTrack.artist["#text"];
            $("a#trackartist")
                .html(artistFormatted)
                .attr("title", "Artist : " + recentTrack.artist["#text"]);
            $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
        },
        error: function (resp) {
            $("a#tracktitle").html("error");
            $("img#trackart").attr("src", "https://sugarfantasies.neocities.org/index/bg.webp");
            var artistFormatted = ":(";
            $("a#trackartist").html(artistFormatted).attr("href", "www.prashant.me/");
        },
    });
};

getSetLastFM();
setInterval(getSetLastFM, 10 * 1000);
