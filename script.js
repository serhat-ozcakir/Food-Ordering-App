// Our Menu
const menu = [
    {
        "name": "Pizza Krabben",
        "price": 9.50,
        "description": "mit Krabben und Pepperoni",
        "url": "./img/fullsizerender-4-1.webp",
    },
    {
        "name": "Vegatarische Lasagne",
        "price": 10.50,
        "description": "Herzhafte Lasagne mit Schichten aus Gemüse, Tomatensalata",
        "url": "./img/Vegetarische Lasagna.jpg",

    },
    {
        "name": "Spagetti Carbonara",
        "price": 12.99,
        "description": "Cremige Pasta mit Speck und Parmasan",
        "url": "./img/spaghetti-carbonara.jpg",
    },
    {
        "name": "Thai Curry mit Garnelen",
        "price": 13.75,
        "description": "Ein scharfes und aromatisches mit Kokosmilch",
        "url": "./img/Thai Curry mit Garnelen.jpg",
    },
        {
        "name": "Döner",
        "price": 9,
        "description": "Saftiges Fleisch im Fladenbrot mit Soße",
        "url": "./img/döner.jpg",
    }
]
// The empty array in the order list is where the orders go.
const order = [];

//Captures the divs in index.html
let row = document.getElementById("row");
let col = document.getElementById("col");
let orderKorb = document.getElementById("orderKorb");

// rendered the menu lists and displayed them
function renderMenu() {
    for (let i = 0; i < menu.length; i++) {
        const element = menu[i];
        console.log(element);
        col.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-header d-flex justify-content-between">
                            <h5 class="">${element.name}</h5>
                            <button onclick="addOrder(${i})" ><i class="bi bi-plus-lg"></i></button>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${element.description}</h5>
                            <div class="" style="height:200px;">
                                <img src="${element.url}"
                                    class="h-100 w-100 object-fit-cover rounded img-fluid" alt="...">
                            </div>
                            <p class="card-text mt-2">${element.price}€</p>
                        </div>
                    </div>
        `
    }
    renderOrderKorb();
}
renderMenu();

// Cart HTML settings according to the order list
function renderOrderKorb(){
    orderKorb.innerHTML = "";
    if(order.length > 0 ){
        orderKorb.innerHTML +=`
         <div class="card">
                <h2 class="card-title text-center">Warenkorb</h2>
                <div id="card-body" class="card-body"></div>
            </div>
        `
      } else{
        orderKorb.innerHTML += `
          <div class="card">
                <h2 class="text-center">Warenkorb</h2>
                <div class="card-body text-center">
                    <span>Es gibt keine Auswahl.</span>
                </div>
            </div>
        `
      }  
}

// Food was added to the order list
function addOrder(i) {
    console.log(`${i} tiklandi`);
    let menuList = menu[i];
    if (!order.some(item => item.name === menuList.name)) {
        order.push({ ...menuList, amount: 5 });
    }
    renderOrderKorb();
    renderAddOrder();
    // console.log(menuList);
    // console.log(order);
}

// When the order list changes, this updates the order again.
function renderAddOrder() {
    let cardBody = document.getElementById("card-body");
    cardBody.innerHTML = "";
    for (let i = 0; i < order.length; i++) {
        const item = order[i];
        console.log(item);
        cardBody.innerHTML += `
                            <p>${item.name}</p>
                            <div class="d-flex justify-content-between">
                                <div class="Rechner">
                                    <button onclick="decreaseOrder(${i})"><i class="bi bi-dash-lg"></i></button>
                                       <span id="amount-${i}">${item.amount}</span>
                                    <button onclick="increaseOrder(${i})"><i class="bi bi-plus-lg"></i></button>
                                </div>
                                <div class="Rechner">
                                   <span id="price-${i}">${(item.price * item.amount).toFixed(2)}€</span>
                                    <button onclick="deleteMenu(${i})"><i class="bi bi-trash3"></i></button>
                                </div>
                            </div>     
                            `
    }
    renderSummary();
    placeOrder();
}

//  The total meal price has been calculated.
function renderSummary() {
    let cardBody = document.getElementById("card-body");
    let subTotal = 0
    let delivery = 5;
    let total = 0;

    for (let i = 0; i < order.length; i++) {
        const element = order[i];
        subTotal += element.price*element.amount;
        total = subTotal + delivery; 
    }
    if (order.length > 0) {
        cardBody.innerHTML += `
                    <div class="Rechner-info mt-5">
                        <div>Zwischensumme</div>
                        <div>${subTotal.toFixed(2)}€</div>
                    </div>
                    <div class="Rechner-info">
                        <div>Lieferkosten</div>
                        <div>${delivery}€</div>
                    </div>
                    <div class="Rechner-info">
                        <div><strong>Gesamt</strong></div>
                        <div> <strong>${total.toFixed(2)}€</strong></div>
                    </div>        
        `
    }
}

//  order confirmation “div”
function placeOrder(){
    let cardBody = document.getElementById("card-body");
   cardBody.innerHTML +=`
                    <div style="display:flex; justify-content: center;">
                    <button onclick="doOrder()" type="button" class="btn btn-primary" id="liveToastBtn">Bestätigung</button>
                    </div>   
   `   
}

//  order confirmation button
function doOrder(){
      order.length = 0;
        renderOrderKorb();
    // Toast show
    const toastElement = document.getElementById('orderToast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();  
}

// increase order quantities
function increaseOrder(i) {
    order[i].amount++;
    //  console.log(`${i} artti, yeni miktar: ${order[i].amount}`);
    renderOrderKorb();
    renderAddOrder();
}

// reduce order quantities
function decreaseOrder(i) {
    if (order[i].amount > 1) {
        order[i].amount--;
    } else {
        order.splice(i, 1);
    }
    renderAddOrder();
    if(order.length > 0){
        renderAddOrder();
    }
}

// We remove food from the order list.
function deleteMenu(i) {
    order.splice(i, 1);
    //  console.log(`${i} silindi`);   
    renderOrderKorb();
       if(order.length > 0){
       renderAddOrder();
    }
}


