import btn from "./ButtonComponent.js";

export default async () => {
	try {
		const userResponse = await fetch('http://localhost:3000/api/login', {
			method: "GET",
            headers: {
				"Content-Type": "application/json"
            }
        });
        const userData = await userResponse.json();
		
		const userId = userData.user.id;
		// console.log(userId);

		const cartResponse = await fetch(`http://localhost:3000/api/cart_product/cart/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const cartProductsInfos = await cartResponse.json();
		console.log(cartProductsInfos)

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("modal-cart-main-div");

		if (cartProductsInfos.length !== 0) {
			cartProductsInfos.map(itemProduct => {
				const itemProductDiv = document.createElement("div");
				itemProductDiv.classList.add("item-product-div");
				mainDiv.appendChild(itemProductDiv);

				const productImg = document.createElement("img");
				productImg.classList.add("product-img");
				productImg.src = itemProduct.url_img;
				itemProductDiv.appendChild(productImg);

				const textDiv = document.createElement("div");
				textDiv.classList.add("text-div-modal-cart");
				itemProductDiv.appendChild(textDiv);

				const productTitle = document.createElement("p");
				productTitle.classList.add("modal-cart-product-title");
				productTitle.innerText = itemProduct.name;
				textDiv.appendChild(productTitle);

				const productValue = document.createElement("p");
				productValue.classList.add("modal-cart-product-value");
				productValue.innerText = `1x R$${itemProduct.value}`;
				textDiv.appendChild(productValue);
			});

			const checkoutBtn = btn("Finalizar compra", "modal-cart-checkout-btn", async () => {
				window.route({ preventDefault: () => {}, target: { href: `/checkout` } });
			})
			checkoutBtn.classList.add("modal-cart-checkout-btn")
			mainDiv.appendChild(checkoutBtn);
		} else {
			const emptyCartText = document.createElement("p");
			emptyCartText.classList.add("empty-cart-text");
			emptyCartText.innerText = "Seu carrinho está vazio.";
			mainDiv.appendChild(emptyCartText);
		}

		return mainDiv;

	} catch (error) {
		console.error("Erro ao buscar o carrinho:", error);
	}
}