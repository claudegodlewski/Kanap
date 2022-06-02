// Récupération du panier depuis localStorage et sortie par ordre alphabétique.
const contenu = JSON.parse(localStorage.getItem("panierKanap")) || [];
contenu.sort((a, b) => a.name.localeCompare(b.name));

if (contenu)
{

  contenu.forEach(function (a) {

    // Récupération de tous les identifiants du client.
    fetch(`http://localhost:3000/api/products/${a.id}`)

    // Vérification du succès de la requête, et récupération des données au format JSON.
    .then(function(res) {
        if (res.ok) {
          return res.json();
          }
      })

    // Récupération du prix unitaire dans "b" et ajout des informations dans le code HTML.
    .then(function(b) {

      document.querySelector("#cart__items").innerHTML +=
        `<article class="cart__item" data-Id="${a.id}" data-color="${a.color}">
        <div class="cart__item__img">
        <img src="${a.image}" alt="${a.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${a.name}</h2>
        <p>${a.color}</p>
        <p class="article__price">${b.price} €</p>
        <input type="hidden" value="${a.quantity*b.price}">
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : ${a.quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${a.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </article>`;

      // Fonction: calcul des quantités et des prix.
      function gestionQuantitePrix(a) {

        let fullQuantity = document.getElementById('totalQuantity');

        let productsQuantity = contenu
        .map((a) => parseInt(a.quantity))
        .reduce((a, b) => a + b);

        fullQuantity.innerHTML = productsQuantity;

        let fullPrice = document.getElementById('totalPrice');
        let total = 0;
        document.querySelectorAll('input[type="hidden"]').forEach(el=>total+=+el.value); // Source: https://stackoverflow.com/questions/49330983/how-do-i-do-to-sum-values-in-fields-with-dynamic-id
        fullPrice.innerHTML = total;

      }

      gestionQuantitePrix(a)

      // Affichage de la quantité des articles.
      const articlesQuantites = document.querySelectorAll(".itemQuantity");

      articlesQuantites.forEach(function (quantity, a) {

        // Début de quantity.addEventListener.
        quantity.addEventListener("change", () => {

          if (quantity.value < 0) 
          {
            enleverArticle(a);
          }
          if (quantity.value < 1 || quantity.value > 100 || quantity.value.includes("."))
          {    
            alert("Veuillez choisir un nombre entier entre 1 et 100.");
              location.reload();
          } 
          else 
          {
            let nouveauQuantite = quantity.value;
            
            let afficherNouveauQuantite = document.querySelectorAll(".cart__item__content__settings__quantity p");
              afficherNouveauQuantite[a].textContent = "Qté : " + parseInt(nouveauQuantite);
                contenu[a].quantity = parseInt(quantity.value);
                  localStorage.setItem("panierKanap", JSON.stringify(contenu));
                    location.reload();
          }

        }); 
        // Fin de quantity.addEventListener.

      }); // Fin de articlesQuantites.forEach.

      // Bouton de suppression.
      const boutonRetrait = document.querySelectorAll(".deleteItem");
      boutonRetrait.forEach(function (bouton, a) {
        bouton.addEventListener("click", () => {
          enleverArticle(a);
            location.reload();
        });
      });

      // Fonction: retrait d'article.
      function enleverArticle(a) {
        contenu.splice(a, 1);
          localStorage.setItem("panierKanap", JSON.stringify(contenu));
      }

    });
    //Fin de .then(function(b).

  });
  // Fin de contenu.forEach.

}
// Fin de if.



