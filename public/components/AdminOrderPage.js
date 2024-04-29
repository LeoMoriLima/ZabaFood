import ButtonComponent from "./ButtonComponent.js";
import LoadingComponent from "./LoadingComponent.js";
import MessageComponent from "./MessageComponent.js";

export default async () => {
    const orderPageDiv = document.createElement("div");
    orderPageDiv.classList.add("order-page-div-admin");

    const orderPageTitleDiv = document.createElement("div");
    orderPageTitleDiv.classList.add("order-page-title-div-admin");
    orderPageDiv.appendChild(orderPageTitleDiv);

    const orderPageTitle = document.createElement("h1");
    orderPageTitle.innerText = "Pedidos";
    orderPageTitle.classList.add("order-page-title-admin");
    orderPageTitleDiv.appendChild(orderPageTitle);

    const generateOrders = async (min, max) => {
        try {
            const cartResponse = await fetch(`/api/cart?min=${min}&max=${max}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const cartData = await cartResponse.json();

            cartData.forEach(async (cart) => {
                const div = document.createElement("div");
                div.classList.add("order-div-admin");
                orderPageDiv.appendChild(div);

                const orderInfoDiv = document.createElement("div");
                orderInfoDiv.classList.add("order-info-div-admin");
                div.appendChild(orderInfoDiv);

                // div left

                const divLeft = document.createElement("div");
                divLeft.classList.add("order-div-left-admin");
                orderInfoDiv.appendChild(divLeft);

                const divId = document.createElement("div");
                divId.classList.add("div-order-customer-admin");
                divLeft.appendChild(divId);

                const orderLabel = document.createElement("p");
                orderLabel.classList.add("order-customer-label");
                orderLabel.innerText = "Nome do cliente";
                divId.appendChild(orderLabel);

                const orderNumber = document.createElement("p");
                const customerName = cart.name;
                orderNumber.classList.add("order-customer-name");
                orderNumber.innerText = customerName;
                divId.appendChild(orderNumber);

                const divDate = document.createElement("div");
                divDate.classList.add("div-order-date-admin");
                divLeft.appendChild(divDate);

                const orderDateLabel = document.createElement("p");
                orderDateLabel.innerText = "Data do pedido";
                orderDateLabel.classList.add("order-date-label-admin");
                divDate.appendChild(orderDateLabel);

                const orderDate = new Date(cart.created_at);
                const formatedDate = orderDate.toLocaleDateString('pt-BR');

                const orderCreatedAt = document.createElement("p");
                orderCreatedAt.classList.add("order-date-created-at-admin");
                orderCreatedAt.innerText = formatedDate;
                divDate.appendChild(orderCreatedAt);

                // div info order

                const divInfo = document.createElement("div");
                divInfo.classList.add("div-info-order-admin");
                orderInfoDiv.appendChild(divInfo);

                const infoOrderPriceLabel = document.createElement("p");
                infoOrderPriceLabel.classList.add("info-order-price-label-admin");
                infoOrderPriceLabel.innerText = "Total";
                divInfo.appendChild(infoOrderPriceLabel);

                const infoOrderPrice = document.createElement("p");
                const value = Number(cart.total);
                const formattedValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                infoOrderPrice.innerText = formattedValue;
                infoOrderPrice.classList.add("info-order-price-admin");
                divInfo.appendChild(infoOrderPrice);

                const infoOrderLabelStatus = document.createElement("p");
                infoOrderLabelStatus.classList.add("info-order-label-address");
                infoOrderLabelStatus.innerText = "Endereço";
                divInfo.appendChild(infoOrderLabelStatus);

                const infoOrderStatus = document.createElement("p");
                infoOrderStatus.classList.add("info-order-address");
                divInfo.appendChild(infoOrderStatus);
                infoOrderStatus.innerText = `${cart.street}, ${cart.number},
                ${cart.state} - ${cart.city} , ${cart.postal_code}, ${cart.complement || ""}`

                // action order div

                const actionDiv = document.createElement("div");
                actionDiv.classList.add("action-order-div-admin");
                orderInfoDiv.appendChild(actionDiv);

                const actionTitle = document.createElement("p");
                actionTitle.classList.add("action-title-admin");
                actionTitle.innerText = "Ações";
                actionDiv.appendChild(actionTitle);

                const trackShipping = document.createElement("p");
                trackShipping.classList.add("track-shipping-admin");
                trackShipping.innerText = "Acompanhar Envio";
                actionDiv.appendChild(trackShipping);

                const arrowDown = document.createElement("img");
                arrowDown.classList.add("order-arrow-down-admin");
                arrowDown.src = "/assets/images/arrow-down-green.svg";
                trackShipping.appendChild(arrowDown);

                const divTrack = document.createElement("div");
                divTrack.classList.add("div-track-admin");
                divTrack.style.display = "none";
                trackShipping.appendChild(divTrack);

                const trackStatus = document.createElement("h1");
                trackStatus.classList.add("track-status-admin");
                trackStatus.innerText = "Status do envio";
                divTrack.appendChild(trackStatus);

                const statusCircleDiv = document.createElement("div");
                statusCircleDiv.classList.add("status-circle-div-admin");
                divTrack.appendChild(statusCircleDiv);

                const divCircleProcessing = document.createElement("div");
                divCircleProcessing.classList.add("div-circle-processing-admin");
                statusCircleDiv.appendChild(divCircleProcessing);

                const imgCircleProcessing = document.createElement("img");
                imgCircleProcessing.classList.add("img-circle-processing-admin");
                imgCircleProcessing.src = "/assets/images/circle-inactive-processing.svg";
                divCircleProcessing.appendChild(imgCircleProcessing);

                const divCircleSended = document.createElement("div");
                divCircleSended.classList.add("div-circle-sended-admin");
                statusCircleDiv.appendChild(divCircleSended);

                const imgCircleSended = document.createElement("img");
                imgCircleSended.classList.add("img-circle-sended-admin");
                imgCircleSended.src = "/assets/images/circle-inactive-sended.svg";
                divCircleSended.appendChild(imgCircleSended);

                const divCircleDelivered = document.createElement("div");
                divCircleDelivered.classList.add("div-circle-delivered-admin");
                statusCircleDiv.appendChild(divCircleDelivered);

                const imgCircleDelivered = document.createElement("img");
                imgCircleDelivered.classList.add("img-circle-delivered-admin");
                imgCircleDelivered.src = "/assets/images/circle-inactive-delivered.svg";
                divCircleDelivered.appendChild(imgCircleDelivered);

                const statusText = document.createElement("p");
                statusText.classList.add("status-text-track-admin");
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

                let isTrackShippingOpen = false;

                trackShipping.addEventListener("click", function () {

                    if (isTrackShippingOpen) {
                        divTrack.style.display = "none";
                        arrowDown.classList.remove('rotate');
                    } else {
                        divTrack.style.display = "flex";
                        arrowDown.classList.add('rotate');
                        divTrack.classList.toggle('show');
                    }

                    isTrackShippingOpen = !isTrackShippingOpen;
                })

                const divDropArrow = document.createElement("div");
                divDropArrow.classList.add("div-drop-arrow-admin");
                actionDiv.appendChild(divDropArrow);

                const dropArrowText = document.createElement("p");
                dropArrowText.classList.add("drop-arrow-text-admin");
                dropArrowText.innerText = "Exibir produtos";
                divDropArrow.appendChild(dropArrowText);

                const dropArrow = document.createElement("img");
                dropArrow.classList.add("drop-arrow-img-admin");
                dropArrow.src = "/assets/images/arrow-down-green.svg";
                divDropArrow.appendChild(dropArrow);

                const productCartResponse = await fetch(`/api/cart_product/order/${cart.id}`);
                const productCartData = await productCartResponse.json();

                const divProducts = document.createElement("div");
                divProducts.classList.add("div-order-products-admin");
                divProducts.style.display = "none";
                dropArrowText.appendChild(divProducts);

                let isDropdownOpen = false; // Variável para controlar o estado do dropdown

                divDropArrow.addEventListener("click", async () => {
                    if (isDropdownOpen) {
                        divProducts.style.display = "none";
                        divProducts.innerHTML = "";
                        dropArrow.classList.remove('rotate');
                    } else {
                        divProducts.style.display = "flex";
                        dropArrow.classList.add('rotate');

                        divProducts.classList.toggle('show');

                        const loadingComponent = LoadingComponent(5);
                        loadingComponent.classList.add("ap-products-loading");
                        divProducts.appendChild(loadingComponent);

                        productCartData.forEach(async (productCartItem) => {
                            const productResponse = await fetch(`/api/product/${productCartItem.product_id}`);
                            const productData = await productResponse.json();

                            loadingComponent.remove();

                            const imgDiv = document.createElement("div");
                            imgDiv.classList.add("order-img-div-admin");
                            divProducts.appendChild(imgDiv);

                            const circleImgDiv = document.createElement("div");
                            circleImgDiv.classList.add("circle-img-div-admin");
                            imgDiv.appendChild(circleImgDiv);

                            const img = document.createElement("img");
                            img.src = productData.url_img;
                            img.classList.add("order-img-admin");
                            circleImgDiv.appendChild(img);

                            const productInfoDiv = document.createElement("div");
                            productInfoDiv.classList.add("order-product-name-div-admin");
                            imgDiv.appendChild(productInfoDiv);

                            const productName = document.createElement("p");
                            productName.classList.add("order-product-name-admin");
                            productName.innerText = productData.name;
                            productInfoDiv.appendChild(productName);

                            const productValue = document.createElement("p");
                            productValue.classList.add("order-product-value-admin");
                            productValue.innerText = "R$" + productData.value;
                            productInfoDiv.appendChild(productValue);

                        });
                    }

                    isDropdownOpen = !isDropdownOpen; // Alterna o estado do dropdown
                });

                // button order div

                const buttonDiv = document.createElement("div");
                buttonDiv.classList.add("button-order-div-admin");
                orderInfoDiv.appendChild(buttonDiv);

                if (cart.status === "approved") {
                    buttonDiv.appendChild(ButtonComponent("Definir como enviado", "light-green-button-order", async (button) => {
                        try {
                            button.disabled = true
                            button.innerText = ""
                            const simpleLoading = document.createElement("img");
                            simpleLoading.src = "/assets/images/simple-loading.svg";
                            simpleLoading.classList.add("loading-animation");
                            button.appendChild(simpleLoading);

                            const response = await fetch(`/api/cart/${cart.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "status": "sended",
                                })
                            });

                            const data = await response.json();

                            if (data.error) {
                                throw data.error;
                            }

                            button.classList.remove("light-green-button-order");
                            button.classList.add("light-green-button-disabled");
                            button.innerText = "Produto Enviado";
                            imgCircleProcessing.src = "/assets/images/circle-inactive-processing.svg";
                            imgCircleSended.src = "/assets/images/circle-active-sended.svg";
                            statusText.innerText = "Enviado";
                        } catch (error) {
                            MessageComponent(`Erro ao atualizar status do carrinho`);
                            console.log(error);
                        }
                    }))
                } else {
                    buttonDiv.appendChild(ButtonComponent("Produto enviado", "light-green-button-disabled"));
                }

            });

            if (cartData.length === 10) {
                const loadMoreButton = ButtonComponent("Carregar mais", "button-load-more-admin", async (button) => {
                    min += 10;
                    max += 10;
                    button.disabled = true;
                    button.innerText = "";
                    const simpleLoading = document.createElement("img");
                    simpleLoading.src = "/assets/images/simple-loading.svg";
                    simpleLoading.classList.add("button-load-more-admin-loading");
                    simpleLoading.classList.add("loading-animation");
                    simpleLoading.style.width = "2rem";
                    button.appendChild(simpleLoading);

                    await generateOrders(min, max);

                    button.remove();
                })

                orderPageDiv.appendChild(loadMoreButton);
            }

        } catch (error) {
            console.error(error);
        }
    }

    setTimeout(async () => {
        await generateOrders(1, 10);
    }, 0);

    return orderPageDiv;
}