// Gestion de l'ID utilisateur
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

    maValeur.colors.forEach((color) => {
      let optionsCouleurs = document.createElement("option");
      optionsCouleurs.innerText = `${color}`;
      optionsCouleurs.value = `${color}`;

      let idColors = document.getElementById('colors');
      idColors.appendChild(optionsCouleurs);
    
    });

// Fonction: récupération du panier du localStorage
    function panierLocalStorage() {
      return localStorage.getItem("panier");
    }

 // Fonction: anti-doublons pour le panier
 // source pour findIndex: (https://www.w3schools.com/jsref/jsref_findindex.asp)
    function antiDoublons(article) {
      const tableauPourObjet = JSON.parse(panierLocalStorage());
      let verifierIndex = tableauPourObjet.findIndex((object) => object.id == article.id && object.color == article.color);
      return verifierIndex;
    }

// Fonction: stockage du panier
    function stockageObjet(tableauPourObjet) {
      localStorage.setItem("panier", JSON.stringify(tableauPourObjet));
    }

// Fonction: ajout d'un article dans le panier
    function ajoutArticle(article) {
      const contenu = panierLocalStorage();

      if (!contenu) {
        let tableauPourObjet = [];
        tableauPourObjet.push(article);
        stockageObjet(tableauPourObjet);
      } else {
        tableauPourObjet = JSON.parse(contenu);
        const articlesIdentiques = antiDoublons(article);

        if (articlesIdentiques >= 0) {
          tableauPourObjet[articlesIdentiques].quantity = String(
            parseFloat(tableauPourObjet[articlesIdentiques].quantity) +
              parseFloat(article.quantity)
          );
          tableauPourObjet[articlesIdentiques].totalPrice = String(
            parseFloat(tableauPourObjet[articlesIdentiques].totalPrice) +
              parseFloat(article.price)
          );
        } else {
          tableauPourObjet.push(article);
        }
        stockageObjet(tableauPourObjet);
      }
    }

// Fonction: création d'un article
    function creerArticle() {
      const quantity = document.getElementById('quantity');
      const color = document.getElementById('colors');

      if (color.value == "" || quantity.value < 1 || quantity.value > 100) {
        {
            alert("Choisissez une couleur et un nombre entre 1 et 100.");
        }
      } else {
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
        ajoutArticle(article);
      }
    }

//Event Listener sur le bouton
    const bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", creerArticle);
  })

  .catch(function(err) {
// Une erreur est survenue 
})