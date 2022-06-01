// Récupération de l'identifiant du client dans l'URL: cela correspond au choix de canapé(s) de l'utilisateur.
const idUtilisateur = new URL(location.href).searchParams.get('_id');

// Récupération des informations concernant le choix du client: obtention des détails concernant le produit choisi.
fetch(`http://localhost:3000/api/products/${idUtilisateur}`)

// Première promesse: récupération des détails de l'article choisi par le client.
.then((res) => {
  return res.json();
})

// Seconde promesse: récupération de la valeur dans "produit" et ajout des informations dans le code HTML.
.then((produit) => {

  document.querySelector('.item__img').innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  document.getElementById('title').innerText = produit.name;
  document.getElementById('price').innerText = produit.price;
  document.getElementById('description').innerText = produit.description;

    produit.colors.forEach((a) => {

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

    // Création d'un objet sans stockage de prix (sécurité)
    let article = {
      id: `${idUtilisateur}`,
      name: `${produit.name}`,
      color: `${color.value}`,
      quantity: `${quantity.value}`,
      //totalPrice: String(`${quantity.value}` * `${produit.price}`),
      //price: `${produit.price}`,
      image: `${produit.imageUrl}`,
      altTxt: `${produit.altTxt}`,
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
      //console.log(articlesIdentiques);

      if (articlesIdentiques >= 0) { // Rappel pour articlesIdentiques (sans doublons donne -1 et avec doublons donne 0).

        tableauPourObjet[articlesIdentiques].quantity = parseFloat(tableauPourObjet[articlesIdentiques].quantity) + parseFloat(article.quantity); // Ajout des quantités objets localStorage + objets JS 

        //console.log(tableauPourObjet[articlesIdentiques].quantity);

        //tableauPourObjet[articlesIdentiques].totalPrice = parseFloat(tableauPourObjet[articlesIdentiques].totalPrice) + parseFloat(article.price);

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



  //Evènement sur le bouton
  const bouton = document.getElementById('addToCart');
  bouton.addEventListener("click", creerArticle);

}) // Fin de .then((produit)

// Affichage de l'erreur dans la console en cas de problèmes.
.catch(function(err) {
  console.log(err.message);
})