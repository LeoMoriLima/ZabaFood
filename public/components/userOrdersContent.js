import ButtonComponent from "./ButtonComponent.js";
import LoadingComponent from "./LoadingComponent.js";

export default async () => {
    const orderPageDiv = document.createElement("div");
    orderPageDiv.classList.add("order-page-div");

    const orderPageTitleDiv = document.createElement("div");
    orderPageTitleDiv.classList.add("order-page-title-div");
    orderPageDiv.appendChild(orderPageTitleDiv);

    const orderPageTitle = document.createElement("h1");
    orderPageTitle.innerText = "Pedidos";
    orderPageTitle.classList.add("order-page-title");
    orderPageTitleDiv.appendChild(orderPageTitle)

    for (let i = 0; i < 10; i++) {

        const skeletonDiv = document.createElement("div");
        skeletonDiv.classList.add("order-div");
        skeletonDiv.id = `skeleton-${i}`
        orderPageDiv.appendChild(skeletonDiv);

        const firstLoading = LoadingComponent(5);
        skeletonDiv.appendChild(firstLoading);

    }

    setTimeout(async () => {
        try {

            const cartResponse = await fetch('/api/cart/all', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const cartData = await cartResponse.json();
            
            for (let i = 0; i < 10; i++) {
                const skeleton = document.querySelector(`#skeleton-${i}`);
                skeleton.remove();
                }

            cartData.forEach(async (cart) => {
    
                const div = document.createElement("div");
                div.classList.add("order-div");
                orderPageDiv.appendChild(div);
    
                const orderInfoDiv = document.createElement("div");
                orderInfoDiv.classList.add("order-info-div")
                div.appendChild(orderInfoDiv)
    
                const divLeft = document.createElement("div");
                divLeft.classList.add("order-div-left");
                orderInfoDiv.appendChild(divLeft);
    
                const divId = document.createElement("div");
                divId.classList.add("div-order-id");
                divLeft.appendChild(divId)
    
                const orderLabel = document.createElement("p");
                orderLabel.classList.add("order-id-label")
                orderLabel.innerText = "ID do pedido";
                divId.appendChild(orderLabel)
    
                const orderNumber = document.createElement("p");
                const orderID = cart.id.substring(0, 4).toUpperCase();
                orderNumber.classList.add("order-id-number")
                orderNumber.innerText = "#" + orderID
                divId.appendChild(orderNumber);
    
                const divDate = document.createElement("div");
                divDate.classList.add("div-order-date");
                divLeft.appendChild(divDate);
    
                const orderDateLabel = document.createElement("p");
                orderDateLabel.innerText = "Data do pedido";
                orderDateLabel.classList.add("order-date-label");
                divDate.appendChild(orderDateLabel)
    
                const orderDate = new Date(cart.created_at);
                const formatedDate = orderDate.toLocaleDateString('pt-BR');
    
                const orderCreatedAt = document.createElement("p");
                orderCreatedAt.classList.add("order-date-created-at")
                orderCreatedAt.innerText = formatedDate;
                divDate.appendChild(orderCreatedAt);
    
                const divInfo = document.createElement("div");
                divInfo.classList.add("div-info-order");
                orderInfoDiv.appendChild(divInfo);
    
                const infoOrderPriceLabel = document.createElement("p");
                infoOrderPriceLabel.classList.add("info-order-price-label");
                infoOrderPriceLabel.innerText = "Total";
                divInfo.appendChild(infoOrderPriceLabel);
    
                const infoOrderPrice = document.createElement("p");
                infoOrderPrice.innerText = "R$" + cart.total;
                infoOrderPrice.classList.add("info-order-price");
                divInfo.appendChild(infoOrderPrice);
    
                const infoOrderLabelStatus = document.createElement("p");
                infoOrderLabelStatus.classList.add("info-order-label-status");
                infoOrderLabelStatus.innerText = "Status"
                divInfo.appendChild(infoOrderLabelStatus);
    
                const infoOrderStatus = document.createElement("p");
                infoOrderStatus.classList.add("info-order-status");
                divInfo.appendChild(infoOrderStatus);
    
                if (cart.status === "pending") {
                    infoOrderStatus.innerText = "Pendente";
                } else if (cart.status === "approved") {
                    infoOrderStatus.innerText = "Aprovado";
                } else if (cart.status === "sended") {
                    infoOrderStatus.innerText = "Enviado";
                } else if (cart.status === "delivered") {
                    infoOrderStatus.innerText = "Entregue";
                } else {
                    infoOrderStatus.innerText = "Status desconhecido"
                }
    
                const actionDiv = document.createElement("div");
                actionDiv.classList.add("action-order-div");
                orderInfoDiv.appendChild(actionDiv);
    
                const actionTitle = document.createElement("p");
                actionTitle.classList.add("action-title")
                actionTitle.innerText = "Ações";
                actionDiv.appendChild(actionTitle)
    
                const trackShipping = document.createElement("p");
                trackShipping.classList.add("track-shipping");
                trackShipping.innerText = "Acompanhar Envio";
                actionDiv.appendChild(trackShipping);
    
                const arrowDown = document.createElement("img");
                arrowDown.classList.add("order-arrow-down");
                arrowDown.src = "/assets/images/arrow-down-green.svg";
                trackShipping.appendChild(arrowDown)
    
                const divTrack = document.createElement("div");
                divTrack.classList.add("div-track");
                divTrack.style.display = "none";
                trackShipping.appendChild(divTrack);
    
                const trackStatus = document.createElement("h1");
                trackStatus.classList.add("track-status");
                trackStatus.innerText = "Status do envio";
                divTrack.appendChild(trackStatus)
    
                const statusCircleDiv = document.createElement("div");
                statusCircleDiv.classList.add("status-circle-div");
                divTrack.appendChild(statusCircleDiv);
    
                const divCircleProcessing = document.createElement("div");
                divCircleProcessing.classList.add("div-circle-processing");
                statusCircleDiv.appendChild(divCircleProcessing);
    
                const imgCircleProcessing = document.createElement("img");
                imgCircleProcessing.classList.add("img-circle-processing");
                imgCircleProcessing.src = "/assets/images/circle-inactive-processing.svg";
                divCircleProcessing.appendChild(imgCircleProcessing);
    
                const divCircleSended = document.createElement("div");
                divCircleSended.classList.add("div-circle-sended");
                statusCircleDiv.appendChild(divCircleSended);
    
                const imgCircleSended = document.createElement("img");
                imgCircleSended.classList.add("img-circle-sended");
                imgCircleSended.src = "/assets/images/circle-inactive-sended.svg";
                divCircleSended.appendChild(imgCircleSended);
    
                const divCircleDelivered = document.createElement("div");
                divCircleDelivered.classList.add("div-circle-delivered");
                statusCircleDiv.appendChild(divCircleDelivered);
    
                const imgCircleDelivered = document.createElement("img");
                imgCircleDelivered.classList.add("img-circle-delivered");
                imgCircleDelivered.src = "/assets/images/circle-inactive-delivered.svg";
                divCircleDelivered.appendChild(imgCircleDelivered);
    
                const statusText = document.createElement("p");
                statusText.classList.add("status-text-track");
                divTrack.appendChild(statusText);
    
                if (cart.status === "sended") {
                    imgCircleSended.src = "/assets/images/circle-active-sended.svg";
                    statusText.innerText = "Enviado";
                } else if (cart.status === "delivered") {
                    imgCircleDelivered.src = "/assets/images/circle-active-delivered.svg";
                    statusText.innerText = "Entregue"
                } else if (cart.status === "approved") {
                    imgCircleProcessing.src = "/assets/images/circle-active-processing.svg";
                    statusText.innerText = "Aprovado";
                }
    
                let isTrackShippingOpen = false
    
                trackShipping.addEventListener("click", function () {
    
                    if (isTrackShippingOpen) {
                        divTrack.style.display = "none";
                        arrowDown.classList.remove('rotate');
                    } else {
                        divTrack.style.display = "flex";
                        arrowDown.classList.add('rotate');
                        divTrack.classList.toggle('show');
                    }
    
                    isTrackShippingOpen = !isTrackShippingOpen
                })
    
                const divDropArrow = document.createElement("div");
                divDropArrow.classList.add("div-drop-arrow");
                actionDiv.appendChild(divDropArrow);
    
                const dropArrowText = document.createElement("p")
                dropArrowText.classList.add("drop-arrow-text")
                dropArrowText.innerText = "Exibir produtos"
                divDropArrow.appendChild(dropArrowText)
    
                const dropArrow = document.createElement("img");
                dropArrow.classList.add("drop-arrow-img")
                dropArrow.src = "/assets/images/arrow-down-green.svg";
                divDropArrow.appendChild(dropArrow)
    
                const productCartResponse = await fetch(`/api/cart_product/order/${cart.id}`);
                const productCartData = await productCartResponse.json();
    
                const divProducts = document.createElement("div");
                divProducts.classList.add("div-order-products");
                divProducts.style.display = "none";
                dropArrowText.appendChild(divProducts);
    
                let isDropdownOpen = false; // Variável para controlar o estado do dropdown
    
                divDropArrow.addEventListener("click", async () => {
                    if (isDropdownOpen) {
                        divProducts.style.display = "none";
                        divProducts.innerHTML = ""
                        dropArrow.classList.remove('rotate');
                    } else {
                        divProducts.style.display = "flex";
                        dropArrow.classList.add('rotate');
    
                        divProducts.classList.toggle('show');
    
                        productCartData.forEach(async (productCartItem) => {
                            const productResponse = await fetch(`/api/product/${productCartItem.product_id}`);
                            const productData = await productResponse.json();
    
                            const imgDiv = document.createElement("div");
                            imgDiv.classList.add("order-img-div");
                            divProducts.appendChild(imgDiv);
    
                            const circleImgDiv = document.createElement("div");
                            circleImgDiv.classList.add("circle-img-div");
                            imgDiv.appendChild(circleImgDiv);
    
                            const img = document.createElement("img");
                            img.src = productData.url_img;
                            img.classList.add("order-img");
                            circleImgDiv.appendChild(img);
    
                            const productInfoDiv = document.createElement("div");
                            productInfoDiv.classList.add("order-product-name-div");
                            imgDiv.appendChild(productInfoDiv);
    
                            const productName = document.createElement("p");
                            productName.classList.add("order-product-name");
                            productName.innerText = productData.name
                            productInfoDiv.appendChild(productName);
    
                            const productValue = document.createElement("p");
                            productValue.classList.add("order-product-value");
                            productValue.innerText = "R$" + productData.value
                            productInfoDiv.appendChild(productValue);
    
                        });
                    }
    
                    isDropdownOpen = !isDropdownOpen; // Alterna o estado do dropdown
                });
    
                const buttonDiv = document.createElement("div")
                buttonDiv.classList.add("button-order-div")
                orderInfoDiv.appendChild(buttonDiv);
    
                if (cart.status === "sended") {
                    buttonDiv.appendChild(ButtonComponent("Definir como entregue", "light-green-button-user", async (button) => {
                        try {
                            button.disabled = true
                            button.innerText = ""
                            const simpleLoading = document.createElement("img");
                            simpleLoading.src = "/assets/images/simple-loading.svg";
                            simpleLoading.classList.add("loading-animation")
                            button.appendChild(simpleLoading)
    
                            const response = await fetch(`/api/cart/${cart.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "status": "delivered",
                                })
                            });
    
                            const data = await response.json()
    
                            if (data.error) {
                                throw data.error
                            }
                            infoOrderStatus.innerText = "Entregue";
                            button.classList.remove("light-green-button-user")
                            button.classList.add("light-green-button-disabled")
                            button.innerText = "Produto Entregue"
                            imgCircleSended.src = "/assets/images/circle-inactive-sended.svg";
                            imgCircleDelivered.src = "/assets/images/circle-active-delivered.svg";
                            statusText.innerText = "Entregue";
                        } catch (error) {
                            MessageComponent(`Erro ao atualizar status do carrinho`)
                            console.log(error);
                        }
                    }))
                } else if (cart.status === "delivered") {
                    buttonDiv.appendChild(ButtonComponent("Produto Entregue", "light-green-button-disabled"))
                } else {
                    buttonDiv.appendChild(ButtonComponent("Definir como entregue", "light-green-button-disabled"))
                }
            });
        } catch (error) {
            console.error(error);
        }
    }, 0);
    
    return orderPageDiv;
}