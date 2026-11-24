
      function showSiteInfo(info) {
        const show = (id, text) => {
          const el = document.getElementById(id);
          if (el) el.textContent = text;
        };
        if (info.error) {
          show("nc-last-updated", info.error);
          return;
        }
        show(
          "nc-last-updated",
          new Date(info.last_updated).toLocaleDateString(),
        );
        show("nc-views", info.views.toLocaleString());
        show("nc-hits", info.hits.toLocaleString());
      }

async function discordChecker() {
        try {
          const response = await fetch(
            "https://api.lanyard.rest/v1/users/961454132064026684",
          );
          const json = await response.json();
          const details = document.getElementById("status-details");
          details.textContent = "";
          const b = document.createElement("b");
          b.textContent = json.data.discord_user.username;
          details.append(b, " : " + json.data.discord_status);
          const statusColors = {
            online: "#47c767",
            idle: "rgb(203, 165, 84)",
            dnd: "#c7474d",
            offline: "#5d5d5d",
          };
          document.getElementById("status-blob").style.backgroundColor =
            statusColors[json.data.discord_status];
        } catch (error) {
          console.error("failed to fetch!!", error);
        }
      }
      discordChecker();
      setInterval(discordChecker, 30000);
const API_KEY = "4f9b192a761908e1ad7c834d252a2b56";
      const USERNAME = "aliawalia";

      function lastfmRequest(method, params) {
        const query = new URLSearchParams({
          method,
          ...params,
          api_key: API_KEY,
          format: "json",
        });
        return fetch("https://ws.audioscrobbler.com/2.0/?" + query).then(
          (response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          },
        );
      }

      function getImage(track) {
        return lastfmRequest("track.getInfo", {
          autocorrect: 1,
          track: track.name,
          artist: track.artist.name,
        }).then((data) => {
          const src = data?.track?.album?.image?.[1]?.["#text"];
          if (!src) throw new Error("No image found");
          return src;
        });
      }

      document.addEventListener("DOMContentLoaded", () => {
        const listeningTo = document.getElementById("listening-to");
        lastfmRequest("user.gettoptracks", {
          user: USERNAME,
          limit: "8",
          period: "7day",
        })
          .then((data) => {
            data.toptracks.track.forEach((item) => {
              const row = document.createElement("div");
              row.className = "music-row";

              const art = document.createElement("img");
              art.className = "track-art";
              art.alt = "Album Art";
              art.src = item.image?.[1]?.["#text"] || "";

              const info = document.createElement("div");
              info.className = "track-info";

              const title = document.createElement("div");
              title.className = "track-title";
              const link = document.createElement("a");
              link.href = item.url;
              link.target = "_blank";
              link.rel = "noopener";
              link.textContent = item.name;
              title.appendChild(link);

              const artist = document.createElement("div");
              artist.className = "track-artist";
              artist.textContent = item.artist.name;

              info.append(title, artist);
              row.append(art, info);
              listeningTo.appendChild(row);

              getImage(item)
                .then((src) => {
                  art.src = src;
                })
                .catch(console.warn);
            });
          })
          .catch((e) => console.warn("Last.fm failed", e));
      });
