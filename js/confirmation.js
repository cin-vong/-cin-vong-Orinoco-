//------Tableau de recap de la commande dans la page de confirmation------//

const confirmRecap = () => {
    //Création de la structure du tableau récapitulatif
    let recapConfirm = document.createElement("table");
    let ligneConfirm = document.createElement("tr");
    let confirmPhoto = document.createElement("th");
    let confirmNom = document.createElement("th");
    let confirmPrixUnitaire = document.createElement("th");
    let ligneConfirmTotal = document.createElement("tr");
    let colonneConfirmTotal = document.createElement("th");
    let confirmPrixPaye = document.createElement("td");
  
    //Placement de la structure dans la page
    let confirmPanier = document.getElementById("confirmation-recap");
    confirmPanier.appendChild(recapConfirm);
    recapConfirm.appendChild(ligneConfirm);
    ligneConfirm.appendChild(confirmPhoto);
    ligneConfirm.appendChild(confirmNom);
    ligneConfirm.appendChild(confirmPrixUnitaire);
  
    //contenu des entetes
    confirmPhoto.textContent = "Article";
    confirmNom.textContent = "Nom";
    confirmPrixUnitaire.textContent = "Prix";
  
    //Incrémentation de l'id des lignes pour chaque produit
    let i = 0;
    let order = JSON.parse(sessionStorage.getItem("order"));
  
    order.products.forEach((orderArticle) => {
      //Création de la ligne
      let ligneConfirmArticle = document.createElement("tr");
      let photoConfirmArticle = document.createElement("img");
      let nomConfirmArticle = document.createElement("td");
      let prixUnitConfirmArticle = document.createElement("td");
  
      //Attribution des class pour le css
      ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
      photoConfirmArticle.setAttribute("class", "photo_article_acheté");
      photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
      photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");
  
      //Insertion dans le HTML
      recapConfirm.appendChild(ligneConfirmArticle);
      ligneConfirmArticle.appendChild(photoConfirmArticle);
      ligneConfirmArticle.appendChild(nomConfirmArticle);
      ligneConfirmArticle.appendChild(prixUnitConfirmArticle);
  
      //Contenu des lignes
  
      nomConfirmArticle.textContent = orderArticle.name;
      prixUnitConfirmArticle.textContent = orderArticle.price / 100 + " €";
    });
  
    //Dernière ligne du tableau : Total
    recapConfirm.appendChild(ligneConfirmTotal);
    ligneConfirmTotal.appendChild(colonneConfirmTotal);
    ligneConfirmTotal.setAttribute("id", "ligneSomme");
    colonneConfirmTotal.textContent = "Total payé";
    ligneConfirmTotal.appendChild(confirmPrixPaye);
  
    confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");
    confirmPrixPaye.setAttribute("colspan", "4");
    colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
    colonneConfirmTotal.setAttribute("colspan", "2");
  
    //Calcule de l'addition total
    let sommeConfirmTotal = 0;
    order.products.forEach((orderArticle) => {
      sommeConfirmTotal += orderArticle.price / 100;
    });
  
    //Affichage du prix total à payer dans l'addition
    console.log(sommeConfirmTotal);
    document.getElementById("sommeConfirmTotal").textContent =
      sommeConfirmTotal + " €";
  };
  