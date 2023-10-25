function displayModal() {
    const modal = document.getElementById("contact_modal");
    const mainContent = document.querySelector("main");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-describedby", "Formulaire de contact");
    mainContent.setAttribute("aria-hidden", "true");
    const modalCloseBtn = document.querySelector(".modal header img")
    modalCloseBtn.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const mainContent = document.querySelector("main");
    const modalCloseBtn = document.querySelector(".modal header img")
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    mainContent.setAttribute("aria-hidden", "false");
    modalCloseBtn.focus();
}

/*document.addEventListener('keydown', e => {
    const modal = document.getElementById("contact_modal");
    const keyCode = e.keyCode ? e.keyCode : e.which
  
    if (modal.hasAttribute('aria-hidden') == 'false' && keyCode === 27) {
        closeModal()
    }
 })*/

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