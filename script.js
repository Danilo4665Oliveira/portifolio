/* ============================================
   MENU SANDUÍCHE (MOBILE)
============================================ */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

function openMobileMenu() {
  mobileMenu.classList.add("active");
  menuToggle.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
}

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("active");
  isOpen ? closeMobileMenu() : openMobileMenu();
});

// Fecha o menu ao clicar em qualquer link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* ============================================
   CARROSSEL DE HABILIDADES
============================================ */
const skillsTrack = document.getElementById("skillsTrack");
const skillsDotsContainer = document.getElementById("skillsDots");
const skillsPrevBtn = document.getElementById("skillsPrev");
const skillsNextBtn = document.getElementById("skillsNext");

const skillItems = Array.from(skillsTrack.children);
let currentSkill = 0;

// Cria os "dots" (bolinhas) de navegação automaticamente,
// um para cada .skill-item existente
skillItems.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.classList.add("skill-dot");
  dot.setAttribute("aria-label", `Ir para habilidade ${index + 1}`);
  dot.addEventListener("click", () => {
    goToSkill(index);
  });
  skillsDotsContainer.appendChild(dot);
});

const skillDots = Array.from(skillsDotsContainer.children);

function updateSkillsUI() {
  // Move a trilha suavemente até o item ativo (a transição
  // suave vem do "transition" definido no CSS em .skills-track)
  skillsTrack.style.transform = `translateX(-${currentSkill * 100}%)`;

  skillDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSkill);
  });
}

function goToSkill(index) {
  currentSkill = (index + skillItems.length) % skillItems.length;
  updateSkillsUI();
}

function nextSkill() {
  goToSkill(currentSkill + 1);
}

function prevSkill() {
  goToSkill(currentSkill - 1);
}

skillsNextBtn.addEventListener("click", nextSkill);
skillsPrevBtn.addEventListener("click", prevSkill);

updateSkillsUI();

/* ============================================
   FORMULÁRIO DE CONTATO -> ENVIO REAL DE E-MAIL
   (usando Formspree: https://formspree.io)
============================================ */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector(".form-button");
  const originalButtonText = submitButton.value;

  submitButton.value = "Enviando...";
  submitButton.disabled = true;
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent = "Mensagem enviada com sucesso! Em breve retorno o contato.";
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      formStatus.textContent = "Não foi possível enviar. Tente novamente em instantes.";
      formStatus.classList.add("error");
    }
  } catch (error) {
    formStatus.textContent = "Erro de conexão. Verifique sua internet e tente novamente.";
    formStatus.classList.add("error");
  } finally {
    submitButton.value = originalButtonText;
    submitButton.disabled = false;
  }
});
