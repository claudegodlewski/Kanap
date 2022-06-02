/* Récupération des informations concernant les canapés.
    Sources:
      https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
      https://javascript.info/promise-chaining
*/
fetch("http://localhost:3000/api/products")

// Vérification du succès de la requête, et récupération des données au format JSON.
.then(function(res) {
  if (res.ok) {
    return res.json();
    }
})

// Récupération des données dans la valeur "produits".
.then(function(produits) {
  accueil(produits);
})

// Affichage de l'erreur dans la console en cas de problèmes.
.catch(function(err) {
  console.log(err.message);
})

/* Fonction: affichage des produits sur la page d'accueil.
    Source:
      https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279223-travaillez-sur-les-fonctions
*/
function accueil(a) {

/* DOM: Séléction de l'élément dont la propriété id correspond à "items".
    Source:
      https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577476-accedez-aux-elements-du-dom
*/
const articleTraitement = document.getElementById("items");

/* Boucle: récupération des valeurs des clés de chaque produit ("a" correspond à "produits").
    Source:
      https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
a.forEach((a) => {
  articleTraitement.innerHTML += 
  `<a href="./product.html?_id=${a._id}">
  <article>
  <img src= "${a.imageUrl}" alt="${a.altTxt}">
  <h3 class="productName">${a.name}</h3>
  <p class="productDescription">${a.description}</p>
  </article>
  </a>`;
})

}

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])