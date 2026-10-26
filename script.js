/* Lipa City Colleges Learning Resources */

/* ---------- Resource data (SAMPLE — edit this section) ---------- */
/* This file is public. Never store real passwords or access codes here. */
const resourceData = {
  OPAC: {
    url: "https://example.com/opac",
    description:
      "OPAC (Online Public Access Catalog) is the library's searchable list of books and other materials. Use it to check whether a title is available before visiting the shelves. It is designed for all LCC students, faculty, and staff.",
    access: "Username: your student ID  |  Password: ask the librarian",
    tips: [
      "Type a title, author, or subject in the search box.",
      "Note the call number and shelf location shown in the result.",
      "Ask the librarian at the counter if a title is marked unavailable."
    ]
  },

  Gale: {
    url: "https://example.com/gale",
    description:
      "Gale is an academic database with journals, e-books, news, and reference articles. It is best for research papers, assignments, and fact-checking. Students and teachers can use it anytime, on or off campus.",
    access: "Access code: SAMPLE-GALE-2024  |  Ask the librarian for the current code",
    tips: [
      "Enter the access code on the Gale landing page before searching.",
      "Put quotation marks around a phrase to search it exactly.",
      "Download or email articles so you can read them offline."
    ]
  },

  IG: {
    url: "https://example.com/ig",
    description:
      "IG is the library's digital reading platform for e-books and course references. It lets you read assigned titles on a phone, tablet, or computer. It is ideal for students who prefer digital copies or need a book outside library hours.",
    access: "Username: library guest  |  Password: ask the librarian",
    tips: [
      "Sign in with the account given at the counter.",
      "Use the search bar or browse by subject to find a title.",
      "Increase the text size or switch to night mode for easier reading."
    ]
  },

  Tritech: {
    url: "https://example.com/tritech",
    description:
      "Tritech provides digital references for technical and vocational courses. It covers modules, reviewers, and practical guides you can study at your own pace. It is useful for TVET, engineering, and technology students.",
    access: "Sample login: tritech-demo  |  Password: ********",
    tips: [
      "Log in with the demo account shown above.",
      "Choose your course area to see the available modules.",
      "Save a module to your device before your data runs out."
    ]
  }
};

/* Shown when a card has no matching entry above. */
const missingResource = {
  url: "",
  description: "Details for this e-resource are not available yet. Please ask the librarian for more information.",
  access: "Ask the librarian for the access details.",
  tips: []
};

/* ---------- Slider ---------- */
const slideshow = document.querySelector(".slideshow-container");
const slides = document.querySelectorAll(".mySlides");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let slideIndex = 1;
let slideTimer = null;
let autoplayTimer = null;

showSlides();
startAutoplay();

if (slideshow) {
  slideshow.addEventListener("mouseenter", stopAutoplay);
  slideshow.addEventListener("mouseleave", startAutoplay);
}

function resetSlides(activeIndex) {
  for (let index = 0; index < slides.length; index++) {
    slides[index].style.display = index === activeIndex ? "block" : "none";
    slides[index].classList.remove("slide-in-right", "slide-in-left", "slide-out-right", "slide-out-left");
  }
}

function showSlides() {
  resetSlides(slideIndex - 1);
}

function plusSlides(step) {
  if (slideTimer) {
    clearTimeout(slideTimer);
    resetSlides(slideIndex - 1);
    slideTimer = null;
  }

  const previousIndex = slideIndex - 1;
  slideIndex = (slideIndex - 1 + step + slides.length) % slides.length + 1;
  const nextIndex = slideIndex - 1;
  const incomingClass = step > 0 ? "slide-in-right" : "slide-in-left";
  const outgoingClass = step > 0 ? "slide-out-left" : "slide-out-right";

  slides[previousIndex].style.display = "block";
  slides[previousIndex].classList.add(outgoingClass);
  slides[nextIndex].style.display = "block";
  slides[nextIndex].classList.add(incomingClass);

  slideTimer = setTimeout(function () {
    resetSlides(nextIndex);
    slideTimer = null;
  }, 500);
}

function advanceSlide() {
  plusSlides(1);
}

