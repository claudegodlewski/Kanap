// Gestion de l'ID utilisateur
const idUtilisateur = new URL(location.href).searchParams.get("_id");

fetch(`http://localhost:3000/api/products/${idUtilisateur}`)

// Gestion de la requête et récupération des données (voir fonctions ci-dessous)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(data) {

valeur(data)
images(data)
couleurs(data)

    function valeur (data) {
  // Gestion des valeurs
            let IdDesTitres = document.getElementById("title");
            IdDesTitres.innerText = data.name;
            let IdDesDescriptions = document.getElementById("description");
            IdDesDescriptions.innerText = data.description;
            let IdDesPrix = document.getElementById("price");
            IdDesPrix.innerText = data.price;
    }
  
    function images (data) {
        // Gestion des images
            let classeDesImages = document.getElementsByClassName("item__img")[0];
            let elementImg = document.createElement('img');
            elementImg.alt = data.altTxt;
            elementImg.src = data.imageUrl;
            classeDesImages.appendChild(elementImg);
    }

    function couleurs (data) {
        // Gestion des couleurs
        let valeursDesCouleurs = data.colors;
        for(let i = 0; i < valeursDesCouleurs.length; i++) {
            let IdDesCouleurs = document.getElementById('colors');
            let optionDesCouleurs = document.createElement("option");
            IdDesCouleurs.appendChild(optionDesCouleurs);
            optionDesCouleurs.innerText = (valeursDesCouleurs[i]);
            optionDesCouleurs.value = (valeursDesCouleurs[i]);
        }
    }

    const selectionCouleur = document.getElementById('colors');
    var articlesQuantite = document.getElementById('quantity');
    let boutonActivation = document.getElementById('addToCart');

    boutonActivation.addEventListener('click', () => {

        // console.log (articlesQuantite.data)
        // console.log (articlesQuantite.value)

        if (Number(articlesQuantite.value) < 1 ||
        Number(articlesQuantite.value) > 100 ||
        !selectionCouleur.value ||
        !Number(articlesQuantite.value)
        )
        {
            alert("Veuillez choisir une couleur, et un nombre entre 1 et 100");
        }
    
    let articlesObjet = {};
    articlesObjet.Identifiant = idUtilisateur;
    articlesObjet.Couleur = selectionCouleur.data;
    articlesObjet.Nombre = Number(articlesQuantite.data);

    // Gestion du panier et création d'un tableau 
    let panier = JSON.parse(localStorage.getItem('panier')) || []
        console.log(panier)
    for(let i = 0; i < panier.length; i++) {
        let contenu = panier[i]
       
        if(contenu.color === articlesObjet.color && articlesObjet.Identifiant === contenu.Identifiant) {
            panier[i].Nombre += articlesObjet.Nombre
        }
    }

    // Gestion du panier et import de l'objet dans le tableau
        panier.push(articlesObjet);

    // Gestion du panier, conversion, et envoi vers localStorage
        const conversion = JSON.stringify(panier);
        localStorage.setItem('panier', conversion);

    })

})

.catch(function(err) {
    // Une erreur est survenue 
})
