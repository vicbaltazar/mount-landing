// THEME TOGGLE
const root = document.documentElement;
const themeToggleBtn = document.querySelector(".theme-toggle");

// tema salvo
const savedTheme = localStorage.getItem("mount-theme");
if (savedTheme === "light") {
  root.setAttribute("data-theme", "light");
} else {
  root.removeAttribute("data-theme");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";

    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("mount-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("mount-theme", "light");
    }
  });
}

// SCROLL SUAVE PARA LINKS DO HEADER
const navLinks = document.querySelectorAll('.header__nav a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const top =
        targetElement.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// DESTACAR SEÇÃO ATIVA NA NAV
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.header__nav a[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        document
          .querySelectorAll(".header__nav a")
          .forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// ANIMAÇÃO DE ENTRADA DOS CARDS
const cards = document.querySelectorAll(".card");

const cardsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card--visible");
        cardsObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

cards.forEach((card) => {
  card.classList.add("card--hidden");
  cardsObserver.observe(card);
});

// VALIDAÇÃO SIMPLES DO FORMULÁRIO
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");

    let hasError = false;

    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove("input-error");
    });

    if (!nameInput.value.trim()) {
      nameInput.classList.add("input-error");
      hasError = true;
    }

    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue || !emailRegex.test(emailValue)) {
      emailInput.classList.add("input-error");
      hasError = true;
    }

    if (!messageInput.value.trim()) {
      messageInput.classList.add("input-error");
      hasError = true;
    }

    if (hasError) {
      alert("Por favor, preencha nome, e‑mail válido e mensagem.");
      return;
    }

    alert("Obrigado pela mensagem! Este formulário é apenas demonstrativo.");
    form.reset();
  });
}
