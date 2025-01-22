// Smooth Scrolling
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          // Smooth scrolling to the target section
          window.scrollTo({
              top: targetElement.offsetTop - 50, // Adjust for fixed navbar
              behavior: 'smooth',
          });

          // Close the mobile menu after clicking
          document.querySelector('.nav-links').classList.remove('show');
      } else {
          console.error(`Target element with ID "${targetId}" not found.`);
      }
  });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
  });
}

// Image Modal Functions
function showImageModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  if (modal && modalImage) {
      modal.style.display = "flex";
      modalImage.src = imageSrc; // Set the image source dynamically
  } else {
      console.error("Modal or modalImage element is missing.");
  }
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
      modal.style.display = "none";
  }
}
document.querySelector('a[href="#about"]').addEventListener("click", function (e) {
  e.preventDefault();
  const aboutSection = document.querySelector("#about");

  if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });

      const motionText = document.querySelector("#about-motion-text");
      if (motionText) {
          setTimeout(() => {
              motionText.classList.add("animate-motion");
          }, 10);
      }
  } else {
      console.error('Element with ID "about" not found.');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const motionText = document.querySelector("#about-motion-text");
  const aboutSection = document.querySelector("#about");

  if (motionText && aboutSection) {
      // Check if the About section is visible on load
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  motionText.classList.add("animate-motion");
              }
          });
      });

      // Observe the About section
      observer.observe(aboutSection);
  } else {
      console.error('Element with ID "about-motion-text" or "#about" not found.');
  }
});


// Form Validation Script
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const subject = form.querySelector("#subject");
      const message = form.querySelector("#message");
      let isValid = true;

      // Clear all existing error messages
      form.querySelectorAll(".error-message").forEach((msg) => msg.remove());

      // Validation Functions
      const showError = (input, message) => {
        const error = document.createElement("div");
        error.textContent = message;
        error.classList.add("error-message");
        error.style.color = "red";
        error.style.marginTop = "5px";
        error.style.fontSize = "0.9em";
        input.insertAdjacentElement("afterend", error);
        isValid = false;
      };

      const isNotEmpty = (input, fieldName) => {
        if (input.value.trim() === "") {
          showError(input, `${fieldName} is required`);
        }
      };

      const isValidEmail = (input) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
          showError(input, "Please enter a valid email address");
        }
      };

      // Run Validations
      isNotEmpty(name, "Name");
      isNotEmpty(subject, "Subject");
      isNotEmpty(message, "Message");
      isValidEmail(email);

      // Submit the form if all validations pass
      if (isValid) {
        form.submit();
      }
    });
  }
});
