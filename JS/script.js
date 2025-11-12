
// The empty array in the order list is where the orders go.
const order = [];


let cardOpenMobile = false;

function init() {
    //Captures the divs in index.html
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


// Cart HTML settings according to the order list
function renderOrderKorb() {
    orderKorb.innerHTML = "";
    const Mobile = window.innerWidth < 992;

    // Buton mobilde
    if (Mobile) {
        orderKorb.innerHTML += `
            <div class="d-block d-lg-none">
                <button onclick="mobilOrder()" class="btn btn-primary w-100 p-2">Warenkorb</button>
            </div>
        `;
    }

    // Card (mobilde state’e göre göster/gizle)
    orderKorb.innerHTML += `
        <div class="card" style="display: ${Mobile && !cardOpenMobile ? 'none' : 'block'};">
            <h2 class="card-title text-center">Warenkorb</h2>
            <div id="card-body" class="card-body"></div>
        </div>
    `;

    renderAddOrder();
}

// configures the menu and card display on the mobile screen
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
    if (order.length == 0) {
        let menuCard = document.createElement("div")
        menuCard.classList.add("card-body")
        menuCard.innerText = "Es gibt keine Auswahl"
        cardBody.append(menuCard)
    } else {
        placeOrder();

    }
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
function placeOrder() {
    let cardBody = document.getElementById("card-body");
    cardBody.innerHTML += `
                    <div style="display:flex; justify-content: center;">
                    <button onclick="doOrder()" type="button" class="btn btn-primary" id="liveToastBtn">Bestätigung</button>
                    </div>   
   `
}

//  order confirmation button
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

// When switching from mobile screen to desktop, the display of divs is ensured.