// Fonction: ajout des regex.
function regexFormulaire() {

  // Ajout des Regex.
    let selectionClasseForm = document.querySelector(".cart__order__form");

  /*
   Création des expressions régulières.
    Sources:
      https://regex101.com
      https://learnbyexample.github.io/javascript-regexp-cheatsheet
  */
  let verificationPrenom = new RegExp("^[a-zA-Z '-]+$");
  let verificationNom = new RegExp("^[a-zA-Z '-]+$");
  let verificationAdresse = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let verificationVille = new RegExp("^[a-zA-Z '-]+$");
  let verificationEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

  // Ecoute de la modification du prénom.
  selectionClasseForm.firstName.addEventListener('change', function() {
    validationFirstName(this);
  });

  // Ecoute de la modification du nom.
  selectionClasseForm.lastName.addEventListener('change', function() {
    validationLastName(this);
  });

  // Ecoute de la modification de l'adresse.
  selectionClasseForm.address.addEventListener('change', function() {
    validationAddress(this);
  });

  // Ecoute de la modification de la ville.
  selectionClasseForm.city.addEventListener('change', function() {
    validationCity(this);
  });

  // Ecoute de la modification de l'e-mail.
  selectionClasseForm.email.addEventListener('change', function() {
    validationEmail(this);
  });

  // Validation du prénom.
  const validationFirstName = function(inputFirstName) {

      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (verificationPrenom.test(inputFirstName.value)) {
        
          firstNameErrorMsg.innerText = '';

      } else {
          firstNameErrorMsg.innerText = "Veuillez écrire un prénom correct.";
      }

  }

  // Validation du nom.
  const validationLastName = function(inputLastName) {

      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (verificationNom.test(inputLastName.value)) {
          lastNameErrorMsg.innerText = '';

      } else {
          lastNameErrorMsg.innerText = "Veuillez écrire un nom correct.";
      }

  }

  // Validation de l'adresse.
  const validationAddress = function(inputAddress) {

      let addressErrorMsg = inputAddress.nextElementSibling;

      if (verificationAdresse.test(inputAddress.value)) {
        addressErrorMsg.innerText = '';

      } else {
        addressErrorMsg.innerText = "Veuillez écrire une adresse correcte.";
      }

  }

  // Validation de la ville.
  const validationCity = function(inputCity) {

      let cityErrorMsg = inputCity.nextElementSibling;

      if (verificationVille.test(inputCity.value)) {
        cityErrorMsg.innerText = '';

      } else {
        cityErrorMsg.innerText = "Veuillez écrire une ville correcte.";
      }

  }

  // Validation de l'email.
  const validationEmail = function(inputEmail) {

      let emailErrorMsg = inputEmail.nextElementSibling;

      if (verificationEmail.test(inputEmail.value)) {
        emailErrorMsg.innerText = '';

      } else {
        emailErrorMsg.innerText = "Veuillez écrire un e-mail correct.";
      }

  }

} 
// Fin de regexFormulaire().



// Fonction: traitement des données utilisateurs.
function traitementDonneesUtilisateurs() {

  // Mise à zéro des champs du formulaire.
  // En cas de rafraichissment de la page l'utilisateur doit renseigner les champs.
  document.getElementById("firstName").value = '';
  document.getElementById("lastName").value = '';     
  document.getElementById("address").value = '';     
  document.getElementById("city").value = '';         
  document.getElementById("email").value = '';

    const achats = document.getElementById('order');

    // Début de order.addEventListener.
    order.addEventListener('click', (event) => {

      event.preventDefault();

      // Ajout des données du formulaire dans un objet.
      const contact = {};
      contact.firstName = document.getElementById("firstName").value;
      contact.lastName = document.getElementById("lastName").value;
      contact.address = document.getElementById("address").value;
      contact.city = document.getElementById("city").value;
      contact.email = document.getElementById("email").value;

      // Vérification finale des données du formulaire.
      if (localStorage.getItem("panierKanap") === null ||

      document.getElementById("firstName").value === '' ||
      document.getElementById("lastName").value === '' ||         
      document.getElementById("address").value === '' ||         
      document.getElementById("city").value === '' ||          
      document.getElementById("email").value === '' ||

      firstNameErrorMsg.innerText != '' ||
      lastNameErrorMsg.innerText != '' || 
      addressErrorMsg.innerText != '' || 
      cityErrorMsg.innerText != '' || 
      emailErrorMsg.innerText != '')

      {

      {

      alert("Erreur avec le panier ou le formulaire");

      }

        return;

      }

      // Tableau des identifiants.
      const products = [];

      contenu.forEach((a) => {
        products.push(a.id);
        //console.log(products);
      });

      // Création d'un objet et ajout du formulaire de contact et des identifiants.
      const objetFormulaireProduits = {
        contact,
        products
      };

      // Envoi des informations avec la méthode POST.
      const options = {
        method: 'POST',
        body: JSON.stringify(objetFormulaireProduits),
        headers: { 
        'Content-Type': 'application/json',
        }
      };

      // Récupération de orderId.
      fetch("http://localhost:3000/api/products/order", options)
      .then(function(res) {
      if (res.ok) {
        return res.json();
        }
      })

      .then(function(a) {
        document.location.href = `confirmation.html?id=${a.orderId}`;
      })

    }); 
    // Fin de order.addEventListener.

} 
// Fin de traitementDonneesUtilisateurs().

  regexFormulaire()
  traitementDonneesUtilisateurs()

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])