(function () {
  const year = document.querySelectorAll("[data-year]");
  year.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll(".media").forEach(function (media) {
    const visual = media.querySelector("img, video");
    if (!visual) {
      media.classList.add("is-empty");
      return;
    }

    function show() {
      media.classList.add("has-media");
      media.classList.remove("is-empty");
    }

    function hide() {
      media.classList.remove("has-media");
      media.classList.add("is-empty");
    }

    visual.addEventListener("load", show);
    visual.addEventListener("loadeddata", show);
    visual.addEventListener("error", function () {
      var nodes = media.querySelectorAll("img, video");
      var ok = false;
      nodes.forEach(function (el) {
        if (el.tagName === "IMG" && el.complete && el.naturalWidth > 0) ok = true;
        if (el.tagName === "VIDEO" && el.readyState >= 2) ok = true;
      });
      if (!ok) {
        media.classList.remove("has-media");
        media.classList.add("is-empty");
      }
    });

    if (visual.tagName === "IMG" && visual.complete && visual.naturalWidth > 0) show();
  });
})();
