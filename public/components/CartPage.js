import cart from "../pages/cart.js";
import btn from "./ButtonComponent.js";

export default async () => {
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

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("cp-main-div");

        const cartDiv = document.createElement("div");
		cartDiv.classList.add("cp-cart-div");
        mainDiv.appendChild(cartDiv);

        const cartDivTitle = document.createElement("h1");
        cartDivTitle.classList.add("cp-card-div-title");
        cartDivTitle.innerText = "Carrinhos de compras";
        cartDiv.appendChild(cartDivTitle);

        console.log(cartProductsInfo)

        if (cartProductsInfo.length) {
            cartProductsInfo.map(itemProduct => {
                const {product , quantity} = itemProduct
    
                const itemProductDiv = document.createElement("div");
                itemProductDiv.classList.add("cp-item-product-div");
                cartDiv.appendChild(itemProductDiv);
    
                const itemProductLeftDiv = document.createElement("div");
                itemProductLeftDiv.classList.add("cp-item-product-left-div");
                itemProductDiv.appendChild(itemProductLeftDiv);
    
                const productImg = document.createElement("img");
                productImg.classList.add("cp-product-img");
                productImg.src = product.url_img;
                itemProductLeftDiv.appendChild(productImg);
    
                const productInfoDiv = document.createElement("div");
                productInfoDiv.classList.add("cp-product-info-div");
                itemProductLeftDiv.appendChild(productInfoDiv);
    
                const productTitle = document.createElement("p");
                productTitle.classList.add("cp-product-text");
                productTitle.innerText = product.name;
                productInfoDiv.appendChild(productTitle);
    
                const productQuantityText = document.createElement("p");
                productQuantityText.classList.add("cp-product-quantity-text");
                productQuantityText.innerText = quantity > 1 ? `Quantidade: ${quantity} unidades` : `Quantidade: ${quantity} unidade`;
                productInfoDiv.appendChild(productQuantityText);
    
                const itemProductRightDiv = document.createElement("div");
                itemProductRightDiv.classList.add("cp-item-product-right-div");
                itemProductDiv.appendChild(itemProductRightDiv);
    
                const productValue = document.createElement("p");
                productValue.classList.add("cp-product-value");
                productValue.innerText = `R$${product.value}`;
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
                window.route({ preventDefault: () => {}, target: { href: `/` } });
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
        subtotalTextDivRight.innerText = `R$${cartInfo.total}`;
        subtotalTextDiv.appendChild(subtotalTextDivRight);

        const closeCartBtn = btn("Fechar pedido", "cp-close-cart-btn", async () => {
            window.route({ preventDefault: () => {}, target: { href: `/checkout` } });
        });
        subtotalDiv.appendChild(closeCartBtn);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao buscar o carrinho:", error);
	}
}