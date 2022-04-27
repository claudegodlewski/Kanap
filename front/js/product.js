// https://www.sitepoint.com/get-url-parameters-with-javascript/
// https://waytolearnx.com/2019/10/comment-recuperer-les-parametres-durl-en-javascript.html

// Récupération des informations du service web.
fetch("http://localhost:3000/api/products")

.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})

var str = windows.location.search;
var url = new URL(str);
var identifiantProduit = url.searchParams.get("id");
console.log(identifiantProduit);
