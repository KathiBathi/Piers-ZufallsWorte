'use strict';

let adjektivArray = [
    "königlich", "unheimlich", "weihnachtlich", 
    "sportlich", "urzeitlich", "futuristisch",
    "böse", "hungrig",
    "verliebt", "verzaubert",
    "kriegerisch", "musikalisch"
    ]

let nomenArray = [
    "Schneemann", "Pizza",
    "Schildkröte", "Haus",
    "Flugzeug", "Affe", "Hexe",
    "Biene","Mahlzeit", "Pflanze", "Mammut",
    "Ente"
]


// Hilfsfunktion
const random = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

////////////////////////////////////////
// Liest JSON Datei ///////////////////
// Gibt 2x zufällig Nom + Adj aus//////

let localStorArrayAdj = [];
let localStorArrayNomen = [];

let ulAdjektivListe = document.querySelector('.adjektivListe');
let ulNomenListe = document.querySelector('.nomenListe');


function setDefaultToLocaleStorage()
{   localStorage.setItem('adjektiv', adjektivArray);
    localStorage.setItem('nomen', nomenArray);
    }


// Checkt ob im Local Storage die Listen
// vorhanden sind, gibt Arrays an die
// init weiter
function checkLocalStorage(){ 
if (localStorage.getItem('adjektiv') && localStorage.getItem('nomen')) 
    {  
    localStorArrayAdj = [];
    let localStorAdj = localStorage.getItem('adjektiv');
    localStorArrayAdj.push(...localStorAdj.split(','));

    localStorArrayNomen = []
    let localStorNom = localStorage.getItem('nomen');
    localStorArrayNomen.push(...localStorNom.split(','));

    init(localStorArrayAdj, localStorArrayNomen);
}
else 
    {   setDefaultToLocaleStorage();
        init(adjektivArray, nomenArray); } 
}

// Empfängt Arrays
// Gibt einzelne Worte aus
function init(adjA, nomenA){     
    let randomNumbAdj = random(0, (adjA.length -1));
    let randomNumbNom = random(0, (nomenA.length -1));

    let randomAdj = adjA[randomNumbAdj];
    let randomNom =  nomenA[randomNumbNom];
 
    //übergibt ans HTML
    createWords(
        {adj:randomAdj, 
        nomen:randomNom}
        );
    }


//Einfügen ins HTML ///////////////////
//Nimmt 2x Strings, gibt innerHTML raus
let wordWrap = document.querySelector('.words')

function createWords({ 
    adj = "winzig",
    nomen = "Biene"}){
wordWrap.innerHTML = 
`<span>${adj}</span> + <span>${nomen}</span>`;
}


// Knopf zum Erstellen ///////////////////
let randomBtn = document.querySelector('.randomBtn');
randomBtn.addEventListener('click', e => {checkLocalStorage()}
);


////////////////////////////////////////
///// Absenden von neuem Input//////////
////////////////////////////////////////

let inputAdj = document.querySelector('.inputAdj');
let inputNom = document.querySelector('.inputNom');

let sendAdjBtn = document.querySelector('.sendAdj')
let sendNomBtn = document.querySelector('.sendNom')


// Function zum Anfügen von Worten an die Liste im
// LocalStorage

sendAdjBtn.addEventListener('click', function()
{    makeItem('adjektiv', inputAdj,  adjektivArray);
    clearList();
    createMenuLists('li', ulAdjektivListe);
})

inputAdj.addEventListener("keyup", function(event) {
    console.log(event);
    if (event.keyCode === 13) {
    
    makeItem('adjektiv', inputAdj,  adjektivArray);
    clearList();
    createMenuLists('li', ulAdjektivListe);
    }
})


sendNomBtn.addEventListener('click', function(){
    makeItem('nomen', inputNom, nomenArray);
    clearList();
    createMenuLists('li', ulNomenListe);
})

inputNom.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    makeItem('nomen', inputNom, nomenArray);
    clearList();
    createMenuLists('li', ulNomenListe);;
    }
})




function makeItem (key, inputName, defaultArray){
if (!(inputName.value == 0)) { 
    
//Wenn es keine keys gibt, setze den jeweiligen key
    while (!(localStorage.getItem(key))){ 
    localStorage.setItem(key, defaultArray);}

//und dann packe die Änderungen dazu
    let tempArray = [];
    let localStor = localStorage.getItem(key);
    tempArray.push(...localStor.split(','))
    tempArray.push(inputName.value);

    localStorage.setItem(key, tempArray);
    inputName.value = "";

    checkLocalStorage();
    }
else return
}

////////////////////////////////////////////////////////
//////////// Auf Standard zurücksetzten ////////////////
////////////////////////////////////////////////////////
let defaultBtn = document.querySelector('.newSessionWrap button')

