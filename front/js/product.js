// Gestion de l'ID utilisateur
var idUtilisateur = new URL(location.href).searchParams.get("_id")
fetch(`http://localhost:3000/api/products/${idUtilisateur}`)

// Gestion de la requête et récupération des données (voir fonctions ci-dessous)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(data) {
    images(data);
    valeurs(data);
    couleurs(data);

        // Gestion des images
        function images(index) {
            var classeDesImages = document.getElementsByClassName("item__img")[0]
            var elementImg = document.createElement('img')
            elementImg.alt = data.altTxt
            elementImg.src = data.imageUrl
            classeDesImages.appendChild(elementImg)
        }

        // Gestion des valeurs
        function valeurs(index) {
            var IdDesTitres = document.getElementById("title")
            IdDesTitres.innerText = data.name
            var IdDesDescriptions = document.getElementById("description")
            IdDesDescriptions.innerText = data.description
            var IdDesPrix = document.getElementById("price")
            IdDesPrix.innerText = data.price
        }

        // Gestion des couleurs
        function couleurs(index) {
        let valeursDesCouleurs = data.colors
        for(let i = 0; i < valeursDesCouleurs.length; i++) {
            let IdDesCouleurs = document.getElementById('colors')
            let optionDesCouleurs = document.createElement("option")
            IdDesCouleurs.appendChild(optionDesCouleurs) 
            optionDesCouleurs.innerText = (valeursDesCouleurs[i])
            optionDesCouleurs.data = (valeursDesCouleurs[i])
            const selectionCouleur = document.getElementById('colors')  
        }
    }

        // Gestion du nombre d'articles choisis
        function articles(index) {
        const quantiteArticles = document.getElementById('quantity')
        }

})

.catch(function(err) {
    // Une erreur est survenue 
})
