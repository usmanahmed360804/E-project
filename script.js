document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("open");

            const icon = menuBtn.querySelector("i");

            if (navbar.classList.contains("open")) {
                icon.className = "bi bi-x-lg";
            } else {
                icon.className = "bi bi-list";
            }

        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.className = "bi bi-list";
                }

            });

        });

    }


    /* ===============================
   DARK / LIGHT MODE
=============================== */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    const savedTheme = localStorage.getItem("alpineTheme");

    // Restore saved theme
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    updateThemeIcon();

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const theme = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("alpineTheme", theme);

        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const themeBtn = document.getElementById("themeBtn");
    const icon = themeBtn?.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("dark")) {
        icon.className = "bi bi-sun-fill";
        themeBtn.title = "Switch to Light Mode";
    } else {
        icon.className = "bi bi-moon-fill";
        themeBtn.title = "Switch to Dark Mode";
    }
}


    function updateThemeIcon() {

        const icon = themeBtn?.querySelector("i");

        if (!icon) return;

        if (document.body.classList.contains("dark")) {
            icon.className = "bi bi-sun-fill";
        } else {
            icon.className = "bi bi-moon-fill";
        }

    }


    /* ===============================
       VISITOR COUNTER
    =============================== */

    const visitorCount = document.getElementById("visitorCount");

    if (visitorCount) {

        let visitors =
            parseInt(localStorage.getItem("alpineVisitors")) || 0;

        visitors++;

        localStorage.setItem(
            "alpineVisitors",
            visitors
        );

        visitorCount.textContent =
            visitors.toLocaleString();

    }


    /* ===============================
       LIVE DATE & TIME
    =============================== */

    const dateElement =
        document.getElementById("currentDate");

    const timeElement =
        document.getElementById("currentTime");


    function updateDateTime() {

        const now = new Date();

        const date = now.toLocaleDateString(
            undefined,
            {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );

        const time = now.toLocaleTimeString(
            undefined,
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

        if (dateElement) {
            dateElement.textContent = date;
        }

        if (timeElement) {
            timeElement.textContent = time;
        }

    }

    updateDateTime();

    setInterval(updateDateTime, 1000);


    /* ===============================
       LOCATION DETECTION
    =============================== */

    const locationBtn =
        document.getElementById("locationBtn");

    const locationText =
        document.getElementById("locationText");

    const tickerLocation =
        document.getElementById("tickerLocation");


    if (locationBtn) {

        locationBtn.addEventListener("click", () => {

            if (!navigator.geolocation) {

                showLocation(
                    "Geolocation is not supported by your browser."
                );

                return;
            }

            locationBtn.disabled = true;

            locationBtn.innerHTML =
                '<i class="bi bi-hourglass-split"></i> Detecting...';


            navigator.geolocation.getCurrentPosition(

                async position => {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;

                    try {

                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );

                        const data =
                            await response.json();

                        const address =
                            data.address || {};

                        const city =
                            address.city ||
                            address.town ||
                            address.village ||
                            address.county ||
                            "Unknown city";

                        const country =
                            address.country ||
                            "Unknown country";

                        const result =
                            `${city}, ${country}`;

                        showLocation(result);

                    } catch (error) {

                        showLocation(
                            `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                        );

                    }

                    locationBtn.disabled = false;

                    locationBtn.innerHTML =
                        '<i class="bi bi-check-circle"></i> Location Detected';

                },

                error => {

                    let message =
                        "Unable to detect your location.";

                    if (error.code === 1) {
                        message =
                            "Location permission was denied.";
                    }

                    showLocation(message);

                    locationBtn.disabled = false;

                    locationBtn.innerHTML =
                        '<i class="bi bi-crosshair"></i> Try Again';

                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }

            );

        });

    }


    function showLocation(text) {

        if (locationText) {
            locationText.textContent = text;
        }

        if (tickerLocation) {
            tickerLocation.textContent =
                `Location: ${text}`;
        }

    }


    /* ===============================
       ACTIVE NAVIGATION
    =============================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            /* Sirf #hash wale links scroll se active hon.
               Page links (about.html etc.) ko yahan na chheda jaye. */
            if (!link.getAttribute("href").startsWith("#")) return;

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* ===============================
       SCROLL REVEAL
    =============================== */

    const revealElements =
        document.querySelectorAll(
            ".info-card, .mountain-card, .technique-item, .shelter-box, .hazard-card, .record-card, .organization-card, .gallery-item, .guideline-list > div"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity .7s ease, transform .7s ease";

        observer.observe(element);

    });


    /* Add show styling through JS */

    const style =
        document.createElement("style");

    style.textContent = `
        .show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(style);


    /* ===============================
       IMAGE ERROR FALLBACK
    =============================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            img.src =
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";

        });

    });


    /* ===============================
       NAVBAR SLIDING INDICATOR
       (Home -> About par underline slide hoti hai)
    =============================== */

    (function initNavIndicator() {

        const nav = document.getElementById("navbar");
        const info = window.__alpine;

        if (!nav || !info) return;

        const links = [...nav.querySelectorAll(".nav-link")];

        const fileOf = link =>
            (link.getAttribute("href") || "")
                .split("#")[0]
                .replace(/\.html?$/i, "")
                .toLowerCase();

        const linkFor = name =>
            links.find(l => fileOf(l) === name) || null;

        const currentLink = linkFor(info.file);

        /* Active class hamesha sahi page par */
        links.forEach(l => {
            if (fileOf(l)) l.classList.toggle("active", l === currentLink);
        });

        /* Mobile menu: har link ko stagger delay */
        links.forEach((l, i) => l.style.setProperty("--i", i));

        if (!currentLink) return;

        const indicator = document.createElement("span");
        indicator.className = "nav-indicator";
        indicator.setAttribute("aria-hidden", "true");
        nav.appendChild(indicator);
        nav.classList.add("has-indicator");

        let shownOn = null;

        function place(link, animate) {

            indicator.classList.toggle("no-anim", !animate);

            indicator.style.setProperty("--x", link.offsetLeft + "px");
            indicator.style.setProperty("--w", link.offsetWidth + "px");
            indicator.style.setProperty(
                "--y",
                (link.offsetTop + link.offsetHeight + 6) + "px"
            );

            shownOn = link;
        }

        /* Pichle page ka link (jahan se slide shuru hogi) */
        const startLink =
            linkFor(info.from) ||
            (info.prev >= 0 ? linkFor(info.order[info.prev]) : null) ||
            currentLink;

        function start() {

            place(startLink, false);
            indicator.classList.add("ready");

            void indicator.offsetWidth; // reflow

            if (startLink !== currentLink) {
                setTimeout(() => place(currentLink, true), 220);
            } else {
                place(currentLink, false);
            }

        }

        /* Fonts load hone ke baad measure karo, warna width galat aati hai */
        const fontsReady = document.fonts && document.fonts.ready
            ? Promise.race([
                document.fonts.ready,
                new Promise(r => setTimeout(r, 700))
              ])
            : Promise.resolve();

        fontsReady.then(start);

        /* Hover par indicator follow kare */
        links.forEach(link => {
            link.addEventListener("mouseenter", () => {
                if (window.innerWidth > 900) place(link, true);
            });
            link.addEventListener("focus", () => {
                if (window.innerWidth > 900) place(link, true);
            });
        });

        nav.addEventListener("mouseleave", () => {
            if (window.innerWidth > 900) place(currentLink, true);
        });

        nav.addEventListener("focusout", () => {
            if (window.innerWidth > 900) place(currentLink, true);
        });

        const resync = () => place(shownOn || currentLink, false);

        window.addEventListener("resize", resync);
        window.addEventListener("load", resync);

        /* Click par yaad rakho indicator kahan tha,
           taaki naya page wahin se slide shuru kare */
        nav.addEventListener("click", () => {
            try {
                sessionStorage.setItem(
                    "alpineFrom",
                    fileOf(shownOn || currentLink)
                );
            } catch (e) {}
        }, true);

        document.addEventListener("click", e => {
            if (e.target.closest("#navbar")) return;
            try {
                sessionStorage.setItem("alpineFrom", info.file);
            } catch (err) {}
        }, true);

    })();


    /* ===============================
       PAGE TRANSITION
       (click par purana content nikalta hai,
        naya page direction ke hisaab se aata hai)
    =============================== */

    (function initPageTransition() {

        const info = window.__alpine;
        const root = document.documentElement;

        const reduce =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const OUT_MS = 280;

        /* Back/forward cache se wapas aane par page khula dikhe */
        window.addEventListener("pageshow", e => {
            if (e.persisted) {
                root.classList.remove("page-leaving");
                root.removeAttribute("data-leave");
            }
        });

        document.addEventListener("click", e => {

            if (e.defaultPrevented || e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const a = e.target.closest("a[href]");

            if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

            const url = new URL(a.href, location.href);

            if (url.origin !== location.origin) return;
            if (!/\.html?$/i.test(url.pathname)) return;

            /* Sirf hash badalna ya wahi page: normal behaviour */
            if (url.pathname === location.pathname) return;

            e.preventDefault();

            if (reduce) {
                location.href = url.href;
                return;
            }

            const targetName = url.pathname
                .split("/").pop()
                .replace(/\.html?$/i, "")
                .toLowerCase();

            const targetIndex = info ? info.order.indexOf(targetName) : -1;

            const leave =
                info && targetIndex >= 0 && info.cur >= 0 && targetIndex < info.cur
                    ? "back"
                    : "fwd";

            root.setAttribute("data-leave", leave);
            root.classList.add("page-leaving");

            setTimeout(() => {
                location.href = url.href;
            }, OUT_MS);

        });

    })();


});