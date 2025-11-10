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
    }
]
// siparis listesindeki bos array, siparisler bunun icine geliyor
const order = [];

let row = document.getElementById("row");
let col = document.getElementById("col");
let cardBody = document.getElementById("card-body");

// menü listelerini render ederek gösterdim
function renderMenu() {
    for (let i = 0; i < menu.length; i++) {
        const element = menu[i];
        console.log(element);
         if (!cardBody) return;
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
}
renderMenu();

// siparis listesine yemek ekledim
function addOrder(i) {
    console.log(`${i} tiklandi`);
    let menuList = menu[i];
     if (!order.some(item => item.name === menuList.name)) {
        order.push({ ...menuList, amount: 1 });
    }
   renderAddOrder();
   // console.log(menuList);
   // console.log(order);
}


// siparis listesi degistiginde burasi siparisi tekrardan güncelliyor
function renderAddOrder(){
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
                         <div class="Rechner-info mt-5">
                            <div>Zwischensumme</div>
                            <div>${(item.price * item.amount).toFixed(2)}€</div>
                        </div>
                        <div class="Rechner-info">
                            <div>Lieferkosten</div>
                            <div>5€</div>
                        </div>
                        <div class="Rechner-info">
                            <div><strong>Gesamt</strong></div>
                            <div> <strong>${((item.price * item.amount)+5).toFixed(2)}€</strong></div>
                        </div>
                            
        `
    }
}

// siparis miktarlarini arttir
function increaseOrder(i){
    order[i].amount++;
  //  console.log(`${i} artti, yeni miktar: ${order[i].amount}`);
    renderAddOrder();
}

// siparis miktarlarini azalt
function decreaseOrder(i){
 if (order[i].amount > 1) {
        order[i].amount--;
    } else {
        // 1’den küçükse ürünü listeden çıkar
        order.splice(i, 1);
    }
     renderAddOrder();
}

// Siparis listesinden bir seyler silebiliyoruz
function deleteMenu(i){
    order.splice(i,1);
  //  console.log(`${i} silindi`);   
     renderAddOrder();   
}


