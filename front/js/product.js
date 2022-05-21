// Récupération de l'identifiant
const idUtilisateur = new URL(location.href).searchParams.get('_id');



// Récupération des informations au format JSON
fetch(`http://localhost:3000/api/products/${idUtilisateur}`)

  .then((res) => {
    return res.json();
  })

  .then((maValeur) => {

    // Ajout des informations dans le code HTML
    document.querySelector('.item__img').innerHTML = `<img src="${maValeur.imageUrl}" alt="${maValeur.altTxt}">`;
    document.getElementById('title').innerText = maValeur.name;
    document.getElementById('price').innerText = maValeur.price;
    document.getElementById('description').innerText = maValeur.description;

    maValeur.colors.forEach((a) => {

      let optionsCouleurs = document.createElement("option");
      optionsCouleurs.innerText = `${a}`;
      optionsCouleurs.value = `${a}`;

      let idColors = document.getElementById('colors');
      idColors.appendChild(optionsCouleurs);
    
    });



// Fonction: stockage du panier
function stockagePanierLocalStorage(a) {
  localStorage.setItem("panier", JSON.stringify(a));
}



// Fonction: récupération du panier depuis localStorage
function recuperationLocalStorage() {
  return localStorage.getItem("panier");
}



// Fonction: anti-doublons pour le panier
// source pour findIndex: (https://www.w3schools.com/jsref/jsref_findindex.asp)
function antiDoublons(a) {
  const tableauPourObjet = JSON.parse(recuperationLocalStorage());
    let verifierIndex = tableauPourObjet.findIndex((test) => test.color == a.color && test.id == a.id);
      return verifierIndex;
}



// Fonction: création d'un article
function creerArticle() {

  const quantity = document.getElementById('quantity');

  const color = document.getElementById('colors');

  if (color.value == "" || quantity.value < 1 || quantity.value > 100 || quantity.value.includes(".")) {

    {
        alert("Choisissez une couleur et un nombre entier entre 1 et 100.");
    }

  } else {

// Création d'un objet
let article = {
  id: `${idUtilisateur}`,
  name: `${maValeur.name}`,
  color: `${color.value}`,
  quantity: `${quantity.value}`,
  totalPrice: String(`${quantity.value}` * `${maValeur.price}`),
  price: `${maValeur.price}`,
  image: `${maValeur.imageUrl}`,
  altTxt: `${maValeur.altTxt}`,
};

// Récupération de ce qui est contenu dans le localStorage
const contenu = recuperationLocalStorage();

if (!contenu) {

  // Création d'un tableau
  let tableauPourObjet = [];

  // Ajout de l'objet article dans le tableau
  tableauPourObjet.push(article);

  // Ajout du tableau contenant l'objet dans le localStorage
  stockagePanierLocalStorage(tableauPourObjet);

} else {

  // Conversion de l'objet JSON au format JavaScript
  tableauPourObjet = JSON.parse(contenu);

  const articlesIdentiques = antiDoublons(article);

  if (articlesIdentiques >= 0) {

    tableauPourObjet[articlesIdentiques].quantity = String(parseFloat(tableauPourObjet[articlesIdentiques].quantity) + parseFloat(article.quantity));

    tableauPourObjet[articlesIdentiques].totalPrice = String(parseFloat(tableauPourObjet[articlesIdentiques].totalPrice) + parseFloat(article.price));

  } else {

    tableauPourObjet.push(article);

  }

    stockagePanierLocalStorage(tableauPourObjet);

} 
    
}

} // Fin de creerArticle()



  //Evènement sur le bouton
  const bouton = document.getElementById('addToCart');

  bouton.addEventListener("click", creerArticle);

}) // Fin de .then((maValeur)



.catch(function(err) {
// Une erreur est survenue 
})