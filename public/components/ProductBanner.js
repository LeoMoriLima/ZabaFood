import btn from "./ButtonComponent.js"

export default async (id) => {
	try {
		const response = await fetch(`/api/product/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("banner-product-card-main-div");

		const mainDivText = document.createElement("p");
		mainDivText.classList.add("main-div-text");
		mainDivText.innerText = "CONFIRA O MAIS NOVO PRODUTO";
		mainDiv.appendChild(mainDivText);

		const productDiv = document.createElement("div");
		productDiv.classList.add("banner-product-card");
		mainDiv.appendChild(productDiv);

		const textDiv = document.createElement("div");
		textDiv.classList.add("banners-product-text-div");
		productDiv.appendChild(textDiv);

		const productTitle = document.createElement("p");
		productTitle.classList.add("banner-product-title");
		productTitle.innerText = data.name;
		textDiv.appendChild(productTitle);

		const productValue = document.createElement("p");
		productValue.classList.add("banner-product-value");
		productValue.innerText = `R$ ${(data.value * 1).toFixed(2)}`;
		textDiv.appendChild(productValue);

		const accessHereBtn = btn("Acesse aqui!", "banner-product-access-here-btn", async () => {
			window.route({ preventDefault: () => {}, target: { href: `/product/${id}` } });
		})
		textDiv.appendChild(accessHereBtn);

		const imgDiv = document.createElement("img");
		imgDiv.src = data.url_img;
		imgDiv.classList.add("banner-product-img");
		productDiv.appendChild(imgDiv);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}
}