//---------------------------FORMULAIRE----------------//

//vérifie les inputs du formulaire
const checkInput = () => {
    //Controle Regex
    let checkNumber = /[0-9]/;
    let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;
  
    //message fin de controle
    let checkMessage = "";
  
    //Récupération des inputs
  
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;
  
    //tests des différents input du formulaire
    //Test du nom
    if (
      checkNumber.test(nom) == true ||
      checkSpecialCharacter.test(nom) == true ||
      nom == ""
    ) {
      checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
    } else {
      console.log("Nom accepté");
    }
    //Test du prénom
    if (
      checkNumber.test(prenom) == true ||
      checkSpecialCharacter.test(prenom) == true ||
      prenom == ""
    ) {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
    } else {
      console.log("Prénom accepté");
    }
    //Test du mail
    if (checkMail.test(email) == false) {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email. Les caractères spéciaux ne sont pas autorisés";
    } else {
      console.log("Adresse mail acceptée");
    }
    //Test de l'adresse
    if (checkSpecialCharacter.test(adresse) == true || adresse == "") {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse postale. Les caractères spéciaux ne sont pas autorisés";
    } else {
      console.log(" Adresse postale acceptée");
    }
    //Test de la ville
    if (
      (checkSpecialCharacter.test(ville) == true ||
        checkNumber.test(ville) == true) ||
      ville == ""
    ) {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
    } else {
      console.log("Ville acceptée");
    }
    //Si un des champs n'est pas conforme => message d'alert avec la raison
    if (checkMessage != "") {
      alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
    }
    //Si le formulaire est validé => construction de l'objet contact
    else {
      contact = {
        lastName: nom,
        firstName: prenom,
        address: adresse,
        city: ville,
        email: email,
      };
      return contact;
    }
  };
  
  //Vérification du panier
  const checkPanier = () => {
    //Vérifier qu'il y ai au moins un produit dans le panier
    let etatPanier = JSON.parse(localStorage.getItem("panier"));
    //Si le panier est vide ou null
    if  (etatPanier.length < 1 || etatPanier == null) {
      alert("Votre panier est vide");
      return false;
    } else {
      console.log("Le panier n'est pas vide");
      return true;
    }
  };
  
  /*Envoi à l'API */
  //Tableau et objet demandé par l'API pour la commande
  let contact;
  let products = [];
  let url = "http://localhost:3000/api/teddies/order";
  
  const envoiFormulaire = (sendForm, url) => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
          sessionStorage.setItem("order", this.responseText);
          window.location = "./confirmation.html";
          resolve(JSON.parse(this.responseText));
          console.log(sendForm);
        } else {
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(sendForm);
      console.log(sendForm);
    });
  };
  
  const confirmCommande = () => {
    let commander = document.getElementById("form_1");
    commander.addEventListener("submit", (event) => {
      event.preventDefault()
      //Si le panier n'est pas vide et que le formulaire est valide => Construction du tableau products envoyé à l'API
      if (checkPanier() == true && checkInput() != null) {
        console.log("L'envoi peut etre fait");
        panier.forEach((article) => {
          products.push(article._id);
        });
        console.log("Ce tableau sera envoyé à l'API : " + products);
  
        //Création de l'objet à envoyer
        let commande = {
          contact,
          products,
        };
  
        let sendForm = JSON.stringify(commande);
        envoiFormulaire(sendForm, url);
        console.log(commande);
  
        //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
        contact = {};
        products = [];
        localStorage.clear();
      } else {
        console.log("ERROR");
      }
    });
  };
  
  //Récupération des informations pour affichage sur la page de confirmation
  const retourOrder = () => {
    if (sessionStorage.getItem("order") != null) {
      let order = JSON.parse(sessionStorage.getItem("order"));
      document.getElementById("firstName").innerHTML = order.contact.firstName;
      document.getElementById("orderId").innerHTML = order.orderId;
      console.log(order);
      sessionStorage.removeItem("order");
    }
    //Redirection vers l'accueil
    else {
      alert("Merci pour vote commande. A bientôt");
      window.location = "./index.html";
    }
  };