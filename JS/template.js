function templateRenderSummaryInfo(cardBody, subTotal, delivery, total){
    return  `
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
        `
}

function templatePlaceOrder(){
    return  `
                    <div class="place-order">
                    <button onclick="doOrder()" type="button" class="btn btn-primary" id="liveToastBtn">Bestätigung</button>
                    </div>   
   `
}

function templateRenderCard(Mobile,cardOpenMobile){
    return  `
        <div class="card card-warenkorb" style="display: ${Mobile && !cardOpenMobile ? 'none' : 'block'};">
            <h2 class=" card-title-warenkorb text-center">Warenkorb</h2>
            <div id="card-body" class="card-body"></div>
        </div>
    `
}

function TemplateRenderMenüDiv(element,i){
    return  `
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
        `
}

function templateRenderMobileButton(orderNummer){
    return          `
            <div  id="orderNummerButon"  class="d-block d-lg-none  orderButton-sticky">
                <button onclick="mobilOrder()" class="btn btn-primary w-100 p-2">Warenkorb ${orderNummer > 0 ? `(${orderNummer})` : ""}</button>
            </div>
        `;
}

function templateRenderOrderItems(item,i){
    return  `
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
                            `
}

function templateRenderEmptyCard(){
    return  "<p>🧺 Es gibt keine Auswahl</p><br><p class='card-text-warenkorb'> Wenn du Lust auf etwas Leckeres hast, schau einfach in unser Menü und wähle dein Lieblingsgericht aus! Es wird dann hier in deinem Warenkorb angezeigt. Guten Appetit und viel Spaß beim Stöbern! 😋</p>"
}