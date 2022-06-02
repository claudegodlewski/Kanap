// Récupération de l'identifiant de la commande.
const idCommande = new URL(location.href).searchParams.get('id');

console.log(idCommande)

// Affichage du numéro de commande.
let selectionOrderId = document.getElementById("orderId");
selectionOrderId.innerText = idCommande;

// Suppression du panier dans le localStorage.
localStorage.clear();

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])