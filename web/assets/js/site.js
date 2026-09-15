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

  var KEY = "theme";
  function storedTheme() {
    try {
      var value = localStorage.getItem(KEY);
      if (value === "dark" || value === "light") return value;
    } catch (err) {}
    return null;
  }
  function currentTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return storedTheme() || "light";
  }
  function paintToggles(theme) {
    var next = theme === "dark" ? "Light" : "Dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.textContent = next;
      btn.setAttribute("aria-label", "Switch to " + next.toLowerCase() + " mode");
    });
  }
  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem(KEY, theme); } catch (err) {}
    }
    paintToggles(theme);
  }

  applyTheme(currentTheme(), false);
  requestAnimationFrame(function () {
    document.documentElement.classList.add("theme-ready");
  });
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  });
})();
