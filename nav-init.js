/* nav-init.js
   <head> mein style.css ke baad load hota hai (bina defer ke), taaki page
   render hone se pehle hi pata ho ki hum kis page se kis page par aaye hain. */
(function () {
  var order = ["index", "about", "histroy", "types", "techinque", "herzaid", "record", "gallery", "contact"];
  var file = (location.pathname.split("/").pop() || "index.html").replace(/\.html?$/i, "").toLowerCase() || "index";
  var cur = order.indexOf(file);
  var prev = -1;
  var from = null;

  try {
    var p = sessionStorage.getItem("alpinePage");
    if (p !== null) prev = parseInt(p, 10);
    from = sessionStorage.getItem("alpineFrom");
    sessionStorage.removeItem("alpineFrom");
    if (cur >= 0) sessionStorage.setItem("alpinePage", cur);
  } catch (e) {}

  /* fwd  = aage ke page par (Home -> About)
     back = peeche ke page par (History -> About)
     up   = pehli visit / refresh */
  var dir = "up";
  if (prev >= 0 && cur >= 0 && prev !== cur) dir = cur > prev ? "fwd" : "back";

  document.documentElement.setAttribute("data-dir", dir);
  window.__alpine = { order: order, file: file, cur: cur, prev: prev, from: from };
})();
