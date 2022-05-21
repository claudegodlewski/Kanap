// Récupération du panier depuis localStorage
const contenu = JSON.parse(localStorage.getItem("panier")) || [];
contenu.sort((a, b) => a.name.localeCompare(b.name)); // source: https://www.codegrepper.com/code-examples/javascript/frameworks/node_modules/sort+javascript+alphabetically

// Gestion du Total
let totalPrice = document.getElementById('totalPrice');
let totalQuantity = document.getElementById('totalQuantity');
let gestionPrix = 0;
let gestionQuantite = 0;



// Fonction: gestion du total
function gestionTotale(article) {

    let gestionPrix = contenu
      .map((article) => parseInt(article.totalPrice)) // source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_map
      .reduce((a, b) => a + b); // source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_reduce

    totalPrice.innerHTML = gestionPrix;

    let gestionQuantite = contenu
      .map((article) => parseInt(article.quantity))
      .reduce((a, b) => a + b);

    totalQuantity.innerHTML = gestionQuantite;

}



// Fonction: retrait d'article
function enleverArticle(i) {
  contenu.splice(i, 1);
  localStorage.setItem("panier", JSON.stringify(contenu));
  // location.reload(); // deprecated
}



// HTML
if (contenu == null) {

} else {
  
  contenu.forEach((article) => {

    document.querySelector(
      "#cart__items"
    ).innerHTML += `<article class="cart__item" data-Id="${article.id}" data-color="${article.color}">
            <div class="cart__item__img">
                <img src="${article.image}" alt="${article.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${article.name}</h2>
                    <p>${article.color}</p>
                    <p id="article__price">${article.price} €</p>
                </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${article.quantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
         </article>`;

    gestionTotale(article);

  });

}



// Quantités articles
const articlesQuantites = document.querySelectorAll(".itemQuantity");



articlesQuantites.forEach(function (quantity, i) {

        quantity.addEventListener("change", () => { // source: https://www.javascripttutorial.net/javascript-dom/javascript-change-event

            if (quantity.value < 0) {

              enleverArticle(i);
              console.log(quantity.closest("article"))
              quantity.closest("article").remove()

            } else {
              
              let nouveauPrix = String(quantity.value * contenu[i].price);
              let nouveauQuantite = quantity.value;

              let afficherNouveauPrix = document.querySelectorAll("#article__price");
              let afficherNouveauQuantite = document.querySelectorAll(
                ".cart__item__content__settings__quantity p"
              );

            // Affichage du nouveau prix
              afficherNouveauQuantite[i].textContent = "Qté : " + nouveauQuantite;

              contenu[i].quantity = quantity.value;
              contenu[i].totalPrice = nouveauPrix;

              localStorage.setItem("panier", JSON.stringify(contenu));

            }

            // Maj du formulaire
            gestionPrix = 0;
            gestionQuantite = 0;

            contenu.forEach((article) => {

              gestionTotale(article);

            });

        }); // Fin quantity.addEventListener

}); // Fin de articlesQuantites.forEach



// Bouton de suppression
const boutonRetrait = document.querySelectorAll(".deleteItem");

boutonRetrait.forEach(function (btn, i) {
  btn.addEventListener("click", () => {
    enleverArticle(i);
    btn.closest("article").remove()
    //window.location.href = window.location.href;
  });
});



