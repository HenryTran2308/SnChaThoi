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

function launchConfetti(amount = 90) {
  const colors = ["#f3d99a", "#c99738", "#ffffff", "#a94b5d", "#6b1f2b"];

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    const size = Math.random() * 8 + 7;

    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.45}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.setProperty("--drift", `${Math.random() * 240 - 120}px`);

    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2600);
  }
}

celebrateBtn.addEventListener("click", () => launchConfetti());

window.addEventListener("load", () => {
  window.setTimeout(() => launchConfetti(55), 650);
});

const bgMusic = document.querySelector("#bgMusic");
const musicBtn = document.querySelector("#musicBtn");

let isMusicPlaying = false;

function playMusic() {
  bgMusic.volume = 0.45;

  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicBtn.textContent = "🔊";
    musicBtn.classList.add("is-playing");
  }).catch(() => {
    console.log("Trình duyệt chặn tự phát nhạc.");
  });
}

function pauseMusic() {
  bgMusic.pause();
  isMusicPlaying = false;
  musicBtn.textContent = "🎵";
  musicBtn.classList.remove("is-playing");
}

musicBtn.addEventListener("click", () => {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

document.addEventListener("click", () => {
  if (!isMusicPlaying) {
    playMusic();
  }
}, { once: true });

function scrollToMessage(e) {
  e.preventDefault();

  const message = document.querySelector("#message");

  const navbarHeight = document.querySelector(".birthday-nav").offsetHeight;

  const y =
    message.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight + 75; // cách navbar thêm 20px

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}

document
  .querySelector("#openMessageBtn")
  .addEventListener("click", scrollToMessage);

document
  .querySelector("#messageNav")
  .addEventListener("click", scrollToMessage);