const backToTop = document.getElementById("backToTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const showcaseCards = document.querySelectorAll(".showcase-card");
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");
const submissionNavItems = document.querySelectorAll(".submission-nav-item");
const submissionPanels = document.querySelectorAll(".submission-panel");

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!primaryNav.classList.contains("is-open")) return;
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    showcaseCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const isMatch = selected === "all" || categories.includes(selected);
      card.hidden = !isMatch;
    });
  });
});

if (submissionNavItems.length > 0 && submissionPanels.length > 0) {
  const activateSubmissionPanel = (targetId) => {
    submissionNavItems.forEach((item) => {
      const isSelected = item.dataset.target === targetId;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });

    submissionPanels.forEach((panel) => {
      const isActive = panel.id === targetId;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    });
  };

  submissionNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.dataset.target;
      if (!targetId) return;
      activateSubmissionPanel(targetId);
    });
  });
}

