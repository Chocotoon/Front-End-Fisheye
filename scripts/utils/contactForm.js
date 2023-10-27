const modal = document.getElementById("contact_modal");
const mainContent = document.querySelector("main");
const modalContent = document.querySelector(".modal")

// Ouverture et fermeture de la modale
function displayModal() {
    const closeModalBtn = document.querySelector(".modal header button");
    closeModalBtn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && modal.style.display === "block") {
          closeModal();
        }
      });
      modalContent.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.style.display === "block") {
          closeLightbox();
        }
      });
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-describedby", "Formulaire de contact");
    modal.setAttribute("aria-modal", "true");
    mainContent.setAttribute("aria-hidden", "true");
    modal.focus();
}



function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    mainContent.setAttribute("aria-hidden", "false");
}

// Navigation au clavier de la modale
modal.addEventListener("keydown", function (e) {
    if (e.key === "Tab" && modal.style.display === "block") {
      const focusableElements = modal.querySelectorAll("input, button, textarea");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
  
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Vérification des champs de la modale
 const submitBtn = document.querySelector(".contact_button");
 submitBtn.addEventListener("click", validate);
 document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
  });
 function validate() {
    let val1 = validatePrenom();
    let val2 = validateNom();
    let val3 = validateMail();
    let val4 = validateMessage();

    if (!val1 || !val2 || !val3 || !val4) {

    }
    
    else {
        console.log(val1, val2, val3, val4);
        document.querySelector('form').reset();
    }
 }

 function validatePrenom () {
    const prenom = document.getElementById("prenom");
    trimmedPrenom = prenom.value.trim();
    if (trimmedPrenom == "") {
        return false
    }
    else {
        return trimmedPrenom;
    }
 }

 function validateNom () {
    const nom = document.getElementById("nom");
    trimmedNom = nom.value.trim();
    if (trimmedNom == "") {
        return false
    }
    else {
        return trimmedNom;
    }
 }

 function validateMail () {
    const mail = document.getElementById("mail");
    const mailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!mail.value.match(mailRegex)) {
        return false;
    }

    else {
        return mail.value;
    }
 }

 function validateMessage () {
    const message = document.getElementById("message");
    trimmedMessage = message.value.trim();

    if (trimmedMessage == "") {
        return false;
    }

    else {
        return trimmedMessage;
    }
 }