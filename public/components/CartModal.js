import btn from "./ButtonComponent.js";

export default async (cart_id) => {
	try {
    const productsResponse = await fetch("http://108.61.49.221:3000/api/product", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
    });

    const productsData = await productsResponse.json();

		const response = await fetch(`http://108.61.49.221:3000/api/item_product/${cart_id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("modal-cart-main-div");

    data.forEach(itemProduct => {
		const productInfo = productsData.filter(product => product.id === itemProduct.product_id);

		const itemProductDiv = document.createElement("div");
		itemProductDiv.classList.add("item-product-div");
		mainDiv.appendChild(itemProductDiv);

		const productImg = document.createElement("img");
		productImg.classList.add("product-img");
		productImg.src = "https://yamuna.com.br/wp-content/uploads/2022/11/7a0cd0753b993020506a346226cb803d-516x516.jpg";
		itemProductDiv.appendChild(productImg);

		const textDiv = document.createElement("div");
		textDiv.classList.add("text-div-modal-cart");
		itemProductDiv.appendChild(textDiv);

		const productTitle = document.createElement("p");
		productTitle.classList.add("modal-cart-product-title");
		productTitle.innerText = "Cúrcuma com PIMENTA – 85g";
		textDiv.appendChild(productTitle);

		const productValue = document.createElement("p");
		productValue.classList.add("modal-cart-product-value");
		productValue.innerText = "1x R$31,98";
		textDiv.appendChild(productValue);
    });

    const checkoutBtn = btn("Finalizar compra", "modal-cart-checkout-btn", async () => {
		window.route({ preventDefault: () => {}, target: { href: `/cart/${cart_id}` } });
    })
	checkoutBtn.classList.add("modal-cart-checkout-btn")
    mainDiv.appendChild(checkoutBtn);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao buscar o carrinho:", error);
	}
}