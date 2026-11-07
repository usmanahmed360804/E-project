# 🏔️ Alpine Ascents — Mountaineering Portal

Alpine Ascents is a multi-page static website about the world of mountaineering: famous peaks, climbing techniques, safety and hazards, world records, and a photo gallery. It is built with plain HTML, CSS and vanilla JavaScript, with no frameworks and no build step.

## ✨ Features

- **9 pages** with a consistent navbar and footer
- **Dark / Light mode** toggle (preference saved in `localStorage`)
- **Visitor counter** (browser-based, using `localStorage`)
- **Live date and time** plus a location ticker
- **Responsive design** with a hamburger menu on mobile
- **Page transitions**: `nav-init.js` uses the page order to detect whether the user is moving forward or backward, and sets the animation direction accordingly
- **Scroll-based active nav link** (using `IntersectionObserver`)
- Google Fonts (Montserrat, Poppins) and Bootstrap Icons

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section and portal introduction |
| About | `about.html` | What mountaineering is |
| History | `histroy.html` | The history of mountaineering |
| Types | `types.html` | Styles of mountaineering and famous peaks |
| Techniques | `techinque.html` | Climbing techniques and gear |
| Hazards | `herzaid.html` | Dangers and safety guidelines |
| Records | `record.html` | World records and achievements |
| Gallery | `gallery.html` | Mountain photo gallery |
| Contact | `contact.html` | Contact info and FAQ |

## 📁 Project Structure

alpine-ascents/
├── index.html
├── about.html
├── histroy.html
├── types.html
├── techinque.html
├── herzaid.html
├── record.html
├── gallery.html
├── contact.html
├── style.css          # Site-wide styling (light + dark theme)
├── script.js          # Menu, theme, visitor counter, clock, scroll logic
├── nav-init.js        # Page transition direction (loaded in <head>)
└── images/            # Local peak images
    ├── mount_everest.jpg
    ├── Mount-Kilimanjaro.jpg
    ├── aconcagua.jpg
    ├── denali.jpg
    ├── elbrus.jpg
    ├── vinson.jpg
    ├── carstensz.webp
    └── mountain.png


> Currently all files sit in a single folder. If you move the images into an `images/` folder, update the `src` paths in the HTML as well.

## 🚀 Getting Started

No installation required.

1. Download or clone the project folder.
2. Open `index.html` in your browser.

Recommended (local server):

bash
# Python
python -m http.server 8000

# or Node.js
npx serve


Then open `http://localhost:8000` in your browser.

> An internet connection is needed because fonts, icons and some images (Unsplash) load online.

## 🛠️ Built With

- HTML5
- CSS3 (custom properties, responsive layout)
- JavaScript (ES6+)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/): Montserrat, Poppins
- Images: local files plus [Unsplash](https://unsplash.com/)

## ⚙️ Customization

- **Colors / theme:** edit the CSS variables and `body.dark` rules in `style.css`.
- **Page order (transitions):** change the `order` array in `nav-init.js`.
- **Adding a page:** create the HTML file, copy the navbar, link `style.css` and `script.js`, and add the page name to the `order` array in `nav-init.js`.

## 🐞 Known Issues

- The Contact link in `index.html` is `href="c"`; it should be `href="contact.html"`.
- `types.html` references `mount everest.jpg` (with a space), but the file is named `mount_everest.jpg`.
- `nav-init.js` is not linked in any HTML page. To enable transitions, add `<script src="nav-init.js"></script>` in each page's `<head>`, after `style.css`.
- Some file names contain typos (`histroy.html`, `techinque.html`, `herzaid.html`). If you rename them, also update all links and the `order` array in `nav-init.js`.

## 📜 License

This project is for learning and personal use. Unsplash images are subject to their own licenses.
