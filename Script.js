document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE MENU
  const menuButtons = document.querySelectorAll(".menu-btn");

  menuButtons.forEach(function (button) {
    const header = button.closest("header");
    const menu = header
      ? header.querySelector(".nav-links, .main-nav")
      : document.querySelector(".nav-links, .main-nav");

    if (!menu) return;

    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("menu-open");

      button.setAttribute("aria-expanded", String(isOpen));
      button.textContent = isOpen ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("menu-open");
        button.setAttribute("aria-expanded", "false");
        button.textContent = "☰";
      });
    });
  });


  // 2. GALLERY LIGHTBOX
  const galleryImages = document.querySelectorAll(
    ".gallery-grid a img, .gallery-item a img, .gallery-card a img"
  );

  if (galleryImages.length > 0) {
    const lightbox = document.createElement("div");

    lightbox.id = "gallery-lightbox";

    lightbox.innerHTML = `
      <button type="button" class="lightbox-close"
        aria-label="Close">✕</button>

      <button type="button" class="lightbox-prev"
        aria-label="Previous">❮</button>

      <img class="lightbox-image" src="" alt="">

      <button type="button" class="lightbox-next"
        aria-label="Next">❯</button>

      <div class="lightbox-counter"></div>
    `;

    document.body.appendChild(lightbox);

    const image = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const counter = lightbox.querySelector(".lightbox-counter");

    const images = Array.from(galleryImages).map(function (img) {
      return {
        src: img.closest("a")?.href || img.src,
        alt: img.alt || "Cricket academy photo"
      };
    });

    let currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + images.length) % images.length;
      image.src = images[currentIndex].src;
      image.alt = images[currentIndex].alt;
      counter.textContent =
        (currentIndex + 1) + " / " + images.length;
    }

    function openLightbox(index) {
      showImage(index);
      lightbox.classList.add("lightbox-visible");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("lightbox-visible");
      document.body.style.overflow = "";
    }

    galleryImages.forEach(function (img, index) {
      const link = img.closest("a");
      if (!link) return;

      link.addEventListener("click", function (event) {
        event.preventDefault();
        openLightbox(index);
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", function () {
      showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
      showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("lightbox-visible")) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    });
  }


  // 3. CONTACT FORM VALIDATION
  document.querySelectorAll(".contact-form form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
      }
    });
  });


  // 4. AUTOMATIC FOOTER YEAR
  const year = new Date().getFullYear();

  document.querySelectorAll(".current-year").forEach(function (element) {
    element.textContent = year;
  });


  // 5. SMOOTH SCROLL FOR PAGE LINKS
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});
