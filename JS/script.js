// The empty array in the order list is where the orders go.
const order = [];

// Booelean variable
let cardOpenMobile = false;

// loads the page and calls other functions
function init() {
    let col = document.getElementById("col");
    let orderKorb = document.getElementById("orderKorb");
    renderMenu();
    renderOrderKorb();
// When switching from mobile screen to desktop, the display of divs is ensured.
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 992) {
            cardOpenMobile = false;
            col.classList.remove("col-toggle");
        }
        renderOrderKorb();
    });
}

// Creates menus
function renderMenu() {
    renderMenüDiv()
    renderOrderKorb();
}

// Displays menu cards on the screen
function renderMenüDiv(){
    for (let i = 0; i < menu.length; i++) {
        const element = menu[i];
        col.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-header d-flex justify-content-between">
                            <h5 class="card-header-title">${element.name}</h5>
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
        ` }
}

// Cart HTML settings according to the order list
function renderOrderKorb() {
    orderKorb.innerHTML = "";
    renderMobileButton()
    renderCard()
    renderAddOrder(); 
}

// Creates a mobile button
function renderMobileButton(){
 if(window.innerWidth < 992) {
         let orderNummer = order.length;
        orderKorb.innerHTML += `
            <div id="orderNummerButon"  class="d-block d-lg-none">
                <button onclick="mobilOrder()" class="btn btn-primary w-100 p-2">Warenkorb ${orderNummer > 0 ? `(${orderNummer})` : ""}</button>
            </div>
        `;
    }
}

// Adds the cart HTML
function renderCard(){
     const Mobile = window.innerWidth < 992;
      orderKorb.innerHTML += `
        <div class="card card-warenkorb" style="display: ${Mobile && !cardOpenMobile ? 'none' : 'block'};">
            <h2 class=" card-title-warenkorb text-center">Warenkorb</h2>
            <div id="card-body" class="card-body"></div>
        </div>
    `;
}

// When the order list changes, this updates the order again.
function renderAddOrder() {
    let cardBody = document.getElementById("card-body");
    cardBody.innerHTML = "";
     renderOrderItems(cardBody)
    if (order.length == 0) {
       renderEmptyCard(cardBody)
    } else {
        placeOrder();
    }
}

// Open/close basket on mobile
function mobilOrder() {
    cardOpenMobile = !cardOpenMobile;
    if (cardOpenMobile) {
        col.classList.add("col-toggle");
    } else {
        col.classList.remove("col-toggle")
    }
    const card = document.querySelector("#orderKorb .card")
    if (cardOpenMobile) {
        card.style.display = "block";
    } else {
        card.style.display = "none";
    }
}

// Food was added to the order list
function addOrder(i) {
    let menuList = menu[i];
    if (!order.some(item => item.name === menuList.name)) {
        order.push({ ...menuList, amount: 5 });
    }
    renderOrderKorb();
    renderAddOrder();
}

// Shows a message when the basket is empty
function renderEmptyCard(cardBody){
        let menuCard = document.createElement("div");
        menuCard.classList.add("card-body");
         menuCard.classList.add("card-warenkorb-text");
        menuCard.innerHTML = "<p class=''>🧺 Es gibt keine Auswahl</p><br><p class='card-text-warenkorb'> Wenn du Lust auf etwas Leckeres hast, schau einfach in unser Menü und wähle dein Lieblingsgericht aus! Es wird dann hier in deinem Warenkorb angezeigt. Guten Appetit und viel Spaß beim Stöbern! 😋</p>"
        cardBody.append(menuCard)
}

// List the products in the basket
function renderOrderItems(cardBody){
        for (let i = 0; i < order.length; i++) {
        const item = order[i];
        cardBody.innerHTML += `
                            <p>${item.name}</p>
                            <div class="d-flex justify-content-between">
                                <div class="Rechner">
                                    <button onclick="decreaseOrder(${i})"><i class="bi bi-dash-lg"></i></button>
                                       <span id="amount-${i}">${item.amount}x</span>
                                    <button onclick="increaseOrder(${i})"><i class="bi bi-plus-lg"></i></button>
                                </div>
                                <div class="Rechner">
                                   <span id="price-${i}">${(item.price * item.amount).toFixed(2)}€</span>
                                    <button onclick="deleteMenu(${i})"><i class="bi bi-trash3"></i></button>
                                </div>
                            </div>     
                            ` }
    renderSummary(cardBody);
}

//  The total meal price has been calculated.
function renderSummary() {
    let cardBody = document.getElementById("card-body");
    let subTotal = 0
    let delivery = 5;
    let total = 0;
    for (let i = 0; i < order.length; i++) {
        const element = order[i];
        subTotal += element.price * element.amount;
    }
    total = subTotal + delivery;
    renderSummaryInfo(cardBody, subTotal, delivery, total)
}

// Shows the price information.
function renderSummaryInfo(cardBody, subTotal, delivery, total){
      if (order.length > 0) {
        cardBody.innerHTML += `
                    <div class="Rechner-info mt-4">
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
        ` }
}

//  Adds the order confirmation button
function placeOrder() {
    let cardBody = document.getElementById("card-body");
    cardBody.innerHTML += `
                    <div class="place-order">
                    <button onclick="doOrder()" type="button" class="btn btn-primary" id="liveToastBtn">Bestätigung</button>
                    </div>   
   `
}

// The basket is cleared when the order is confirmed.
function doOrder() {
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
    if (order.length > 0) {
        renderOrderKorb();
        renderAddOrder();
    }
}

// We remove food from the order list.
function deleteMenu(i) {
    order.splice(i, 1);
    renderOrderKorb();
    if (order.length > 0) {
        renderAddOrder();
    }
}


