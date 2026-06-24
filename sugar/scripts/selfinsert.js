(function () {
    var nameSelfWebring = "Alia";
    var relationshipSelfWebring = "is fighting with";
    var charnameSelfWebring = "Asuka Langley Soryu";
    var seriesSelfWebring = "Neon Genesis Evangelion";
    var imgurlSelfWebring = "https://f.feridinha.com/uuVis.png";
    var webringURL = "https://webring.koinuko.pink/members.php";

    var html = [
        '<div id="templateWebring">',
        '  <div id="webringiconbox">',
        '    <img id="iconWebring" src="' + imgurlSelfWebring + '" alt="' + charnameSelfWebring + '" />',
        "  </div>",
        '  <div id="webringdescbox">',
        '    <p id="webringdesc">',
        "      <strong>" + nameSelfWebring + "</strong> " + relationshipSelfWebring + "<br />",
        "      <strong>" + charnameSelfWebring + "</strong> from <strong>" + seriesSelfWebring + "</strong>!",
        "    </p>",
        "  </div>",
        '  <div id="webringlinks">',
        '    <p id="linkparaWebring">',
        '      &#9825; <a href="' + webringURL + '" target="_PARENT">Members List</a> &#9825;<br />',
        '      Part of the <a href="' + webringURL + '" target="_PARENT">Self-Insert Webring</a>',
        "    </p>",
        "  </div>",
        "</div>",
    ].join("\n");

    var wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.getElementById("selfinsertwebring").appendChild(wrapper);
})();
