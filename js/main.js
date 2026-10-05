/* 5 Star Tiling preview: menu + photo viewer. No dependencies. */
(function () {
  "use strict";
  var btn = document.querySelector(".menu-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        document.body.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  var lb = document.querySelector(".lightbox");
  if (!lb || typeof lb.showModal !== "function") return;
  var img = lb.querySelector("img"), count = lb.querySelector(".lb-count");
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-full]"));
  var i = 0, last = null;
  function show(n) {
    i = (n + items.length) % items.length;
    var thumb = items[i].querySelector("img");
    img.src = items[i].getAttribute("data-full");
    img.alt = thumb ? thumb.alt : "";
    count.textContent = (i + 1) + " / " + items.length;
  }
  items.forEach(function (el, n) {
    el.addEventListener("click", function () { last = el; show(n); lb.showModal(); });
  });
  lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(i - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(i + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) lb.close(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
  lb.addEventListener("close", function () { img.removeAttribute("src"); if (last) last.focus(); });
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });
})();
