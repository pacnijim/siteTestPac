//bouton reduire menu
let reduceNav = document.getElementById("boutonReduce");
let reduceBool = false;
reduceNav.addEventListener("click", function (){
  if (reduceBool === false)
  {
      document.getElementById("headerInner").style.display = "none";
      reduceNav.style.position = "relative";
      reduceNav.style.margin = "auto";
      reduceBool = true;
  }
  else
  {
    document.getElementById("headerInner").style.display = "";
    reduceNav.style.position = "absolute";
    reduceNav.style.top = "0";
    reduceNav.style.left = "3px";
    reduceBool = false;
  }
});
//menu nav
let testpage = document.getElementById("page2");

testpage.addEventListener("onFocus", function (){
  console.log("test");
});

//jauge circulaire
function createJauge(elem)
{
  if (elem)
  {
    // on commence par un clear
    while (elem.firstChild)
      elem.removeChild(elem.firstChild);
  // création des éléments
    let oMask  = document.createElement("div");
    let oBarre = document.createElement("div");
    let oSup50 = document.createElement("div");
    // affectation des classes
    oMask.className  = 'progressHide';
    oBarre.className = 'progressBar';
    oSup50.className = 'progressSup50';
  // construction de l'arbre
    oMask.appendChild(oBarre);
    oMask.appendChild(oSup50);
    elem.appendChild(oMask);
  }
  return (elem);
}

document.addEventListener('DOMContentLoaded', function() {
    let oJauges = document.querySelectorAll('.progressCircle');
    let nb = oJauges.length;
    for(let i = 0; i < nb; i += 1)
      createJauge(oJauges[i]);
});

function initJauge(elem)
{
  let oBarre;
  let angle;
  let valeur;

  createJauge( elem);
  oBarre = elem.querySelector('.progressBar');
  valeur = elem.getAttribute('data-value');
  valeur = valeur ? valeur * 1 : 0;
  elem.setAttribute('data-value', valeur.toFixed(1));
  angle = 360 * valeur / 100;
  if (oBarre)
    oBarre.style.transform = 'rotate(' + angle + 'deg)';
}

// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
  var oJauges = document.querySelectorAll('.progressCircle');
  var i, nb = oJauges.length;
  for (i = 0; i < nb; i += 1) {
    initJauge(oJauges[i]);
  }
});

//formulaire
function displayForm()
{
  contactBtn.style.display = "none";
  document.getElementById("formulaireContact").style.display = "";
}

document.getElementById("formulaireContact").style.display = "none";
let contactBtn = document.getElementById("boutonContact");
let contactSend = document.querySelector("form");

contactBtn.addEventListener("click", displayForm);

contactSend.addEventListener("submit", function (event) {
  event.preventDefault();

  let contact = {
    name: document.getElementById("nameClt").value,
    email: document.getElementById("emailClt").value,
    tel: document.getElementById("phoneClt").value,
    sujet: document.getElementById("objetClt").value,
    msg: document.getElementById("messageClt").value
  };

  console.log(contact.name);
  console.log(contact.email);
  console.log(contact.tel);
  console.log(contact.sujet);
  console.log(contact.msg);
  ajaxPost("http://localhost/javascript-web-srv/post_json.php", contact,
    function (reponse) {
      let divMsg = document.createElement("div");
      let msgEnvoyer = document.createElement("p");

      msgEnvoyer.textContent = "Message envoyé"
      msgEnvoyer.style.color = "blue";
      msgEnvoyer.style.fontSize = 2.5 + "em";

      divMsg.style.backgroundColor = "orange";
      divMsg.style.width = "40%";
      divMsg.style.margin = "auto";

      divMsg.appendChild(msgEnvoyer);
      document.getElementById("page6").insertBefore(divMsg, document.getElementById("formulaireContact"));

      setTimeout(function () {
        divMsg.style.display = "none";
      }, 2000);
      console.log("Le message " + JSON.stringify(contact) + " a été envoyé au serveur");
    },
    true
  );

  //ajaxPost(url, data, callback, isJson);
  contactBtn.style.display = "";
  document.getElementById("formulaireContact").style.display = "none";
});