const GOOGLE_FORM_ID =
        "1FAIpQLScEo9m1kbZjeoNI1eEAaSHuhjCQJJ7gw7B3pDc-k0c8MwEItQ";
      const IMGUR_ID = "entry.1525216721";
      const NAME_ID = "entry.1579814887";
      const GOOGLE_SHEET_ID = "1oRRXOyYKiO4DzeY0o6gc8bpr5C43eSJq0r8rZmJPqF8";
      const DISPLAY_IMAGES = true;
      const IMAGE_APPROVAL = false;
      const CLIENT_ID = "bfaaee57f0b78f1";
      const DEBUG_MODE = false;
      const GOOGLE_SHEET_URL =
        "https://docs.google.com/spreadsheets/d/" +
        GOOGLE_SHEET_ID +
        "/export?format=csv";
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/d/e/" + GOOGLE_FORM_ID + "/formResponse";

      const canvas = document.getElementById("drawboxcanvas");
      const context = canvas.getContext("2d");

      function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      resizeCanvas();

      let restore_array = [];
      let start_index = -1;
      let stroke_color = "#000000";
      let stroke_width = "2";
      let line_opacity = "1";
      let stroke_join = "round";
      let line_cap = "round";
      let user_name = "anonymous";
      let is_drawing = false;
      let snapshot = null;
      let points = [];

      const colorpicker = document.getElementById("colorpicker");
      const colorchoice = document.getElementById("colorchoice");

      function setColor(hex, name) {
        stroke_color = hex;
        colorpicker.value = hex;
        colorchoice.value = name || hex;
        updatePenStyle();
      }

      colorpicker.addEventListener("input", () => setColor(colorpicker.value));

      const PALETTES = {
        Pastels: [
          ["Powder Blush", "#FFADAD"],
          ["Apricot Cream", "#FFD6A5"],
          ["Lemon Chiffon", "#FDFFB6"],
          ["Tea Green", "#CAFFBF"],
          ["Soft Cyan", "#9BF6FF"],
          ["Baby Blue Ice", "#A0C4FF"],
          ["Periwinkle", "#FFC6FF"],
          ["Mauve", "#000000"],
        ],
        Vibrant: [
          ["Strawberry Red", "#f94144"],
          ["Pumpkin Spice", "#f3722c"],
          ["Atomic Tangerine", "#f9844a"],
          ["Carrot Orange", "#f8961e"],
          ["Tuscan Sun", "#f9c74f"],
          ["Willow Green", "#90be6d"],
          ["Seaweed", "#43aa8b"],
          ["Dark Cyan", "#4d908e"],
          ["Cerulean", "#277da1"],
          ["Blue Slate", "#577590"],
        ],
        Browns: [
          ["Antique White", "#ffedd8"],
          ["Soft Apricot", "#f3d5b5"],
          ["Tan", "#e7bc91"],
          ["Light Bronze", "#d4a276"],
          ["Camel", "#bc8a5f"],
          ["Faded Copper", "#a47148"],
          ["Olive Wood", "#8b5e34"],
          ["Walnut", "#6f4518"],
          ["Walnut", "#603808"],
          ["Walnut", "#583101"],
        ],
      };

      const palettesEl = document.getElementById("palettes");
      for (const [id, colors] of Object.entries(PALETTES)) {
        const wrap = document.createElement("div");
        wrap.id = id;
        wrap.className = "colorPalette";
        colors.forEach(([name, hex]) => {
          const swatch = document.createElement("div");
          swatch.className = "stroke_color";
          swatch.style.background = hex;
          swatch.title = name;
          swatch.addEventListener("click", () => setColor(hex, name));
          wrap.appendChild(swatch);
        });
        palettesEl.appendChild(wrap);
      }

      function showDiv() {
        const selected = document.getElementById("palette").value;
        document.querySelectorAll(".colorPalette").forEach((div) => {
          div.style.display = div.id === selected ? "flex" : "none";
        });
      }
      document.getElementById("palette").addEventListener("change", showDiv);
      showDiv();

      document.getElementById("Strokewidth").addEventListener("input", (e) => {
        stroke_width = e.target.value;
        document.getElementById("StrokeAmount").value = stroke_width;
        updatePenStyle();
      });
      document.getElementById("Opacity").addEventListener("input", (e) => {
        line_opacity = e.target.value;
        document.getElementById("OpacityAmount").value =
          Number(line_opacity).toFixed(2);
      });
      document.getElementById("BrushType").addEventListener("change", (e) => {
        stroke_join = e.target.value;
      });
      document.getElementById("LineCap").addEventListener("change", (e) => {
        line_cap = e.target.value;
        updatePenStyle();
      });
      document.getElementById("username").addEventListener("input", (e) => {
        user_name = e.target.value.trim() || "anonymous";
      });

      const cursorCanvas = document.createElement("canvas");
      let cursorUrl = null;

      function updatePenStyle() {
        const rad = Number(stroke_width);
        const ctx = cursorCanvas.getContext("2d");
        cursorCanvas.width = cursorCanvas.height = rad;
        ctx.fillStyle = stroke_color;
        ctx.beginPath();
        if (line_cap === "round")
          ctx.arc(rad / 2, rad / 2, rad / 2, 0, Math.PI * 2);
        else ctx.rect(0, 0, rad, rad);
        ctx.fill();
        cursorCanvas.toBlob((blob) => {
          if (!blob) return;
          if (cursorUrl) URL.revokeObjectURL(cursorUrl);
          cursorUrl = URL.createObjectURL(blob);
          canvas.style.cursor =
            rad < 4
              ? "crosshair"
              : `url(${cursorUrl}) ${rad / 2} ${rad / 2}, auto`;
        });
      }
      updatePenStyle();

      function getPoint(event) {
        const rect = canvas.getBoundingClientRect();
        const t =
          event.targetTouches && event.targetTouches.length
            ? event.targetTouches[0]
            : event;
        return {
          x:
            (t.clientX - rect.left - canvas.clientLeft) *
            (canvas.width / canvas.clientWidth),
          y:
            (t.clientY - rect.top - canvas.clientTop) *
            (canvas.height / canvas.clientHeight),
        };
      }

      function applyStyle() {
        context.strokeStyle = stroke_color;
        context.lineWidth = stroke_width;
        context.lineCap = line_cap;
        context.lineJoin = stroke_join;
        context.globalAlpha = line_opacity;
      }

      function render() {
        context.putImageData(snapshot, 0, 0);
        applyStyle();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        if (points.length === 1)
          context.lineTo(points[0].x + 0.01, points[0].y);
        for (let i = 1; i < points.length; i++)
          context.lineTo(points[i].x, points[i].y);
        context.stroke();
      }

      function start(event) {
        event.preventDefault();
        is_drawing = true;
        snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
        points = [getPoint(event)];
        render();
      }

      function draw(event) {
        if (!is_drawing) return;
        event.preventDefault();
        points.push(getPoint(event));
        render();
      }

      function stop(event) {
        if (!is_drawing) return;
        event.preventDefault();
        is_drawing = false;
        restore_array.push(
          context.getImageData(0, 0, canvas.width, canvas.height),
        );
        start_index++;
      }

      canvas.addEventListener("touchstart", start, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stop, { passive: false });
      canvas.addEventListener("touchcancel", stop, { passive: false });
      canvas.addEventListener("mousedown", start, false);
      canvas.addEventListener("mousemove", draw, false);
      canvas.addEventListener("mouseup", stop, false);
      canvas.addEventListener("mouseout", stop, false);

      function Undo() {
        if (start_index < 0) return;
        restore_array.pop();
        start_index--;
        if (start_index < 0) {
          context.globalAlpha = 1;
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          context.putImageData(restore_array[start_index], 0, 0);
        }
      }

      function Clear() {
        if (confirm("are you sure you want to clear?")) {
          context.globalAlpha = 1;
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);
          restore_array = [];
          start_index = -1;
        }
      }

      document.getElementById("undo").addEventListener("click", Undo);
      document.getElementById("clear").addEventListener("click", Clear);

      window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          if (e.target.matches("input[type=text]")) return;
          e.preventDefault();
          Undo();
        }
      });

      document
        .getElementById("submit")
        .addEventListener("click", async function () {
          if (!confirm("submit?")) return;
          if (start_index <= -1) {
            alert("can't submit an empty canvas");
            return;
          }
          const submitButton = document.getElementById("submit");
          const statusText = document.getElementById("status");

          submitButton.disabled = true;
          statusText.textContent = "Uploading...";

          try {
            const blob = await new Promise((resolve) =>
              canvas.toBlob(resolve, "image/png"),
            );
            const formData = new FormData();
            formData.append("image", blob, "drawing.png");

            const response = await fetch("https://api.imgur.com/3/image", {
              method: "POST",
              headers: { Authorization: `Client-ID ${CLIENT_ID}` },
              body: formData,
            });
            const data = await response.json();
            if (!data.success) throw new Error("Imgur upload failed");

            const googleFormData = new FormData();
            googleFormData.append(IMGUR_ID, data.data.link);
            googleFormData.append(NAME_ID, user_name);

            await fetch(GOOGLE_FORM_URL, {
              method: "POST",
              body: googleFormData,
              mode: "no-cors",
            });
            location.reload();
          } catch (error) {
            console.error(error);
            statusText.textContent = "Error uploading image.";
            alert("Error uploading image or submitting to Google Form");
            submitButton.disabled = false;
          }
        });

      function openOverlay(src) {
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
        });
        overlay.addEventListener("click", () => overlay.remove());

        const bigImg = document.createElement("img");
        bigImg.src = src;
        Object.assign(bigImg.style, {
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "10px",
          boxShadow: "0 0 20px #000",
        });
        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);
      }

      async function fetchImages() {
        const gallery = document.getElementById("gallery");
        if (!DISPLAY_IMAGES) {
          gallery.textContent = "images Display is disabled.";
          return;
        }

        try {
          const response = await fetch(GOOGLE_SHEET_URL);
          const csvText = await response.text();
          const rows = Papa.parse(csvText, { skipEmptyLines: true }).data.slice(
            1,
          );

          gallery.textContent = "";
          rows.reverse().forEach((columns) => {
            if (DEBUG_MODE) console.log("Columns:", columns);
            if (columns.length < 2) return;

            const timestamp = (columns[0] || "").trim();
            const imgUrl = (columns[1] || "").trim();
            const author = (columns[2] || "").trim();
            const approved = (columns[3] || "").trim();
            const myComment = (columns[4] || "").trim();

            if (!imgUrl.startsWith("https://i.imgur.com/")) return;

            const div = document.createElement("div");
            div.className = "image-container";

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = "drawing";
            img.className = "drawbox";
            img.title = myComment;
            img.addEventListener("click", () => openOverlay(img.src));

            const time = document.createElement("p");
            time.textContent = timestamp;

            const by = document.createElement("p");
            by.textContent = "By: " + author;

            div.append(img, time, by);
            gallery.appendChild(div);
          });
        } catch (error) {
          console.error("Error fetching images:", error);
          gallery.textContent = "Failed to load images.";
        }
      }
      fetchImages();