function startAutoplay() {
  if (reduceMotion) return;
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(advanceSlide, 5000);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

function restartAutoplay() {
  startAutoplay();
}

/* ---------- Lazy card logos ---------- */
const cardImages = document.querySelectorAll(".sites img");
for (const image of cardImages) {
  image.loading = "lazy";
  image.decoding = "async";
}

/* ---------- Modal markup ---------- */
const overlay = document.createElement("div");
overlay.className = "resource-modal-overlay";
overlay.id = "resourceModalOverlay";
overlay.hidden = true;
overlay.innerHTML = `
  <div class="resource-modal" role="dialog" aria-modal="true"
       aria-labelledby="resourceModalTitle" aria-describedby="resourceModalDesc" tabindex="-1">
    <span class="resource-modal-accent" aria-hidden="true"></span>

    <button type="button" class="resource-modal-close" aria-label="Close resource details">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
      </svg>
    </button>

    <div class="resource-modal-head">
      <img class="resource-modal-logo" src="" alt="" width="72" height="72">
      <div>
        <p class="resource-modal-eyebrow">E-Resource</p>
        <h2 class="resource-modal-title" id="resourceModalTitle"></h2>
      </div>
    </div>

    <p class="resource-modal-desc" id="resourceModalDesc"></p>

    <section class="resource-block">
      <h3 class="resource-block-title">Website</h3>
      <p class="resource-url">
        <span class="resource-url-label">Link</span>
        <span class="resource-url-text"></span>
      </p>
      <a class="resource-open-btn" href="#" target="_blank" rel="noopener noreferrer">
        Open Website <span aria-hidden="true">&#8599;</span>
      </a>
      <p class="resource-url-note">Opens in a new tab.</p>
    </section>

    <section class="resource-block resource-block--access">
      <h3 class="resource-block-title">Access</h3>
      <div class="resource-access-row">
        <p class="resource-access-text"></p>
        <button type="button" class="resource-copy-btn">Copy</button>
      </div>
      <p class="resource-access-note">Access details are placeholders — ask the librarian for current credentials.</p>
      <p class="resource-status resource-sr-only" role="status" aria-live="polite"></p>
    </section>

    <section class="resource-block resource-block--tips">
      <h3 class="resource-block-title">How to access</h3>
      <ul class="resource-tips"></ul>
    </section>

    <p class="resource-modal-help">Need help? Ask the librarian at the counter.</p>
  </div>
`;
document.body.appendChild(overlay);

/* ---------- Cached elements ---------- */
const modal = overlay.querySelector(".resource-modal");
const closeButton = overlay.querySelector(".resource-modal-close");
const logo = overlay.querySelector(".resource-modal-logo");
const modalTitle = overlay.querySelector(".resource-modal-title");
const modalDescription = overlay.querySelector(".resource-modal-desc");
const urlText = overlay.querySelector(".resource-url-text");
const openButton = overlay.querySelector(".resource-open-btn");
const urlNote = overlay.querySelector(".resource-url-note");
const accessBlock = overlay.querySelector(".resource-block--access");
const accessText = overlay.querySelector(".resource-access-text");
const copyButton = overlay.querySelector(".resource-copy-btn");
const copyStatus = overlay.querySelector(".resource-status");
const tipsBlock = overlay.querySelector(".resource-block--tips");
const tipsList = overlay.querySelector(".resource-tips");

const backgroundRegions = document.querySelectorAll("header, main, footer");
const cardList = document.querySelector(".sites-list");
const resourceButtons = document.querySelectorAll(".sites .website-button");

let lastFocused = null;
let closeTimer = null;
let copyTimer = null;
let savedBodyPadding = "";
let focusableElements = [];
let modalOpen = false;

/* Read each card once instead of inside the click handler. */
for (const button of resourceButtons) {
  const card = button.closest(".sites");
  if (!card) continue;

  const heading = card.querySelector("h3");
  const image = card.querySelector("img");

  if (heading) button.dataset.resource = heading.textContent.trim();
  if (image) button.dataset.logo = image.src;
}

/* ---------- Helpers ---------- */
function getResource(name) {
  const key = name.trim().toLowerCase();

  for (const resourceName of Object.keys(resourceData)) {
    if (resourceName.toLowerCase() === key) {
      return { name: resourceName, info: resourceData[resourceName] };
    }
  }

  return null;
}

function getSafeUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    }
  } catch (error) {
    return "";
  }

  return "";
}

function setBackgroundInert(isInert) {
  for (const region of backgroundRegions) {
    if (isInert) {
      region.setAttribute("inert", "");
    } else {
      region.removeAttribute("inert");
    }
  }
}

function lockScroll() {
  if (document.body.classList.contains("modal-open")) return;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  savedBodyPadding = document.body.style.paddingRight;
  document.body.classList.add("modal-open");

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = scrollbarWidth + "px";
  }
}

function unlockScroll() {
  if (!document.body.classList.contains("modal-open")) return;

  document.body.classList.remove("modal-open");
  document.body.style.paddingRight = savedBodyPadding;
}

function resetCopyButton() {
  clearTimeout(copyTimer);
  copyButton.textContent = "Copy";
  copyButton.classList.remove("is-copied");
  copyStatus.textContent = "";
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      /* Try the older method below. */
    }
  }

  try {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.setAttribute("aria-hidden", "true");
    helper.style.position = "fixed";
    helper.style.top = "-9999px";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    helper.setSelectionRange(0, helper.value.length);

    const success = document.execCommand("copy");
    helper.remove();
    return success;
  } catch (error) {
    return false;
  }
}

