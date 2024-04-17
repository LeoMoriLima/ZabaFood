import Button from "./ButtonComponent.js";
import QuantityInput from "./QuantityInput.js";

export default async (product) => {
    try {
        const product_type = await getType(product.type_id)

        console.log(product_type);

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

        const productType = document.createElement("h2")
        productType.classList.add("product-type-info")
        productType.innerText = `Tipo: ${product_type}`
        productGeneralInfo.appendChild(productType)

        // Price infos

        const productPriceInfo = document.createElement("div");
        productPriceInfo.classList.add("product-info-price");
        productInfoDiv.appendChild(productPriceInfo);

        const productValue = document.createElement("h2");
        productValue.innerText = `R$ ${product.value}`;
        productPriceInfo.appendChild(productValue);

        const productValueDivided = document.createElement("p")
        productValueDivided.innerText = `em até 12x`
        productPriceInfo.appendChild(productValueDivided)

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

        productButtonDiv.appendChild(Button("Comprar", "light-green-button", () => {
            const quantity = document.getElementById("product-quantity-input").value;
            navigateTo("checkout");
        }));

        productButtonDiv.appendChild(Button("Adicionar ao carrinho", "green-button", () => {
            const quantity = document.getElementById("product-quantity-input").value;
            navigateTo("cart");
        }));

        return mainProductCard;

    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
}

const getType = async (typeId) => {
    const response = await fetch(`/api/product_type/${typeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    return data.type;
}

const navigateTo = (endpoint) => {
    window.route({ preventDefault: () => { }, target: { href: `/${endpoint}` } });
}

