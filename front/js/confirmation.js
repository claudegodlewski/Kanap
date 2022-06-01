// Récupération de l'identifiant de la commande.
const idCommande = new URL(location.href).searchParams.get('id');

console.log(idCommande)

// Affichage du numéro de commande.
let selectionOrderId = document.getElementById("orderId");
selectionOrderId.innerText = idCommande;

// Suppression du panier dans le localStorage.
localStorage.clear();