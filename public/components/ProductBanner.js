import btn from "./ButtonComponent.js"

export default async (id) => {
	try {
		const response = await fetch(`http://localhost:3000/api/product/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("banner-product-card");

		const textDiv = document.createElement("div");
		textDiv.classList.add("banners-product-text-div");
		mainDiv.appendChild(textDiv);

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
		mainDiv.appendChild(imgDiv);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}
}