defaultBtn.addEventListener('click', function(){ 

removeStoredLists();
clearList();
createMenuLists('li', ulAdjektivListe);
});

function removeStoredLists(){ 

localStorage.removeItem('adjektiv');
localStorage.removeItem('nomen');

console.log('localStorage gelöscht')
}

/////////// Modal Fenster JS

// Get the modal
let modal = document.querySelector("#myModal");
let menuBtn = document.querySelector(".menuBtn");

// Get the <span> element that closes the modal
var closeBtnModal = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
menuBtn.addEventListener('click', function(){
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
closeBtnModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }};


////////////////////////////////////////////////
////////// Factory für Listenelemente /////////
///////////////////////////////////////////////

let warnungLocStor = document.querySelector('.warnung');

function createMenuLists(element, parentElem){ 

let locStorAdj = localStorage.getItem('adjektiv');
let locStorNom = localStorage.getItem('nomen');

if (!(locStorAdj && locStorNom)){ 
    setDefaultToLocaleStorage();
    warnungLocStor.innerHTML = "";
    }

    let localStorArrayAdj = [];
    let anArrayAdj = localStorage.getItem('adjektiv');
    localStorArrayAdj.push(...anArrayAdj.split(','));
 
    let localStorArrayNom = [];
    let anArrayNom = localStorage.getItem('nomen');
    localStorArrayNom.push(...anArrayNom.split(','));
 
    singleItems('li', localStorArrayAdj, ulAdjektivListe);
    singleItems('li', localStorArrayNom, ulNomenListe);

//mache Einzelnes ELement, gibt weiter an create Element
function singleItems(element, anArray, parentElem){
for (let i = 0; i < anArray.length; i++){
    createElement(element, anArray[i], parentElem);
    }
}

function createElement(element, content, parentElem){  
//Wrapper-Element
    let liWrap = document.createElement('li');
    liWrap.classList.add('zeile');
    parentElem.appendChild(liWrap);

    let closeBtn = document.createElement('span');
    closeBtn.textContent = '× ';
    closeBtn.classList.add('deleteSpan');
    liWrap.appendChild(closeBtn);

    let neu = document.createElement(element);
    neu.textContent = `${content}`;
    neu.classList.add('inlineLi');
    liWrap.appendChild(neu);

} //Ende createElement
} //Ende factory


// beim ersten Mal nimmt er immer weg    
function clearList(){ 
        document.querySelector('.adjektivListe').innerHTML = "";
        document.querySelector('.nomenListe').innerHTML = "";
    }


//closeBtn - entfernt Element aus Array und damit aus Liste
// let closeBtnList = document.querySelector('.zeile');
let closeBtnListAdj = document.querySelector('.adjektivListe');
let closeBtnListNomen = document.querySelector('.nomenListe');

closeBtnListAdj.addEventListener('click', function(){removeMenuItems(event,'adjektiv')});

closeBtnListNomen.addEventListener('click', function(){removeMenuItems(event,'nomen')});


//Entferne Item - 
function removeMenuItems(event, welcheListe){
    if (event.target.classList.contains('deleteSpan')){
//Entfernt Node-Elemente
    clearList();

    // let textElement = event.target.parentNode.querySelector('li').textContent;   
    let textElement = event.target.parentNode.querySelector('.inlineLi').textContent;       

        //muss aus der Liste gelöscht werden....
        if (welcheListe === 'adjektiv') 
        {   
            //Lese die Liste und packe sie in die init-Function
            let localArrayAdj = [];
            let localStorAdj = localStorage.getItem('adjektiv');
            localArrayAdj.push(...localStorAdj.split(','));
        
            //findet den Indexwert des Angeklickten Elements, schneidet den Indexwert weg
            let index = localArrayAdj.indexOf(textElement);
            localArrayAdj.splice(index, 1);

            //Welches Array, welches Element, welcher Parent?
            localStorage.setItem('adjektiv', localArrayAdj);
            createMenuLists('li', ulAdjektivListe);          
        }
            
         else if (welcheListe === 'nomen'){

                let localArrayNomen = [];
                let localStorNomen = localStorage.getItem('nomen');
                localArrayNomen.push(...localStorNomen.split(','));
            
  //findet den Indexwert des Angeklickten Elements, schneidet den Indexwert weg
                let index = localArrayNomen.indexOf(textElement);
                localArrayNomen.splice(index, 1);

                //muss auch das Array selber Verändern
                localStorage.setItem('nomen',  localArrayNomen); 
                createMenuLists('li', ulNomenListe);
            }  
        }  
}


//Initialisierung der Anfangslisten im Menü
createMenuLists();

//Initialisieren von Anfangswert
checkLocalStorage();