const revealItems = document.querySelectorAll(".reveal");
const confettiLayer = document.querySelector("#confettiLayer");
const celebrateBtn = document.querySelector("#celebrateBtn");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function launchConfetti(amount = 10) {

  const colors = [
    "#ffffff",
    "#f3d99a",
    "#c99738",
    "#b22222",
    "#8b0000"
  ];

  const shapes = ["square", "rect", "circle"];

  for (let i = 0; i < amount; i++) {

    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    const size = Math.random() * 5 + 3;

    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    if (shape === "circle") {

      piece.style.width = size + "px";
      piece.style.height = size + "px";
      piece.style.borderRadius = "50%";

    } else if (shape === "rect") {

      piece.style.width = size + "px";
      piece.style.height = size * 1.8 + "px";
      piece.style.borderRadius = "2px";

    } else {

      piece.style.width = size + "px";
      piece.style.height = size + "px";
      piece.style.borderRadius = "1px";

    }

    piece.style.left = Math.random() * 100 + "%";

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.opacity = .8;

    piece.style.animationDuration =
      (Math.random() * 3 + 5) + "s";

    piece.style.animationDelay =
      Math.random() + "s";

    piece.style.setProperty(
      "--drift",
      `${Math.random() * 120 - 60}px`
    );

    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    confettiLayer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 9000);

  }

}

if (celebrateBtn) {
  celebrateBtn.addEventListener("click", () => launchConfetti());
}

window.addEventListener("load", () => {

  launchConfetti(35);

  setInterval(() => {
    launchConfetti(6);
  }, 500);

});

const bgMusic = document.querySelector("#bgMusic");

if (bgMusic) {
  bgMusic.volume = 0.45;

  function startMusic() {
    bgMusic.play().catch(() => {
      console.log("Trình duyệt chặn tự phát nhạc.");
    });
  }

  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });
  document.addEventListener("keydown", startMusic, { once: true });
}

function scrollToMessage(e) {
  e.preventDefault();

  const message = document.querySelector("#message");
  const navbar = document.querySelector(".birthday-nav");

  if (!message || !navbar) return;

  const navbarHeight = navbar.offsetHeight;

  const y =
    message.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    10;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}

const openMessageBtn = document.querySelector("#openMessageBtn");
const messageNav = document.querySelector("#messageNav");

if (openMessageBtn) {
  openMessageBtn.addEventListener("click", scrollToMessage);
}

if (messageNav) {
  messageNav.addEventListener("click", scrollToMessage);
}