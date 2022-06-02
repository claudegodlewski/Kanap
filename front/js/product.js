/* Récupération de l'identifiant du client dans l'URL (cela correspond à un choix de produit).
    Sources:
      https://waytolearnx.com/2019/10/comment-recuperer-les-parametres-durl-en-javascript.html
      https://www.tabnine.com/code/javascript/functions/url/URL/searchParams
*/
const idUtilisateur = new URL(location.href).searchParams.get('_id');

// Récupération des informations concernant le choix du client.
fetch(`http://localhost:3000/api/products/${idUtilisateur}`)

// Vérification du succès de la requête, et récupération des données au format JSON.
.then(function(res) {
  if (res.ok) {
    return res.json();
    }
})

// Récupération des données dans la valeur "produits".
.then(function(produits) {

// DOM: Séléction des éléments (description, price, title, etc.) et modification du code HTML avec la valeur "produits".
  document.querySelector('.item__img').innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
  document.getElementById('title').innerText = produits.name;
  document.getElementById('price').innerText = produits.price;
  document.getElementById('description').innerText = produits.description;

    produits.colors.forEach((a) => {

      let optionsCouleurs = document.createElement("option");
      optionsCouleurs.innerText = `${a}`;
      optionsCouleurs.value = `${a}`;

      let idColors = document.getElementById('colors');
      idColors.appendChild(optionsCouleurs);
    
    });

  // Fonction: stockage du panier.
  function stockagePanierLocalStorage(a) {
    localStorage.setItem("panierKanap", JSON.stringify(a));
  }

  // Fonction: récupération du panier depuis localStorage.
  function recuperationLocalStorage() {
    return localStorage.getItem("panierKanap");
  }

  // Fonction: anti-doublons pour le panier.
  function antiDoublons(a) { 
    const objetATester = JSON.parse(recuperationLocalStorage());
      let verifierIndex = objetATester.findIndex((b) => b.color == a.color && b.id == a.id);
      //console.log(verifierIndex); // Sans doublons donne -1 et avec doublons donne 0.
      return verifierIndex;
  }

  // Fonction: création d'un article.
  function creerArticle() {

    const quantity = document.getElementById('quantity');
    const color = document.getElementById('colors');

    if (color.value == "" || quantity.value < 1 || quantity.value > 100 || quantity.value.includes(".")) {

      {
          alert("Choisissez une couleur et un nombre entier entre 1 et 100.");
      }

    } else {

    // Création d'un objet sans stockage de prix (sécurité).
    let article = {
      id: `${idUtilisateur}`,
      name: `${produits.name}`,
      color: `${color.value}`,
      quantity: `${quantity.value}`,
      //totalPrice: String(`${quantity.value}` * `${produits.price}`),
      //price: `${produits.price}`,
      image: `${produits.imageUrl}`,
      altTxt: `${produits.altTxt}`,
    };

    // Récupération de ce qui est contenu dans le localStorage.
    const contenu = recuperationLocalStorage();

    if (!contenu) {

      // Création d'un tableau.
      let tableauPourObjet = [];

      // Ajout de l'objet article dans le tableau.
      tableauPourObjet.push(article);

      // Ajout du tableau contenant l'objet dans le localStorage.
      stockagePanierLocalStorage(tableauPourObjet);

    } else {

      // Conversion de l'objet JSON au format JavaScript.
      tableauPourObjet = JSON.parse(contenu);

      const articlesIdentiques = antiDoublons(article);

      if (articlesIdentiques >= 0) { // Rappel pour articlesIdentiques (sans doublons donne -1 et avec doublons donne 0).

        tableauPourObjet[articlesIdentiques].quantity = parseFloat(tableauPourObjet[articlesIdentiques].quantity) + parseFloat(article.quantity);

      } else {

        tableauPourObjet.push(article);

      }

        stockagePanierLocalStorage(tableauPourObjet);

      {
          alert("Produit(s) ajouté(s).");
      }

    } 
        
    }

  } // Fin de creerArticle().

  /* Evènement sur le bouton.
      Sources:
        https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5578156-ecoutez-des-evenements
        https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5578181-recuperez-des-donnees-utilisateurs-avec-les-evenements
  */
  const bouton = document.getElementById('addToCart');
  bouton.addEventListener("click", creerArticle);

})
// Fin de .then(function(produits)

// Affichage de l'erreur dans la console en cas de problèmes.
.catch(function(err) {
  console.log(err.message);
})

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])