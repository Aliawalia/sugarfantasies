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
