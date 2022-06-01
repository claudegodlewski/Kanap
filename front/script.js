// Récupération des informations concernant les canapés: identifiants, images, noms, descriptions etc.
fetch("http://localhost:3000/api/products")

// Première promesse: vérification du succès de la requête, et récupération des données au format JSON.
.then(function(res) {
  if (res.ok) {
    return res.json();
    }
})

// Seconde promesse: récupération de la valeur dans "produits" et utilisation de la fonction "accueil".
.then(function(produits) {
  accueil(produits);
})

// Affichage de l'erreur dans la console en cas de problèmes.
.catch(function(err) {
  console.log(err.message);
})

// Fonction: affichage des produits sur la page d'accueil.
function accueil(a) {

// DOM: Séléction de l'élément dont la propriété id correspond à "items".
const articleTraitement = document.getElementById("items");

// Boucle: récupération des valeurs des clés de chaque produit ("a" correspond à "produits").
a.forEach((b) => {
  articleTraitement.innerHTML += 
  `<a href="./product.html?_id=${b._id}">
  <article>
  <img src= "${b.imageUrl}" alt="${b.altTxt}">
  <h3 class="productName">${b.name}</h3>
  <p class="productDescription">${b.description}</p>
  </article>
  </a>`;
})

}