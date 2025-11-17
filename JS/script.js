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
        col.innerHTML += TemplateRenderMenüDiv(element,i);
         }
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
     let newOrderNummer = order.reduce((total,item)=> total + item.amount, 0)
         let orderNummer = newOrderNummer;
         for (let i = 0; i < order.length; i++) {
            const element = order[i];
            console.log(element);
         }
        orderKorb.innerHTML += templateRenderMobileButton(orderNummer);
    }
}

// Adds the cart HTML
function renderCard(){
     const Mobile = window.innerWidth < 992;
      orderKorb.innerHTML += templateRenderCard(Mobile,cardOpenMobile);
     ;
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
    let existItem = order.some(item=>item.name === menuList.name);
    if(!existItem){
         order.push({ ...menuList, amount: 1 });
    } else{
        let index = order.findIndex(item => item.name === menuList.name);
        order[index].amount++;
    }
    renderOrderKorb();
    renderAddOrder();
}

// Shows a message when the basket is empty
function renderEmptyCard(cardBody){
        let menuCard = document.createElement("div");
        menuCard.classList.add("card-body");
         menuCard.classList.add("card-warenkorb-text");
        menuCard.innerHTML = templateRenderEmptyCard()
        cardBody.append(menuCard)
}

// List the products in the basket
function renderOrderItems(cardBody){
        for (let i = 0; i < order.length; i++) {
        const item = order[i];
       // console.log(newOrderNummer);
        cardBody.innerHTML += templateRenderOrderItems(item,i)
        }
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
        cardBody.innerHTML += templateRenderSummaryInfo(cardBody, subTotal, delivery, total)
        }
}

//  Adds the order confirmation button
function placeOrder() {
    let cardBody = document.getElementById("card-body");
    cardBody.innerHTML += templatePlaceOrder()
   
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


