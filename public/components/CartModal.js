import btn from "./ButtonComponent.js";
import router from "../js/routes.js";

export default async (displayconfig) => {
	try {
		const userResponse = await fetch('/api/login', {
			method: "GET",
            headers: {
				"Content-Type": "application/json"
            }
        });
        const userData = await userResponse.json();

		if (userData.error) {
			return
		}

		const userId = userData.user.id;

		const cartResponse = await fetch(`/api/cart/user/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const cart = await cartResponse.json();	
		const cartStatus = cart.status;

		const cartProductsResponse = await fetch(`/api/cart_product/cart/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const cartProductsInfos = await cartProductsResponse.json();

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("modal-cart-main-div");
		mainDiv.style.display = displayconfig;

		if (cartProductsInfos.length !== 0 && cartStatus === "pending") {
			cartProductsInfos.map(itemProduct => {
				const {product , quantity} = itemProduct
				const itemProductDiv = document.createElement("div");
				itemProductDiv.classList.add("item-product-div");
				mainDiv.appendChild(itemProductDiv);

				const productImg = document.createElement("img");
				productImg.classList.add("cart-modal-product-img");
				productImg.src = product.url_img;
				itemProductDiv.appendChild(productImg);

				const textDiv = document.createElement("div");
				textDiv.classList.add("text-div-modal-cart");
				itemProductDiv.appendChild(textDiv);

				const productTitle = document.createElement("p");
				productTitle.classList.add("modal-cart-product-title");
				productTitle.innerText = product.name;
				textDiv.appendChild(productTitle);

				const productValue = document.createElement("p");
				productValue.classList.add("modal-cart-product-value");
				productValue.innerText = `${quantity}x R$${product.value}`;
				textDiv.appendChild(productValue);
			});

			const checkoutBtn = btn("Finalizar compra", "modal-cart-checkout-btn", async () => {
				router.navigate("/cart")
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