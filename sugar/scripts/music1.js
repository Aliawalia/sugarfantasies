(() => {
    const trackArt = document.querySelector(".track-art");
    const trackName = document.querySelector(".track-name");
    const trackArtist = document.querySelector(".track-artist");

    const playPauseBtn = document.querySelector(".playpause-track");
    const nextBtn = document.querySelector(".next-track");
    const prevBtn = document.querySelector(".prev-track");

    const seekSlider = document.querySelector(".seek_slider");
    const currTime = document.querySelector(".current-time");
    const totalDuration = document.querySelector(".total-duration");

    const audio = new Audio();
    let trackIndex = 0;
    let isPlaying = false;
    let updateTimer;

    const tracks = [
        {
            name: "78fahrenheit",
            artist: "Ethel Cain",
            image: "/index/ethela.webp",
            path: "https://file.garden/Zj1sfPoh-G9Y8BHe/78fahrenheit.mp3",
        },
        {
            name: "Homecoming",
            artist: "Ethel Cain",
            image: "/index/ethela.webp",
            path: "https://file.garden/Zj1sfPoh-G9Y8BHe/Homecoming.mp3",
        },
        {
            name: "Nettles",
            artist: "Ethel Cain",
            image: "/index/ethela.webp",
            path: "https://file.garden/Zj1sfPoh-G9Y8BHe/nettles.mp3",
        },
        {
            name: "xxxxxxxxxx",
            artist: "Ethel Cain",
            image: "/index/ethela.webp",
            path: "https://file.garden/Zj1sfPoh-G9Y8BHe/xxxxxxxxxx.mp3",
        },
        {
            name: "I Wanna Be Adored ",
            artist: "The Raveonettes",
            image: "/index/adore.webp",
            path: "https://file.garden/Zj1sfPoh-G9Y8BHe/adore.mp3",
        },
    ];

    function loadTrack(index) {
        clearInterval(updateTimer);

        audio.src = tracks[index].path;
        audio.load();

        trackArt.style.backgroundImage = `url(${tracks[index].image})`;
        trackName.textContent = tracks[index].name;
        trackArtist.textContent = tracks[index].artist;

        updateTimer = setInterval(updateSeek, 1000);
    }

    function playPause() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
        } else {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
        }
        isPlaying = !isPlaying;
    }

    function nextTrack() {
        trackIndex = (trackIndex + 1) % tracks.length;
        loadTrack(trackIndex);
        audio.play();
        isPlaying = true;
    }

    function prevTrack() {
        trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(trackIndex);
        audio.play();
        isPlaying = true;
    }

    function updateSeek() {
        if (isNaN(audio.duration)) return;

        seekSlider.value = (audio.currentTime / audio.duration) * 100;

        const format = (t) =>
            `${Math.floor(t / 60)
                .toString()
                .padStart(2, "0")}:${Math.floor(t % 60)
                .toString()
                .padStart(2, "0")}`;

        currTime.textContent = format(audio.currentTime);
        totalDuration.textContent = format(audio.duration);
    }

    seekSlider.addEventListener("input", () => {
        audio.currentTime = (seekSlider.value / 100) * audio.duration;
    });

    playPauseBtn.addEventListener("click", playPause);
    nextBtn.addEventListener("click", nextTrack);
    prevBtn.addEventListener("click", prevTrack);

    audio.addEventListener("ended", nextTrack);

    loadTrack(trackIndex);
})();
