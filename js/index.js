/*Lien avec l'API */

const getAllProducts = () => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200 &&
          this.status < 400
        ) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        } else {
        }
      };
      request.open("GET", "http://localhost:3000/api/teddies/" + idProduct);
      request.send();
    });
  };
  
  async function produits() {
    const teddies = await getAllProducts();
    
    /* Lien avec la page index HTML */
  
    let listeProduit = document.getElementById("listeProduit");

    
    /* création de la structure index HTML */
  
    teddies.forEach((teddy) => {
      let produitContenant = document.createElement("section");
      let produitIllustration = document.createElement("div");
      let produitElement = document.createElement("div");
      let produitPhoto = document.createElement("img");
      let produitNom = document.createElement("h3");
      let produitPrix = document.createElement("p");
      let produitAction = document.createElement("a");
      
  
      /*Ajout des attributs au balise index HTML */
      produitContenant.setAttribute("class", "produit_contenant");
      produitIllustration.setAttribute("class", "produit_illustration");
      produitPhoto.setAttribute("src", teddy.imageUrl);
      produitPhoto.setAttribute("alt", "Photo de l'ours en peluche");
      produitElement.setAttribute("class", "produit_element");
      produitNom.setAttribute("class", "produit_nom");
      produitPrix.setAttribute("class", "produit_prix");
      produitAction.setAttribute("href", "produit.html?id=" + teddy._id);
  
      /* Agencement des éléments index HTML */
      listeProduit.appendChild(produitContenant);
      produitContenant.appendChild(produitIllustration);
      produitIllustration.appendChild(produitPhoto);
      produitContenant.appendChild(produitElement);
      produitElement.appendChild(produitNom);
      produitElement.appendChild(produitPrix);
      produitElement.appendChild(produitAction);
  
      /* Contenu des balises index HTML */
      produitNom.textContent = teddy.name;
      produitPrix.textContent = "Prix : " + teddy.price / 100 + "€";
      produitAction.textContent = "En savoir plus";
    });
  }
  
  let idProduct = "";
  async function detailTeddies() {
    idProduct = location.search.substring(4);
    const detailTeddies = await getAllProducts();
  
    /* Lien avec la page produit HTML */
  
    let detailProduit = document.getElementById("detailProduit");
  
    /* création de la structure produit HTML */
  
    let detailContenant = document.createElement("section");
    let detailIllustration = document.createElement("div");
    let detailElement = document.createElement("div");
    let detailPhoto = document.createElement("img");
    let detailNom = document.createElement("h3");
    let detailDescription = document.createElement("p");
    let detailInformationPrix = document.createElement("div");
    let detailPrix = document.createElement("p");
    let detailOption = document.getElementById("detailOption");
    let detailAction = document.getElementById("ajout_panier");
  
    /*Ajout des attributs au balise produit HTML */
    detailContenant.setAttribute("class", "detail_contenant");
    detailIllustration.setAttribute("class", "detail_illustration");
    detailPhoto.setAttribute("src", detailTeddies.imageUrl);
    detailPhoto.setAttribute("alt", "Photo de " + detailTeddies.name);
    detailElement.setAttribute("class", "detail_element");
    detailNom.setAttribute("class", "detail_nom");
    detailDescription.setAttribute("class", "detail_description");
    detailInformationPrix.setAttribute("class", "detail_information_prix");
    detailPrix.setAttribute("class", "detail_prix");
  
    /* Agencement des éléments produit HTML */
    detailProduit.appendChild(detailContenant);
    detailContenant.appendChild(detailIllustration);
    detailIllustration.appendChild(detailPhoto);
    detailContenant.appendChild(detailElement);
    detailElement.appendChild(detailNom);
    detailElement.appendChild(detailDescription);
    detailContenant.appendChild(detailInformationPrix);
    detailInformationPrix.appendChild(detailPrix);
    detailInformationPrix.appendChild(detailOption);
    detailInformationPrix.appendChild(detailAction);
  
    /* Contenu des balises produit HTML */
    detailNom.textContent = detailTeddies.name;
    detailDescription.textContent = detailTeddies.description;
    detailPrix.textContent = detailTeddies.price / 100 + " €";
  
    detailTeddies.colors.forEach((teddy) => {
      let choixOption = document.createElement("option");
      document
        .getElementById("choix_option")
        .appendChild(choixOption).innerHTML = teddy;
    });
  }

 