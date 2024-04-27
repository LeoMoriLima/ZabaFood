import cart from "../pages/cart.js";
import btn from "./ButtonComponent.js";
import router from "../js/routes.js";
import QuantityInput from "./QuantityInput.js";

export default async () => {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("cp-main-div");
    
    setTimeout(async () => {
        try {
            const userResponse = await fetch('/api/login', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const userData = await userResponse.json();
            const userId = userData.user.id;

            const cartResponse = await fetch(`/api/cart/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const cartInfo = await cartResponse.json();

            const cartProductsResponse = await fetch(`/api/cart_product/cart/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const cartProductsInfo = await cartProductsResponse.json();

            const cartDiv = document.createElement("div");
            cartDiv.classList.add("cp-cart-div");
            mainDiv.appendChild(cartDiv);

            const cartDivTitle = document.createElement("h1");
            cartDivTitle.classList.add("cp-card-div-title");
            cartDivTitle.innerText = "Carrinhos de compras";
            cartDiv.appendChild(cartDivTitle);

            if (cartProductsInfo.length) {
                cartProductsInfo.map(itemProduct => {
                    const {cartProductId, product , quantity} = itemProduct
        
                    const itemProductDiv = document.createElement("div");
                    itemProductDiv.classList.add("cp-item-product-div");
                    cartDiv.appendChild(itemProductDiv);
        
                    const itemProductLeftDiv = document.createElement("div");
                    itemProductLeftDiv.classList.add("cp-item-product-left-div");
                    itemProductDiv.appendChild(itemProductLeftDiv);

                    const deleteProductDiv = document.createElement("div");
                    deleteProductDiv.classList.add("cp-delete-product-div");
                    itemProductLeftDiv.appendChild(deleteProductDiv);

                    const deleteProductImg = document.createElement("img");
                    deleteProductImg.classList.add("cp-delete-product-img");
                    deleteProductImg.src = "/assets/images/delete-icon.svg";
                    deleteProductImg.addEventListener("click", async () => {
                        const response = await fetch(`/api/cart_product/${cartProductId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const data = await response.json();

                        router.navigate("/cart");
                    })
                    deleteProductDiv.appendChild(deleteProductImg);

                    const productImgDiv = document.createElement("div");
                    productImgDiv.classList.add("cp-product-img-div");
                    itemProductLeftDiv.appendChild(productImgDiv);
        
                    const productImg = document.createElement("img");
                    productImg.classList.add("cp-product-img");
                    productImg.src = product.url_img;
                    productImg.addEventListener("click", () => {
                        router.navigate(`/product/${product.id}`);
                    });
                    productImgDiv.appendChild(productImg);

        
                    const productInfoDiv = document.createElement("div");
                    productInfoDiv.classList.add("cp-product-info-div");
                    itemProductLeftDiv.appendChild(productInfoDiv);
        
                    const productTitle = document.createElement("p");
                    productTitle.classList.add("cp-product-text");
                    productTitle.innerText = product.name;
                    productTitle.addEventListener("click", () => {
                        router.navigate(`/product/${product.id}`);
                    });
                    productInfoDiv.appendChild(productTitle);
        
                    const productQuantityText = document.createElement("p");
                    productQuantityText.classList.add("cp-product-quantity-text");
                    productQuantityText.innerText = quantity > 1 ? `Quantidade: ${quantity} unidades` : `Quantidade: ${quantity} unidade`;
                    productQuantityText.addEventListener("click", () => {
                        router.navigate(`/product/${product.id}`);
                    });
                    productInfoDiv.appendChild(productQuantityText);

                    const quantityInputDiv = document.createElement("div");
                    quantityInputDiv.classList.add("cp-quantity-input-div");
                    productInfoDiv.appendChild(quantityInputDiv);
                    
                    const changeValue = async () =>{
                        try {
                            const quantityInputValue = document.getElementById(`cp-product-quantity-input-${cartProductId}`).value;
                        
                            const response = await fetch(`/api/cart_product/${cartProductId}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "quantity": quantityInputValue,
                                })
                            });
    
                            productQuantityText.innerText = quantityInputValue > 1 ? `Quantidade: ${quantityInputValue} unidades` : `Quantidade: ${quantityInputValue} unidade`;
    
                            productValue.innerText = `R$${(product.value * quantityInputValue).toFixed(2).replace(".", ",")}`;
    
                            const newCartResponse = await fetch(`/api/cart/user/${userId}`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                
                            const newCartInfo = await newCartResponse.json();
                            subtotalTextDivRight.innerText = `R$${(newCartInfo.total).replace(".", ",")}`;
                        } catch (error) {
                            console.log(error);
                        }
                    }

                    const quantityInput = QuantityInput(product.stock, `cp-product-quantity-input-${cartProductId}`, quantity, changeValue, changeValue);
                    quantityInputDiv.appendChild(quantityInput);
        
                    const itemProductRightDiv = document.createElement("div");
                    itemProductRightDiv.classList.add("cp-item-product-right-div");
                    itemProductDiv.appendChild(itemProductRightDiv);
        
                    const productValue = document.createElement("p");
                    productValue.classList.add("cp-product-value");
                    productValue.innerText = `R$${(product.value * quantity).toFixed(2).replace(".", ",")}`;
                    itemProductRightDiv.appendChild(productValue);
                });
            } else {
                const emptyCartTextDiv = document.createElement("div");
                emptyCartTextDiv.classList.add("empty-cart-text-div");
                cartDiv.appendChild(emptyCartTextDiv);

                const emptyCartText = document.createElement("p");
                emptyCartText.classList.add("cp-empty-cart-text");
                emptyCartText.innerText = "Seu carrinho de compras está vazio."
                emptyCartTextDiv.appendChild(emptyCartText);

                const messageDiv = document.createElement("div");
                messageDiv.classList.add("cp-message-div");
                emptyCartTextDiv.appendChild(messageDiv);

                const enjoyCartText = document.createElement("p");
                enjoyCartText.classList.add("cp-empty-cart-text");
                enjoyCartText.innerText = "Aproveite nossos descontos e"
                messageDiv.appendChild(enjoyCartText);

                const keepBuyingCartText = document.createElement("p");
                keepBuyingCartText.classList.add("cp-keep-buying-cart-text");
                keepBuyingCartText.innerText = "continue comprando."
                keepBuyingCartText.addEventListener("click", () => {
                    router.navigate("/");
                })
                messageDiv.appendChild(keepBuyingCartText);
            }

            const rightDiv = document.createElement("div");
            rightDiv.classList.add("cp-right-div");
            mainDiv.appendChild(rightDiv);

            const subtotalDiv = document.createElement("div");
            subtotalDiv.classList.add("cp-subtotal-div");
            rightDiv.appendChild(subtotalDiv);

            const subtotalTextDiv = document.createElement("div");
            subtotalTextDiv.classList.add("cp-subtotal-text-div");
            subtotalDiv.appendChild(subtotalTextDiv);

            const subtotalTextDivLeft = document.createElement("p");
            subtotalTextDivLeft.classList.add("cp-subtotal-text-div-left");
            subtotalTextDivLeft.innerText = "Subtotal: ";
            subtotalTextDiv.appendChild(subtotalTextDivLeft);

            const subtotalTextDivRight = document.createElement("p");
            subtotalTextDivRight.classList.add("cp-subtotal-text-div-right");
            subtotalTextDivRight.innerText = `R$${(cartInfo.total).replace(".", ",")}`;
            subtotalTextDiv.appendChild(subtotalTextDivRight);

            const closeCartBtn = btn("Fechar pedido", "cp-close-cart-btn", async () => {
                router.navigate("/checkout");
            });
            subtotalDiv.appendChild(closeCartBtn);

            
        } catch (error) {
            console.error("Erro ao buscar o carrinho:", error);
        }
    }, 0);
    
    return mainDiv;
}