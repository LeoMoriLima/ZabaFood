import Button from "./ButtonComponent.js";
import QuantityInput from "./QuantityInput.js";
import router from "../js/routes.js";
import MessageComponent from "./MessageComponent.js";

export default async (product) => {
    try {
        let ammountAdded = 0;
        const userData = await getUser();
        const product_type = await getType(product.type_id);

        const mainProductCard = document.createElement("div");
        mainProductCard.classList.add("product-main-card");

        // Image
        const productImgDiv = document.createElement("div");
        productImgDiv.classList.add("product-div-img");
        mainProductCard.appendChild(productImgDiv);

        const productImg = document.createElement("img");
        productImg.src = product.url_img;
        productImgDiv.appendChild(productImg);

        // Info divs
        const productInfoDiv = document.createElement("div");
        productInfoDiv.classList.add("product-div-info");
        mainProductCard.appendChild(productInfoDiv);

        // General infos
        const productGeneralInfo = document.createElement("div");
        productGeneralInfo.classList.add("product-info-general");
        productInfoDiv.appendChild(productGeneralInfo);

        const productName = document.createElement("h2");
        productName.innerText = product.name;
        productGeneralInfo.appendChild(productName);

        const productType = document.createElement("h2");
        productType.classList.add("product-type-info");
        productType.innerText = `Tipo: ${product_type}`;
        productGeneralInfo.appendChild(productType);

        // Price infos
        const productPriceInfo = document.createElement("div");
        productPriceInfo.classList.add("product-info-price");
        productInfoDiv.appendChild(productPriceInfo);

        const productValue = document.createElement("h2");
        productValue.innerText = `R$ ${product.value}`;
        productPriceInfo.appendChild(productValue);

        // const productValueDivided = document.createElement("p");
        // productValueDivided.innerText = `8% de desconto a partir do 3º item`;
        // productPriceInfo.appendChild(productValueDivided);

        // Quantity infos
        const productQuantityInfo = document.createElement("div");
        productQuantityInfo.classList.add("product-info-quantity");
        productInfoDiv.appendChild(productQuantityInfo);

        const quantityP = document.createElement("p");
        quantityP.innerText = `Quantidade`;
        productQuantityInfo.appendChild(quantityP);

        const quantityInputDiv = document.createElement("div");
        productQuantityInfo.appendChild(quantityInputDiv);
        quantityInputDiv.classList.add("quantity-input-div");

        quantityInputDiv.appendChild(QuantityInput(product.stock, "product-quantity-input"));

        const productStock = document.createElement("p");
        productStock.innerText = `${product.stock} Unidades disponíveis`;
        quantityInputDiv.appendChild(productStock);

        // Buttons
        const productButtonDiv = document.createElement("div");
        productButtonDiv.classList.add("product-button-div");
        productInfoDiv.appendChild(productButtonDiv);

        productButtonDiv.appendChild(Button("Comprar", "light-green-button", async (button) => {
            if (userData.error) {
                navigateTo("login");
                return
            }
            const simpleLoading = document.createElement("img");
            simpleLoading.src = "/assets/images/simple-loading.svg";
            simpleLoading.classList.add("simple-loading-product");
            simpleLoading.classList.add("loading-animation");

            try {
                button.disabled = true;
                button.innerText = "";
                button.appendChild(simpleLoading);
                const quantity = document.getElementById("product-quantity-input").value;

                if (product.stock < 1 || product.stock < quantity) {
                    throw "Estoque insuficiente.";
                }

                const cart = await getCart(userData.user.id);
                const cartAdded = await addToCart(cart.id, product.id, quantity);
                simpleLoading.remove();
                button.innerText = "Comprar";
                button.disabled = false;

                if (cartAdded.error) {
                    throw cartAdded.error;
                }

                navigateTo("cart");
            } catch (error) {
                simpleLoading.remove();
                button.innerText = "Comprar";
                button.disabled = false;
                console.error(error);
                MessageComponent(`Erro ao adicionar no carrinho: ${error}`, false);
                return;
            }
        }));

        productButtonDiv.appendChild(Button("Adicionar ao carrinho", "add-green-button", async (button) => {
            if (userData.error) {
                navigateTo("login");
                return;
            }
            const simpleLoading = document.createElement("img");
            simpleLoading.classList.add("simple-loading-product");
            simpleLoading.src = "/assets/images/simple-loading.svg";
            simpleLoading.classList.add("loading-animation");

            try {
                button.disabled = true;
                button.innerText = "";
                button.appendChild(simpleLoading);
                const quantity = document.getElementById("product-quantity-input").value;

                if (product.stock < 1 || product.stock < quantity) {
                    throw "Estoque insuficiente.";
                }

                const cart = await getCart(userData.user.id);
                const cartAdded = await addToCart(cart.id, product.id, quantity);
                simpleLoading.remove();
                button.innerText = "Adicionar ao carrinho";
                button.disabled = false;

                if (cartAdded.error) {
                    throw cartAdded.error;
                }

                MessageComponent("Produto adicionado ao carrinho!", true);
            } catch (error) {
                simpleLoading.remove();
                button.innerText = "Adicionar ao carrinho";
                button.disabled = false;
                console.error(error);
                MessageComponent(`Erro ao adicionar no carrinho: ${error}`, false);
                return;
            }
        }));

        return mainProductCard;

    } catch (error) {
        console.error("Error:", error);
    }
}

const getType = async (typeId) => {
    try {
        const response = await fetch(`/api/product_type/${typeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        return data.type;
    } catch (error) {
        throw error;
    }
}

const getCart = async (userId) => {
    try {
        const response = await fetch(`/api/cart/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const getUser = async () => {
    try {
        const userResponse = await fetch('/api/login', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await userResponse.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const addToCart = async (cartId, productId, quantityInput, stock) => {
    try {
        const response = await fetch("/api/cart_product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cart_id: cartId,
                product_id: productId,
                quantity: quantityInput,
            })
        });

        const data = await response.json();
        const input = document.getElementById("product-quantity-input")
        input.value = 1
        const event = new CustomEvent("productAdded");
        window.dispatchEvent(event);

        return data
    } catch (error) {
        throw error;
    }
}

const navigateTo = (endpoint) => {
    router.navigate(`/${endpoint}`);
}

