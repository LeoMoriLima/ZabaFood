import router from "../js/routes.js";

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
		mainDiv.classList.add("product-card-recommended");

		mainDiv.addEventListener("click", () => {
			router.navigate(`/product/${id}`)
		})

		const imgDiv = document.createElement("img");
		imgDiv.src = data.url_img;
		imgDiv.classList.add("card-product-img-recommended");
		mainDiv.appendChild(imgDiv);

		const productTitleDiv = document.createElement("div");
		productTitleDiv.classList.add("product-title-div-recommended");
		mainDiv.appendChild(productTitleDiv);

		const productTitle = document.createElement("p");
		productTitle.classList.add("product-title-recommended");
		productTitle.innerText = data.name;
		productTitleDiv.appendChild(productTitle);

		const priceDiv = document.createElement("div");
		priceDiv.classList.add("price-div-recommended");
		mainDiv.appendChild(priceDiv);

		const unitPriceDiv = document.createElement("div");
		unitPriceDiv.classList.add("unit-price-div-recommended");
		priceDiv.appendChild(unitPriceDiv);

		const unitPrice = document.createElement("p");
		unitPrice.classList.add("unit-price-recommended");
		unitPrice.innerText = `R$ ${(data.value * 1).toFixed(2)}`;
		unitPriceDiv.appendChild(unitPrice);

		return mainDiv;


	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}

}