// Fonction: regex
function verificationEntreesFormulaire() {

      // Ajout des Regex
        let selectionClasseForm = document.querySelector(".cart__order__form");

      // Création des expressions régulières
        let verificationPrenom = new RegExp("^[a-zA-Z '-]+$");
        let verificationNom = new RegExp("^[a-zA-Z '-]+$");
        let verificationAdresse = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
        let verificationVille = new RegExp("^[a-zA-Z '-]+$");
        let verificationEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

      // Ecoute de la modification du prénom
      selectionClasseForm.firstName.addEventListener('change', function() {
        validationFirstName(this);
      });

      // Ecoute de la modification du nom
      selectionClasseForm.lastName.addEventListener('change', function() {
        validationLastName(this);
      });

      // Ecoute de la modification de l'adresse
      selectionClasseForm.address.addEventListener('change', function() {
        validationAddress(this);
      });

      // Ecoute de la modification de la ville
      selectionClasseForm.city.addEventListener('change', function() {
        validationCity(this);
      });

      // Ecoute de la modification de l'e-mail
      selectionClasseForm.email.addEventListener('change', function() {
        validationEmail(this);
      });

          // Validation du prénom
          const validationFirstName = function(inputFirstName) {

            document.getElementById("order").disabled = true;

              let firstNameErrorMsg = inputFirstName.nextElementSibling;

              if (verificationPrenom.test(inputFirstName.value)) { //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
                
                  firstNameErrorMsg.innerText = '';

            document.getElementById("order").disabled = false;

              } else {
                  firstNameErrorMsg.innerText = "Veuillez ne pas écrire de chiffres dans votre prénom.";
              }

          }

          // Validation du nom
          const validationLastName = function(inputLastName) {

            document.getElementById("order").disabled = true;

              let lastNameErrorMsg = inputLastName.nextElementSibling;

              if (verificationNom.test(inputLastName.value)) {
                  lastNameErrorMsg.innerText = '';

            document.getElementById("order").disabled = false;

              } else {
                  lastNameErrorMsg.innerText = "Veuillez ne pas écrire de chiffres dans votre nom.";
              }

          }

          // Validation de l'adresse
          const validationAddress = function(inputAddress) {

            document.getElementById("order").disabled = true;

              let addressErrorMsg = inputAddress.nextElementSibling;

              if (verificationAdresse.test(inputAddress.value)) {
                addressErrorMsg.innerText = '';

            document.getElementById("order").disabled = false;

              } else {
                addressErrorMsg.innerText = "Veuillez écrire une adresse correcte.";
              }

          }

          // Validation de la ville
          const validationCity = function(inputCity) {

            document.getElementById("order").disabled = true;

              let cityErrorMsg = inputCity.nextElementSibling;

              if (verificationVille.test(inputCity.value)) {
                cityErrorMsg.innerText = '';

            document.getElementById("order").disabled = false;

              } else {
                cityErrorMsg.innerText = "Veuillez écrire une ville correcte.";
              }

          }

          // Validation de l'email
          const validationEmail = function(inputEmail) {

            document.getElementById("order").disabled = true;

              let emailErrorMsg = inputEmail.nextElementSibling;

              if (verificationEmail.test(inputEmail.value)) {
                emailErrorMsg.innerText = '';

            document.getElementById("order").disabled = false;

              } else {
                emailErrorMsg.innerText = "Veuillez écrire votre e-mail.";
              }

          }

} // Fin de verificationEntreesFormulaire()



verificationEntreesFormulaire()



function envoiDesDonnees() {

    const achats = document.getElementById('order');

        order.addEventListener('click', (event) => {

            event.preventDefault();
          
            // Ajout des données du formulaire dans un objet
            const contact = {};
            contact.firstName = document.getElementById("firstName").value;
            contact.lastName = document.getElementById("lastName").value;
            contact.address = document.getElementById("address").value;
            contact.city = document.getElementById("city").value;
            contact.email = document.getElementById("email").value;

              // Tableau Id
              const products = [];
                contenu.forEach((article) => {
                products.push(article.id);
                console.log(contenu)
              });
          
                // Création Objet et ajout du formulaire du contact et de l'Id
                const objetFormulaireProduits = {
                  contact,
                  products
                };
          
                  // Envoi avec méthode POST
                  const options = {
                    method: 'POST',
                    body: JSON.stringify(objetFormulaireProduits),
                    headers: { 
                      'Content-Type': 'application/json',
                    }
                  };
                
                    // Récupération de orderId 
                    fetch("http://localhost:3000/api/products/order", options)
                    .then((res) => {
                      return res.json();
                    })

                      .then((valeur) => {
                        document.location.href = `confirmation.html?id=${valeur.orderId}`;
                      })
        
        }); // Fin order.addEventListener

} // Fin de envoiDesDonnees()



  envoiDesDonnees()