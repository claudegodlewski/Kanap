// Récupération des informations du service web.
fetch("http://localhost:3000/api/products")

// Récupération au format JSON et vérification du succès de la requête.
.then(function(res) {
  if (res.ok) {
    return res.json();
    }
})

// Récupération de la valeur dans "produits" et utilisation de la fonction "accueil".
.then(function(produits) {
  console.log(produits);
    accueil(produits);
})

// Gestion des erreurs.
.catch(function(err) {
  console.log(err)
})

// Fonction: affichage des produits sur la page d'accueil.
function accueil(a) {

// DOM: Séléction de l'élément ayant l'ID "items".
const articleTraitement = document.getElementById("items");

/* Boucle: récupération de _id, imageUrl, altTxt, name, et description pour chaque produit.
Ajout dans la page d'accueil des éléments avec innerHTML.
*/

for (let article of a) {
    articleTraitement.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src= "${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
  
}