/* ---------- Focus ---------- */
function updateFocusableElements() {
  const items = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
  focusableElements = [];

  for (const item of items) {
    if (!item.hidden && item.offsetParent !== null) {
      focusableElements.push(item);
    }
  }
}

/* Focus without scrolling; fall back for older browsers. */
function focusElement(element) {
  try {
    element.focus({ preventScroll: true });
  } catch (error) {
    element.focus();
  }
}

function trapFocus(event) {
  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (!first) {
    event.preventDefault();
    modal.focus();
    return;
  }

  const active = document.activeElement;

  if (event.shiftKey) {
    if (active === first || active === modal || !modal.contains(active)) {
      event.preventDefault();
      last.focus();
    }
  } else if (active === last || !modal.contains(active)) {
    event.preventDefault();
    first.focus();
  }
}

/* ---------- Open / close ---------- */
function showModalOverlay() {
  if (modalOpen) overlay.classList.add("is-open");
}

function showModalOverlayNextFrame() {
  requestAnimationFrame(showModalOverlay);
}

/* Fill the dialog with one resource's details. */
function fillModal(info, displayName, button) {
  modalTitle.textContent = displayName;
  modalDescription.textContent = info.description;
  logo.alt = displayName + " logo";

  if (button.dataset.logo) {
    logo.src = button.dataset.logo;
    logo.hidden = false;
  } else {
    logo.hidden = true;
  }

  const rawUrl = info.url || "";
  const safeUrl = getSafeUrl(rawUrl);
  urlText.textContent = rawUrl || "Link coming soon";

  if (safeUrl) {
    openButton.href = safeUrl;
    openButton.hidden = false;
    urlNote.textContent = "Opens in a new tab.";
  } else {
    openButton.href = "#";
    openButton.hidden = true;
    urlNote.textContent = "Link coming soon — please ask the librarian.";
  }

  let access = "";
  if (typeof info.access === "string") access = info.access.trim();

  accessText.textContent = access;
  accessBlock.hidden = !access;

  const tips = info.tips || [];
  tipsList.textContent = "";
  let tipCount = 0;

  for (const tip of tips) {
    if (!tip) continue;

    const item = document.createElement("li");
    item.textContent = tip;
    tipsList.appendChild(item);
    tipCount++;
  }

  tipsBlock.hidden = tipCount === 0;
  resetCopyButton();
}

function openModal(name, button) {
  const match = getResource(name);
  const info = match ? match.info : missingResource;
  const displayName = match ? match.name : name;

  lastFocused = button;
  modalOpen = true;
  fillModal(info, displayName, button);

  modal.scrollTop = 0;
  clearTimeout(closeTimer);
  overlay.hidden = false;
  lockScroll();
  setBackgroundInert(true);
  updateFocusableElements();
  focusElement(modal);

  requestAnimationFrame(showModalOverlayNextFrame);
}

function closeModal() {
  if (!modalOpen) return;

  modalOpen = false;
  overlay.classList.remove("is-open");
  clearTimeout(closeTimer);
  clearTimeout(copyTimer);

  const delay = reduceMotion ? 0 : 220;

  closeTimer = setTimeout(function () {
    overlay.hidden = true;
    unlockScroll();
    setBackgroundInert(false);

    if (lastFocused) {
      focusElement(lastFocused);
    }

    lastFocused = null;
  }, delay);
}

/* ---------- Events ---------- */
async function copyAccessText() {
  const text = accessText.textContent.trim();
  if (!text) return;

  const copied = await copyToClipboard(text);

  if (copied) {
    copyButton.textContent = "Copied!";
    copyButton.classList.add("is-copied");
    copyStatus.textContent = "Access details copied to the clipboard.";
  } else {
    copyButton.textContent = "Copy failed";
    copyButton.classList.remove("is-copied");
    copyStatus.textContent = "Copy failed. Please select the text and copy it manually.";
  }

  clearTimeout(copyTimer);
  copyTimer = setTimeout(resetCopyButton, 2000);
}

function handleCardClick(event) {
  const button = event.target.closest(".website-button");
  if (!button || !cardList.contains(button)) return;

  event.preventDefault();
  if (button.dataset.resource) openModal(button.dataset.resource, button);
}

function handleOverlayClick(event) {
  if (event.target === overlay) closeModal();
}

function handleKeydown(event) {
  if (!modalOpen) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key === "Tab") trapFocus(event);
}

closeButton.addEventListener("click", closeModal);
copyButton.addEventListener("click", copyAccessText);
overlay.addEventListener("click", handleOverlayClick);
document.addEventListener("keydown", handleKeydown);
if (cardList) cardList.addEventListener("click", handleCardClick);
