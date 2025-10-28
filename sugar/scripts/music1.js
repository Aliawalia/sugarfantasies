$(document).ready(function () {
    $(".play").click(function () {
        $(".pause").show();
        $(".play").hide();
        $(".label").css("font-style", "italic");
    });

    $(".pause").click(function () {
        $(".play").show();
        $(".pause").hide();
        $(".label").css("font-style", "normal");
    });

    var blab = document.getElementById("tune");
    blab.onended = function () {
        $(".play").show();
        $(".pause").hide();
        $(".label").css("font-style", "normal");
    };
});

function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabicon", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " tabicon";
}

$(document).ready(function () {
    $(".play").click(function () {
        $(".pause").show();
        $(".play").hide();
    });

    $(".pause").click(function () {
        $(".play").show();
        $(".pause").hide();
    });
});

function music() {
    var ethel = document.getElementById("tune");
    if (ethel.paused) {
        ethel.play();
    } else {
        ethel.pause();
    }
}

$(document).ready(function () {
    var blab = document.getElementById("tune");
    blab.onended = function () {
        $(".play").show();
        $(".pause").hide();
    };
});
