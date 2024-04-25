import btn from "./ButtonComponent.js"
import router from "../js/routes.js";

export default async (id) => {
	const mainDiv = document.createElement("div");
	mainDiv.classList.add("banner-product-card-main-div");
	setTimeout(async () => {
		try {
			const response = await fetch(`/api/product`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await response.json();

			//comparação produto mais recente
			data.forEach(item => {
				item.created_at = new Date(item.created_at);
			});
			
			let newProduct = data.reduce((newProduct, item) => {
				return item.created_at > newProduct.created_at ? item : newProduct;
			}, { created_at: new Date(0) });

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
			productTitle.innerText = newProduct.name;
			textDiv.appendChild(productTitle);

			const productValue = document.createElement("p");
			productValue.classList.add("banner-product-value");
			productValue.innerText = `R$ ${(data.value * 1).toFixed(2).replace(".", ",")}`;
			textDiv.appendChild(productValue);


			const accessHereBtn = btn("Acesse aqui!", "banner-product-access-here-btn", async () => {
				router.navigate(`/product/${newProduct.id}`)
			})
			textDiv.appendChild(accessHereBtn);

			const imgDiv = document.createElement("img");
			imgDiv.src = newProduct.url_img;
			imgDiv.loading = "lazy"
			imgDiv.classList.add("banner-product-img");
			productDiv.appendChild(imgDiv);


		} catch (error) {
			console.error("Erro ao pegar banner:", error);
		}
	}, 0);

	return mainDiv;
}